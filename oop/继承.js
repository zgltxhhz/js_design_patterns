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


let sub = new SubClass()

// console.log(sub.getSuperValue())

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

console.log(instance1.books)
console.log(instance2.books)











