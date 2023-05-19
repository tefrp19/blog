class Person {
    private name: string
    private age: number | string
    constructor(name: string)
    constructor(name: string, age: number)

    constructor(name: string, age: number | string = '保密') {
        this.name = name
        this.age = age
    }
    getName(): string {
        return this.name
    }
    setName(name: string): void {
        this.name = name
    }
    sayHi() {
        console.log(`I am ${this.name}`);
    }
}

const p1 = new Person('张三')
const p2 = new Person('李四', 30)

console.log(p1);
