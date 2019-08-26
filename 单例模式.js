// 定义：
// 保证一个类仅有一个实例，并提供一个访问它的全局访问点

// 核心:
// 确保只有一个实例，并提供全局访问

// 实现：

class SetManager {
    constructor(name) {
        this.manager = name
    }
}

SetManager.prototype.getName = function () {
    console.log(this.manager)
}

let SingletonSetManager = (function(){
    let manager = null
    return function (name) {
        console.log(manager)
        if (!manager) {manager = new SetManager(name)}
        return manager
    }
})()

// console.log(SingletonSetManager())
// SingletonSetManager('a')
// SingletonSetManager('b')
// SingletonSetManager('c')

function getSingleton(fn) {
    let instance = null
    return function () {
        if (!instance) {instance = fn.apply(this, arguments)}
        return instance
    }
}

let managerSingleton = getSingleton(function(name){
    let manager = new SetManager(name)
    return manager
})

managerSingleton('a').getName()
managerSingleton('b').getName()
managerSingleton('c').getName()







// function fn() {
//     let a = null
//     return function (b) {
//         console.log(a)
//         if (!a) { a = b}
//         return a
//     }
// }

// let fns = fn()
// fns(1)
// fns(2)
// fns(3)












