// 简单工厂模式：
// 又叫静态工厂方法，由一个工厂对象决定创建某一种产品对象类的实例，主要用来创建同一类对象

// 篮球基类
let Basketball = function () {
    this.intro = '篮球盛行于美国'
}
Basketball.prototype = {
    getMember: function () {
        console.log('每个队伍需要5名队员')
    },
    getBallSize: function () {
        console.log('唱、跳、rap、篮球')
    }
}

// 足球基类
let Football = function () {
    this.intro = '足球在世界范围内很流行'
}
Football.prototype = {
    getMember: function () {
        console.log('每个队伍需要11名队员')
    },
    getBallSize: function () {
        console.log('足球很大')
    }
}

// 网球基类
let Tennis = function () {
    this.intro = '每年有很多网球系列赛'
}
Tennis.prototype = {
    getMember: function () {
        console.log('每个队伍需要1名队员')
    },
    getBallSize: function () {
        console.log('网球很小')
    }
}

// 运动工厂
let SportsFactory = function (name) {
    switch(name) {
        case 'NBA': return new Basketball(); break;
        case 'wordCup': return new Football(); break;
        case 'FrenchOpen': return new Tennis(); break;
    }
}

// let footnall = SportsFactory('wordCup')
// console.log(footnall)
// console.log(footnall.intro)
// footnall.getMember()
// footnall.getBallSize()

// let basknall = SportsFactory('NBA')
// console.log(basknall)
// console.log(basknall.intro)
// basknall.getMember()
// basknall.getBallSize()

// 基类中有相似或一样的可以抽象提取出来共用

function balls (intro, member, size) {
    let o = new Object()
    o.intro = intro
    o.member = member
    o.size = size
    o.getMember = function () {
        console.log(this.member)
    }
    o.getBallSize = function () {
        console.log(this.size)
    }
    return o
}

let ball1 = balls('篮球', '唱、跳、rap', 'duang')
console.log(ball1.getMember())

// ps: 第一种是通过类实例化对象创建的
// 第二种是通过创建一个新对象然后包装增强其属性和功能来实现的
// 他们之间的差异性也造成前面通过类创建的对象，如果这些类继承同一父类，那么他们的父类原型上的方法是可以共用的
// 而后面寄生方式创建的对象都是一个新的个体，所以他们的方法就不能共用了，选择哪种按需求来定
