// 工厂方法模式： 通过对产品类的抽象使其创建业务主要负责用于创建多类产品的实例

// 安全模式类：
// 为了防止忘记使用new来实例化

let Demo = function () {}
Demo.prototype = {
    show: function () {
        console.log('success')
    }
}

// let d = new Demo()
// d.show()
// let d = Demo()
// d.show() // 报错

let Demo2 = function () {
    if (!(this instanceof Demo2)) {
        return new Demo2()
    }
}
Demo2.prototype = {
    show: function () {
        console.log('success')
    }
}

let d = Demo2()
// d.show() // success

// 安全的工厂模式

let Factory = function (type, content) {
    if (this instanceof Factory) {
        let s = new this[type](content)
    } else {
        return new Factory(type, content)
    }
}

Factory.prototype = {
    java: function (content) {
        console.log('do sth about java', content)
    },
    php: function (content) {
        console.log('do sth about php', content)
    },
    javascript: function (content) {
        console.log('do sth about javascript', content)
    },
    ui: function (content) {
        console.log('do sth about ui', content)
    }
}

// 如果还需要添加更多的需求，可以直接在原型中添加

Factory('php', 'hhh')



 
