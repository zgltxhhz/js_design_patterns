// 定义：
// 保证一个类仅有一个实例，并提供一个访问它的全局访问点

// 核心:
// 确保只有一个实例，并提供全局访问

// 实现：
// 假设要设置一个管理员，多次调用也仅设置一次，可以使用闭包缓存一个内部变量来实现

class SetManager {
    constructor(name) {
        this.manager = name
    }
}

SetManager.prototype.getName = function () {
    // console.log(this.manager)
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
SingletonSetManager('a').getName()
SingletonSetManager('b').getName()
SingletonSetManager('c').getName()










