// 抽象工厂模式：通过对类的工厂抽象使其业务用于对产品类簇的创建，而不负责创建某一类产品的实例
// 抽象类是一种声明但不能使用的类，使用了就会报错

let Car = function() {}

Car.prototype = {
    getPrice: function() {
        return new Error('抽象方法不可调用')
    },
    getSpeed: function () {
        return new Error('抽象方法不可调用')
    }
}

let car = new Car()
// console.log(car)
// console.log(car.getPrice())

// 在一些大型应用中，总会有一些子类去继承另一些父类，这些父类经常会定义一些必要的方法，却没有具体的实现
// 那么一旦用子类创建了一个对象，该对象总是应该具备一些必要的方法
// 但如果这些必要的方法从父类中继承过来而没有具体去重写实现，那么实例化对象便会调用父类中的这些方法

// 抽象工厂方法：
let VehicleFactory = function (subType, superType) {
    // 判断抽象工厂中是否有该抽象类
    if (typeof VehicleFactory[superType] === 'function') {
        // 缓存类
        function F() {}
        // 继承父类属性和方法
        F.prototype = new VehicleFactory[superType]()
        // 将子类constructor指向子类
        subType.constructor = subType
        // 子类原型继承“父类”
        subType.prototype = new F()
    } else {
        // 不存在该抽象类抛出错误
        throw new Error('未创建该抽象类')
    }
}
// 汽车的抽象类
VehicleFactory.Car = function () {
    this.type = 'car'
}
VehicleFactory.Car.prototype = {
    getPrice: function () {
        return new Error('抽象方法不可调用')
    },
    getSpeed: function () {
        return new Error('抽象方法不可调用')
    }
}

// 公交车抽象类
VehicleFactory.Bus = function () {
    this.type = 'bus'
}

VehicleFactory.Bus.prototype = {
    getPrice: function () {
        return new Error('抽象方法不可调用')
    },
    getPassengerNum: function () {
        return new Error('抽象方法不可调用')
    }
}

// 货车抽象类
VehicleFactory.Truck = function () {
    this.type = 'Truck'
}

VehicleFactory.Truck.prototype = {
    getPrice: function () {
        return new Error('抽象方法不可调用')
    },
    getTrainload: function () {
        return new Error('抽象方法不可调用')
    }
}

console.log(VehicleFactory)

// 宝马汽车子类
let BMW = function (price, speed) {
    this.price = price
    this.speed = speed
}
// 抽象工厂实现对car抽象类的继承
VehicleFactory(BMW, 'Car')
BMW.prototype.getPrice = function () {
    return this.price
}
BMW.prototype.getSpeed = function () {
    return this.speed
}
// 兰博基尼汽车子类
let Lamborghini = function (price, speed) {
    this.price = price
    this.speed = speed
}

// 抽象工厂实现对Car抽象类的继承
VehicleFactory(Lamborghini, 'Car')
Lamborghini.prototype.getPrice = function() {
    return this.price
}
Lamborghini.prototype.getSpeed = function () {
    return this.speed
}

// 宇通汽车子类
let Yutong = function (price, passenger) {
    this.price = price
    this.passenger = passenger
}

// 抽象工厂实现对Bus抽象类的继承
VehicleFactory(Yutong, 'Bus')
Yutong.prototype.getPrice = function () {
    return this.price
}
Yutong.prototype.getPassengerNum = function () {
    return this.passenger
}
// 奔驰汽车子类
let BenzTruck = function (price, trainLoad) {
    this.price = price
    this.trainLoad = trainLoad
}
// 抽象工厂实现对Truck抽象类的继承
VehicleFactory(BenzTruck, 'Truck')
BenzTruck.prototype.getPrice = function () {
    return this.price
}
BenzTruck.prototype.getTrainload = function () {
    return this.price
}







