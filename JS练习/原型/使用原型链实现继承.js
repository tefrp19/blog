// 继承的前置知识
function Person(name, age, gender) {
    this.name = name
    this.age = age
    this.gender = gender
    // 下面这种申明方法浪费内存，每各实例的sayHi方法实质上都是不同的对象
    // this.sayHi=function () {
    //     console.log(`Hi! I am ${this.name}`);
    // }
}
// 将实例相同的方法或属性挂在在原型上可以节省内存和方便管理
Person.prototype.sayHi = function () {
    console.log(`Hi! I am ${this.name}`);
}
Person.prototype.end = 'die'

const person1 = new Person('张三', 18, '男')
const person2 = new Person('李四', 20, '女')
// console.log(person1);
// console.log(person2);
// console.log(person1.sayHi === person2.sayHi); // true

// 实例读属性或方法时会首先在自己身上找，找不到就到对应的原型上找，再找不到就到原型的原型上找，依次类推直到原型链的末端（这是实现继承的基础）
// console.dir(person1.sayHi);
// console.log(person1.say);// undefined
// Object.prototype.say = 1
// console.log(person1.say);// 1

// 实现继承

// 问题：
// 1. 如何实现子构造函数访问到父构造函数的属性、方法
// 2. 如何实现子构造函数重写父构造函数的属性、方法

// 解决：
function Teacher(name, age, gender, subject) {
    // 为通用属性赋值
    Person.call(this, name, age, gender)
    // 为子对象赋值
    this.subject = subject
}
// 继承 Person
// 方法1（在浏览器实现了__proto__属性，非 js 的标准）：
// Teacher.prototype.__proto__= Person.prototype
// 方法2：
Teacher.prototype = Object.create(Person.prototype) // 只定义这句话会使 Teacher 对应的原型丢掉 constructor 属性，需要重新将构造函数的原型指回构造函数
Teacher.prototype.constructor=Teacher

Teacher.prototype.sayHi = function () {
    console.log(`Hi I am ${this.name}, I am teaching ${this.subject}`);
}
const teacher1 = new Teacher('王五', 25, '男', 'math')
console.log(teacher1);
teacher1.sayHi()






