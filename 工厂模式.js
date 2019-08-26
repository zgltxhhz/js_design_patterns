class Creator {
    create(name) {
        return new Animal(name)
    }
}

class Animal{
    constructor (name) {
        this.name = name
    }
}

let creator = new Creator()

console.dir(creator.create)

// lets duck = creator.create('Duck')

// console.log(duck.name)


