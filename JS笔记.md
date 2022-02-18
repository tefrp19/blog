# 历史

ECMAScript（读作/aekema/）是写在纸上的规定

JavaScript是浏览器执行的实际

往往是各浏览器厂商先自己试用语法，觉得想法不错就可以向上提议将自己的标准纳入国际标准



# js引擎

引擎从头到尾负责整个js程序的**编译及执行**的过程



# falsy

6个falsy值：

1. false
2. 0
3. "" 空串
4. null
5. undefined
6. NaN

 



# 值和类型

js变量有两个基本概念，**变量的名和变量的值（分为原始值和引用值）**。`let a=2`，a是一个变量，其名为a，值为2

js中变量是没有类型的，只有值才有。变量可以随时持有任何类型的值。

<table border="1">
        <thead>
            <tr>
                <th>变量名</th>
                <th>变量值（分原始值即基本类型和引用值即对象内存）</th>
                <th>堆内存</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>a</td>
                <td>123</td>
                <td rowspan="3"></td>
            </tr>
            <tr>
                <td>b</td>
                <td>0x8E（指向堆内存中某块地址）</td>
            </tr>
            <tr>
                <td>c</td>
                <td>0x9E</td>
            </tr>
        </tbody>
    </table>
[**函数传参传的是值，不是引用**](https://weread.qq.com/web/reader/751326d0720befab7514782k636320102206364d3f0ffdc)，[测试地址](JS练习/变量的引用值以及函数传值.js)

# 上下文

（执行）上下文主要有全局上下文（window）和函数上下文

## 自动提升

### var变量自动提升

```js
function add(num1, num2) {
    var sum = num1 + num2;
    // 上面这句话编译为以下两句话
    // var sum
    //sum= num1 + num2;
    return sum;
}
let result = add(10, 20); // 30
console.log(sum); // 报错：sum在这里不是有效变量
```

在全局上下文中用 var 申明变量，变量会成为 window 的属性，而在函数上下文中用 var 申明变量，变量则不会成为 window 的属性，离开函数的上下文刚刚申明的变量自动清理



### 函数声明（定义函数的其中一种方法）自动提升

```js
sayHi()
function sayHi(){
    console.log('Hi!');
}
```

这个例子不会抛出错误，因为 JavaScript 引擎会先读取函数声明，然后再执行代码。

## 闭包

闭包指的是那些**引用了另一个函数作用域中变量的函数**，通常是在嵌套函数中实现的。



# 对象的属性

对象是**属性和方法**的集合

对象的属性分两种：数据属性和访问器属性

## 数据属性

❑ [[Configurable]]：表示属性是否可以通过delete删除并重新定义，是否可以修改它的特性，以及是否可以把它改为访问器属性。默认情况下，所有直接定义在对象上的属性的这个特性都是true。

❑ [[Enumerable]]：表示属性是否可以通过for-in循环返回。默认情况下，所有直接定义在对象上的属性的这个特性都是true。

❑ [[Writable]]：表示属性的值是否可以被修改。默认情况下，所有直接定义在对象上的属性的这个特性都是true。

❑ [[Value]]：包含属性实际的值。这就是前面提到的那个读取和写入属性值的位置。这个特性的默认值为undefined。

通过Object.defineProperty()可以修改数据属性，例如：

```js
let person = {};
Object.defineProperty(person, "name", {
	writable: false,
	value: "Nicholas"
});
console.log(person.name); // "Nicholas"
person.name = "Greg";
console.log(person.name); // "Nicholas"
```



## 访问器属性

❑ [[Configurable]]：表示属性是否可以通过delete删除并重新定义，是否可以修改它的特性，以及是否可以把它改为数据属性。默认情况下，所有直接定义在对象上的属性的这个特性都是true。

❑ [[Enumerable]]：表示属性是否可以通过for-in循环返回。默认情况下，所有直接定义在对象上的属性的这个特性都是true。

❑ [[Get]]：获取函数，在读取属性时调用。默认值为undefined。

❑ [[Set]]：设置函数，在写入属性时调用。默认值为undefined。

通过Object.defineProperty()可以修改访问器属性，例如：

```js
// 定义一个对象，包含伪私有成员year_和公共成员edition
let book = {
    year_: 2017,
    edition: 1
};
Object.defineProperty(book, "year", {
    get() {
        return this.year_;
    },
    set(newValue) {
        if (newValue > 2017) {
            this.year_ = newValue;
            this.edition += newValue - 2017;
        }
    }
});
book.year = 2018;
console.log(book.edition); // 2
```

在这个例子中，对象book有两个默认属性：year_和edition。year_中的下划线常用来表示该属性并不希望在对象方法的外部被访问。另一个属性year被定义为一个访问器属性，其中获取函数简单地返回year_的值，而设置函数会做一些计算以决定正确的版本（edition）。因此，把year属性修改为2018会导致year_变成2018,edition变成2。这是访问器属性的典型使用场景，即设置一个属性值会导致一些其他变化发生。

# 原型

## 原型的提出与解决

我们需要**批量构造对象**（不用字面量创建对象方法，再手动添加属性和方法），引出了工厂模式创建对象：

```js
function createPerson(name, age, job) {
    let o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function () {
        console.log(this.name);
    };
    return o;
}
```

但这种方式有问题**无法区分对象的类型**，创建出来的对象都是Object类型，狗也是Object人也是Object，需要一种方法区分不同对象的类型，引出了构造函数：

```js
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function () {
        console.log(this.name);
    };
}
```

但构造函数有问题，其定义的方法会在每个实例上都创建一遍，**浪费内存**。于是我们将方法移到构造函数外部：

```js
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName=sayName;
}
function sayName () {
	console.log(this.name);
};
```

这带来了新的问题，全局作用域被搞乱了，如果构造函数上有多个方法将很难进行**管理**。这就引出了原型对象：

```js
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
}
Person.prototype.sayName=function () {
	console.log(this.name);
};
```

**实例之间公共的内容**可以挂到构造函数的原型对象上，**实现管理与共享，节省内存**。

## 原型链的产生

prototype是一个属性，指向原型对象，这个对象可以看作是所有Person实例的公共区域

下图的Person Prototype是一个原型对象，可以通过`Person.prototype`访问



<img src="https://res.weread.qq.com/wrepub/epub_34336683_41" alt="原型" style="zoom: 50%;" />

由于Person.prototype也是一个对象，也是由`new Object()`（底层）创建出的，所以Person的原型对象也会有原型对象（`即Person.__proto__.__proto__`），为Object（Object也是一个构造函数）的原型对象（Object.prototype），但到Object的原型就为止了（这像蛋生鸡鸡生蛋的问题），Object的原型的原型为null。





```js
Object.__proto__===Function.prototype//true
```

Object 是一个函数实例



# 数组

JS 中的数组不是典型数组，内存空间不连续。

伪数组原型没有指向 `Array.propotype`，所以没有 push和pop 等方法。



# this

this 在标准函数和箭头函数中有不同的行为：

1. 在标准函数中 this 引用的是**把函数当成方法调用的上下文对象**。
2. 在箭头函数中 this 引用的是**定义箭头函数的上下文**。

















# JS对象基本用法

## 声明对象的两种语法

1. 使用`new`关键字`const obj=new Object()`
2. 使用字面量`const obj={}`

## 如何删除对象的属性

`delete obj.xxx`

## 如何查看对象的属性

1. `obj.xxx`

2. `obj['xxx']`，第2中方法好处：方括号中能进行运算

## 如何修改或增加对象的属性

`obj.newXxx=xxx`

## 'name' in obj和obj.hasOwnProperty('name') 的区别

前者会先在对象自身寻找属性，找不到就沿着原型链寻找，后者只在自身寻找属性





# DOM

## 节点

```html
<div>
    <p title="title" myAttr="test">
        content
    </p >
</div>
```

上述结构中，`div`、`p`就是元素节点，`content` 就是文本节点，`title`、`myAttr` 就是属性节点

