var Person = /** @class */ (function () {
    function Person(name, age) {
        if (age === void 0) { age = '保密'; }
        this.name = name;
        this.age = age;
    }
    Person.prototype.getName = function () {
        return this.name;
    };
    Person.prototype.setName = function (name) {
        this.name = name;
    };
    Person.prototype.sayHi = function () {
        console.log("I am ".concat(this.name));
    };
    return Person;
}());
var p1 = new Person('张三');
var p2 = new Person('李四', 30);
console.log(p1);
