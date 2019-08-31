let http = require('http')
let querystring = require('querystring')
let url = require('url')
let fs = require('fs')
let mysql = require('mysql')
let Event = require('events').EventEmitter
let query = new Event()


// 连接数据库
let mysql_user = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'my_sql'
}

let connection = mysql.createConnection(mysql_user)
connection.connect((e)=>{
    if (e) {
        console.log('连接出错', e)
        connection.end()
        return
    }
    console.log('连接成功！')
})
// 搭建服务
http.createServer((req,res)=>{
    if (req.url == '/favicon.ico') { return }
    let pathname = url.parse(req.url).pathname
    let body = ''
    req.on('data', (chunk)=>{
        body = ''
        body += chunk
        body = querystring.parse(body)
    })
    fs.readFile(pathname.substring(1) + '.html', function(err, data) {
        if (err) {
            res.writeHead(404, {
                'Content-Type': 'text/html; charset=utf-8'
            })
            res.write('404页面不存在')
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            })
            if (body) {
                switch(pathname) {
                    case '/login': 
                        query.emit('login', body.username, body.password, connection);
                        break;
                    case '/regsiter':
                        query.emit('regsiter', body.username, body.password, connection);
                        break;
                }
            }
            res.write(data)
        }
        res.end()
    })
    // console.log('连接成功');
}).listen(3300)

// 登录
query.on('login', function (username, password, connection) {
    // 查询语句
    console.log(username)
    let find = `SELECT * FROM userinfo WHERE username ="${username}"`
    connection.query(find, function(err, result) {
        console.log(find)
        if (err) {
            console.log('出错', err)
            return
        }

        if (result.length) {
            console.log('start')
            let string = JSON.stringify(result)
            let json = JSON.parse(string)[0]
            console.log(string)
            if (json.password == password) {
                console.log('密码校验正确')
            } else {
                console.log('密码校验错误')
            }
            console.log('end')
        } else {
            console.log('账号不存在')
        }

    })
})

// 注册
query.on('regsiter', (username, password, connection) => {
    let find = `SELECT * FROM userinfo WHERE username="${username}"`
    let insert = `INSERT INTO userinfo (id, username,password,name,tel,remarks) VALUES (2,?,?,"李四",185624,2)`
    connection.query(find, (err, result)=>{
        if (err) {
            console.log('错误', err)
            return
        }
        if (result.length){
            console.log('账号已存在')
            return
        } else {
            let inserInfo = [username, password]
            connection.query(insert, inserInfo, (err, result) => {
                if (err) {
                    console.log('错误了', err)
                    return
                }
                console.log('------------start----------------');
				console.log('注册成功');
				console.log(result);
				console.log('--------------end-----------------');
            })
        }
    })
})




