// 定义：
// 保证一个类仅有一个实例，并提供一个访问它的全局访问点

// 核心:
// 确保只有一个实例，并提供全局访问

// 实现：用一个变量来标志当前是否已经为某个类创建过对象，如果是，则在下一次获取该类的实例时，直接返回之前创建的对象

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
// SingletonSetManager('a').getName()
// SingletonSetManager('b').getName()
// SingletonSetManager('c').getName()


function getSingleton(fn) {
    let instance = null
    return function () {
        if (!instance){ instance = fn.apply(this,  arguments)}
        return instance;
    }
}

let managerSingleton = getSingleton(function (name) {
    return new SetManager(name)
})

managerSingleton('a').getName()
managerSingleton('b').getName()
managerSingleton('c').getName()











