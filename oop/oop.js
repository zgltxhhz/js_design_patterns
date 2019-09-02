// 多人协作开发时尽量减少全局变量的定义，因为可能会出现两个人定义相同变量的情况，导致变量污染
// 可以通过函数或者对象来申明

function fn1 () {
    console.log('fn1')
}

function fn2 () {
    console.log('fn2')
}

// 改为

let obj = {
    fn1: () => {
        console.log('fn1')
    },
    fn2: () => {
        console.log('fn2')
    }
}

// 或者使用函数 （js中函数也是对象）

let fnObj = function () {}

fnObj.fn1 = function () {
    console.log('fn1')
}

fnObj.fn2 = function () {
    console.log('fn2')
}

// 上面的写法会有一个问题，不可以多人复用，可以改写一下

let fnObj2 = function() {
    return {
        fn1: () => {
            console.log('fn1')
        },
        fn2: () => {
            console.log('fn2')
        }
    }
}
let fna = fnObj2()
// fna.fn1()
// 这样写可以实现多人复用， 但并不是真正意义上类的创建方式，再改写一下

let OopObj = function() {
    this.fn1 = function () {
        console.log('fn1')
    }
    this.fn2 = function () {
        console.log('fn2')
    }
}

// 使用new来实例化成一个对象

let fnb = new OopObj()
// fnb.fn2()

// 这样写每一次实例化就会对类的this上的属性进行复制，这些新的对象都会有一套自己的方法
//  然而有时候这样做会造成很大的消耗，还需要在改造一下

let OopObj2 = function () {}

OopObj2.prototype.fn1 = function () {
    console.log('fn1')
}
OopObj2.prototype.fn2 = function () {
    console.log('fn2')
}

let fnc = new OopObj2()

// fnc.fn1()

// 因为原型链的关系，在对对象自身找不到访问的属性或者方法的情况下，会去原型（prototype）中寻找
// 在原型中定义属性可以避免重复创建属性的问题

// 为了避免多次去调用方法，可以把this返回出来（ps: this指向的是当前对象）

let OopObj3 = function () {}

OopObj3.prototype.fn1 = function () {
    console.log('fn1')
    return this // 这里的this是指向当前实例化出来的对象（这是关键）
}
OopObj3.prototype.fn2 = function () {
    console.log('fn2')
    return this
}
OopObj3.prototype.fn3 = function () {
    console.log('fn3')
    return this
}

let fnd = new OopObj3()

// fnd.fn1().fn2().fn3() // 所以可以这样调用

// 正常的开发中为了方便可以在原型中添加一个公共方法来为原型添加属性

OopObj3.prototype.addMethod = function (name, fn) {
    this[name] = fn
    return this
}

// 可以添加方法：

fnd.addMethod('fn4', function() {
    console.log('fn4')
    return this
}).addMethod('fn5', function() {
    console.log('fn5')
    return this
})

// fnd.fn4().fn5()
// 可以通过原型中的 addMethod 来实现原型属性的添加






