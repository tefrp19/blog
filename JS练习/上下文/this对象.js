// 如果this没有bind，this总是在函数执行时才被确定值，而不是声明时确定值
// 箭头函数没有自己的this，它只会从自己的作用域链的上一层继承this
// 1.作为某个对象的方法调用时，this指向该对象
function sayHi() {
    console.log(`Hi,I am ${this.name}`)
}

const p = {name: 'Tom'}
p.sayHello = sayHi
p.sayHello()

// 2. 作为构造函数，this指向实例对象
function MyConstructor(name) {
    this.name = name
    console.log(this)
}

const j = new MyConstructor('Jack') // this指向j


// 3.
let listens = [];

function fn(x) {
    // let x=4 //变成了5
    this.x = 3;
    return function (y) {
        this.x = 10;
        listens.push(() => {
            console.log(++this.x)
            console.log(--x)
        })
        console.log(x++ + y)
    }

}

let f = fn(4)(5);
new Promise(() => {
    listens.map(_ => _())
})
