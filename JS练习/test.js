function Person(name) {
    this.name = name
}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function () {
    console.log(this.name);
};
let person1 = new Person('nick');
console.log('person1:', person1);
console.log('person1.__proto__:', person1.__proto__);
let person2 = new Person.prototype.constructor('tom')//说明Person函数的prototype属性的constructor又指回了Person函数自身
console.log('person2:', person2);
let person3 = new Person();
console.log(person3.__proto__.__proto__);


