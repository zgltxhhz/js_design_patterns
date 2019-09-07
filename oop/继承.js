// 父类
function SuperClass () {
    this.superValue = '父类的value'
}
// 为父类添加原型方法

SuperClass.prototype.getSuperValue = function () {
    return this.superValue
}

// 子类
function SubClass() {
    this.subValue = '子类的value'
}

// 继承父类
SubClass.prototype = new SuperClass()

// 为子类添加原型方法

SubClass.prototype.getSubValue = function () {
    return this.subValue
} 


let sub1 = new SubClass()
let sub2 = new SubClass()

// console.log(sub2.superValue)

// console.log(sub1.getSuperValue())

// console.log(sub instanceof SubClass) true
// console.log(sub instanceof SuperClass) true
// console.log(sub instanceof Object) true
// console.log(SubClass instanceof SuperClass) false
// console.log(SuperClass instanceof SubClass) false
// console.log(SubClass.prototype instanceof SuperClass) true

// 这样继承会有两个缺点
// 1. 由于子类通过其原型对父类实例化，继承了父类。所以父类中的公有属性要是引用类型，就会在子类中被所有实例公用
// 因此一个子类的实例更改子类原型从父类构造函数中继承来的公有属性就会直接影响到其他子类

// 2. 由于子类实现的继承是靠原型prototype对父类的实例化实现的
// 因此在创建父类的时候，是无法向父类传递参数的，因而在实例化父类的时候也无法对父类构造函数内的属性进行初始化

// 解决办法：

// 创建即继承————构造函数继承

// 父类
function Supers (id) {
    // 引用类型共有属性
    this.books = ['javascript', 'html', 'css']
    // 值类型共用属性
    this.id = id
}
// 父类声明原型方法
Supers.prototype.showBooks = function () {
    console.log(this.books)
}

// 子类
function Subs (id) {
    Supers.call(this, id)
}

let instance1 = new Subs(1)

let instance2 = new Subs(2)

// console.log(instance1)
// console.log(instance2)

instance1.books.push('node.js')

// console.log(instance1.books)
// console.log(instance2.books)

// ps： 由于call这个方法可以更改函数的作用环境，因此在子类中，对supers调用这个方法就是将子类中的变量在父类中执行一遍,
// 由于父类中是给this绑定属性的，因此子类自然也就继承了父类的共有属性。由于这种类型的继承没有涉及到原型prototype
// 所以父类的原型方法自然不会被子类继承，而如果想要被子类继承就必须要放在构造函数中，
// 这样创建的每个实例就会单独拥有一份而不能共用，这样违背了代码复用的原则，使用组合式继承



// 组合继承
// 同时实现通过子类prototype对父类实例化来实现和通过子类的构造函数作用环境中执行一次父类的构造函数
// 组合继承同时实现这两点
// 父类
function SuperCas (name) {
    // 值类型共有属性
    this.name = name
    // 引用类型共有属性
    this.books = ['html', 'css', 'javascript']
}
// 父类原型共有方法
SuperCas.prototype.getName = function () {
    console.log(this.name)
} 
// 声明子类
function SubCas (name, time) {
    // 构造函数式继承父类name属性
    SuperCas.call(this, name)
    // 子类中新增共有属性
    this.time = time
}
// 类式继承 子类原型继承父类
SubCas.prototype = new SuperCas()
// 子类原型方法
SubCas.prototype.getTime = function () {
    console.log(this.time)
}


// 这还不是最完美的继承方案

// 原型式继承

function inheritObject(o) {
    // 声明一个过渡函数对象
    function F() {}
    // 过渡对象的原型继承父类对象
    F.prototype = o
    // 返回过渡对象的一个实例，该实例的原型继承了父对象
    return new F()
}
let book = {
    name: 'js book',
    alikeBook: ['css', 'html', 'js']
}

let newBook = inheritObject(book)
newBook.name = 'ajax'
newBook.alikeBook.push('xml')

let otherBook = inheritObject(book)
otherBook.name = 'flash'
otherBook.alikeBook.push('as book')

console.log(otherBook.alikeBook)

// 寄生式继承
// 声明基对象
let books = {
    name: 'js book',
    alikeBook: ['css', 'html', 'js']
}

function createBook (Obj) {
    // 通过原型继承方式创建新对象
    let o = new inheritObject(Obj)
    // 拓展新对象
    o.getName = function () {
        console.log(name)
    }
    // 返回拓展后的新对象
    return o
}

// 寄生式继承就是对原型继承的第二次封装，并且在这第二次封装过程中对继承的对象进行了拓展
// 这样新创建的对象不仅仅有父类中的属性和方法，而且还添加新的属性和方法


// 寄生组合式继承
// 两种继承方式的组合
// 1. 寄生式继承    2. 构造函数继承

/**
 * 寄生式继承 继承原型
 * 传递参数 subClass 子类
 * 传递参数 superClass 父类
 */

 function inheritPrototype (subClass, superClass) {
    // 复制一份父类的原型副本保存在变量中
    let p = inheritObject(superClass.prototype)
    // 修正因为重写子类原型导致子类constructor属性被修改
    p.constructor = subClass
    // 设置子类的原型
    subClass.prototype = p
}

// 定义父类
function SuperA (name) {
    this.name = name
}
// 定义父类原型方法
SuperA.prototype.getName = function (){
    console.log(this.name)
}
// 定义子类
function SubA (name, time) {
    // 构造函数式继承
    SuperA.call(this, name)
    // 子类新增属性
    this.time = time
}
// 寄生式继承父类原型
inheritPrototype(SubA, SuperA)
// 子类新增原型方法
SubA.prototype.getTime = function () {
    console.log(this.time)
}
// 创建两个测试方法
let instanceA = new SubA('js book', 2014)
let instanceB = new SubA('css book', 2013)








