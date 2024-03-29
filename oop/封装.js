// 类
let Book = function (name, price) {
    this.name = name
    this.price = price
}
Book.prototype.display = function () {
    console.log(`你购买了${this.name}，花了${this.price}元`)
}
// let book = new Book('高程3', 128)
// book.display()

// 通过this添加的属性和方法是在当前对象上添加的
// 所以每一次通过类实例化一个新对象时，this指向的属性和方法都会得到相应的创建
// 而得到prototype继承的属性或方法是每个对象通过prototype访问到的，
// 所以每次通过类实例化一个新对象时这些属性和方法不会再次创建

// 面向对像就是对一些属性方法的隐藏和暴露
// 声明在函数内部的变量以及方法在外界是访问不到的，通过这个特性可以创建类的私有变量以及私有方法

let Books = function (id, name, price) {
    // 私有属性
    let num = 1
    // 私有方法
    function checkId () {
        console.log('私有方法')
    }
    // 特权方法
    this.getName = function(){}
    this.getPrice = function(){}
    this.setName = function(){
        // console.log(name)
    }
    this.setPrice = function(){}
    // 对象公有属性
    this.id = id
    // 对象公有方法
    this.copy = function(){}
    // 构造器
    this.setName(name)
    this.setPrice(price)
}

// 公有方法：
    // 1. 公有方法可以在类的外部被调用
    // 2. 不可以访问类的私有属性
    // 3. 公有方法必须在类的内部或者外部通过类的prototype属性添加

// 私有方法：
    // 私有方法本身是可以访问类内部的所有属性的，即私有属性和公有属性
    // 但是私有方法是不可以在类的外部被调用

// 特权方法：
    // 特权方法是可以在类的外部被调用

// let books = new Books(1, '深入浅出node.js', 120)
// console.log(books.setName('hhh'))

// 类静态公有属性(对象不能访问)
Books.isChinese = true

// 类静态公有方法（对象不能访问）
Books.resetTime = function () {
    console.log('new time')
}

Books.prototype = {
    // 公有属性
    isJsBook: true,
    display: function () {}
}

let books = new Books(1, '深入浅出node.js', 120)
// 通过new关键字的对象实质是对新对象this的不断赋值，并将prototype指向类的prototype所指向的对象
// 而类的构造函数外面通过点语法定义的属性方法是不会添加到新创建的对象上去的
// 想要在新创建的对象中使用isChinese就要通过Books类使用而不能通过this


// console.log(books.isChinese)
// console.log(Books.isChinese)

// 在prototype上添加的属性和方法实例化对象都可以访问，因为它们指向的是同一个对象

// console.log(Books.prototype.isJsBook)

// 闭包实现：
// 通过闭包实现类的静态变量
let Book2 = (function () {
    // 静态私有变量
    let bookNum = 0
    // 静态私有方法
    function checkBook(){}

    // 返回构造函数
    return function (id, name, price){
        // 私有变量
        let newName, newPrice
        // 私有方法
        function checkID(id){}
        // 特权方法
        this.getName = function () {} 
        this.getPrice = function () {}
        this.setName = function () {}
        this.setPrice = function () {}
        // 公有属性
        this.id = id
        // 公有方法
        this.copy = function () {}
        bookNum++
        if (bookNum>100) {
            throw new Error('已售完')
        }
        // 构造器
        this.setName(name)
        this.setPrice(price)
    }
})()

Book2.prototype = {
    // 静态公有属性
    isJsBook: true,
    // 静态公有方法
    display: function () {}
}

// console.log(Book2)



// 检察长————创建对象的安全模式（防止实例化时new遗忘）

let NewBook = function(title, time, type) {
    if (this instanceof NewBook) {
        this.title = title
        this.time = time
        this.type = type
    } else {
        return new NewBook(title, time, type)
    }
}

let _book = NewBook('javascript', '2018', 'js')
console.log(_book) // 缺少new，但仍然是构造函数实例化出来的对象


  