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

闭包使得内层函数能访问到外层函数的作用域。

### 应用场景

节流和防抖



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

### call、apply的应用

call的一种用法：防抖（或节流）函数封装事件回调函数，指定回调函数的this
```js
function debounce(fn, delay) {
    let timer
    return function (event) { // 此时的 function 相当于addEventListener的第二个参数
        const context = this // 将 this 存到一个变量中
        // const arg=arguments
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.call(context, event) // 调用fn函数，并将fn的this指定为外部函数的this，此时fn中的this指向 domElement
            // fn.apply(context,arg) call()方法的作用和 apply() 方法类似，区别就是call()方法接受的是参数列表，而apply()方法接受的是一个参数数组。
        }, delay);
    }
}
function callback(event){
    console.log(event)
}
domElement.addEventListener('xxx',debounce(callback, 500))
```

call的另一种用法：手写继承时，在子构造函数中调用父构造函数，使用call以新创建的对象为上下文构造函数

```js
function Person(name, age, gender) {
    this.name = name
    this.age = age
}
function Teacher(name, age, gender, subject) {
    // 为通用属性赋值
    Person.call(this, name, age, gender)
    // 为子对象赋值
    this.subject = subject
}
```













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



# 异步

做一件任务需要等待时间，如果等待期间不能做任何事情那么这件任务称为同步任务，需要把该任务做完了才能做下一件任务；如果等待期间可以做其他任务那么这件任务称为异步任务。

在异步中通知任务解决完有两种方式：1.轮询，每隔一段时间查询任务是否做完 2.回调，任务一做完就通知![synchronous mode](https://www.ruanyifeng.com/blogimg/asset/201310/2013102002.png)![asynchronous mode](https://www.ruanyifeng.com/blogimg/asset/201310/2013102004.png)

js 中任务分为宏任务和微任务，`script` 标签中常见的语句都是宏任务， `setTimeout()` 是宏任务，`I/O` 是宏任务。`promise` 是微任务（但在实例化的过程中所执行的代码都是同步进行的，只有 `then` 方法中注册的回调是异步执行的）。

执行顺序：执行同步任务，执行完后检查异步任务是否完成，若完成则执行相应的回调，微任务又会在宏任务之前完成。

# BOM

## cookie

cookie 是覆盖写

```js
document.cookie = 'test1=hello';
document.cookie = 'test1=hello22';
// cookie 为hello22
```

### httpOnly属性

若某cookie为httpOnly，则`document.cookie` 读不到cookie，并且客户端不能修改cookie

## max-Age

当cookie过期（Expires/Max-Age为过去的时间），浏览器会删除cookie



# web性能优化

（看waiting TTFB时间判断后端处理时间）
web性能优化：

1. 设置请求、响应头中的`cache-control`字段，将资源在浏览器本地长时间**缓存**。（可采用内容摘要、版本号作为缓存更新依据 —— 实现精确的缓存控制）[大公司里怎样开发和部署前端代码——知乎张云龙](https://www.zhihu.com/question/20790576/answer/32602154)
2. 静态资源使用CDN加速
3. 浏览器**对同一域名下的同时请求有数量限制**比如10个，所以可将不同资源**放到不同域名**下，html、css、js放到static1.domain.com，png等图片资源放到另一个域名static2.domain.com
4. 对于[复杂请求](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS#%E7%AE%80%E5%8D%95%E8%AF%B7%E6%B1%82)需要额外发送一次预检请求，服务端设置`Access-Control-Max-Age`字段缓存该OPTIONS预检请求的响应结果



# 跨域

从https://a.com加载静态资源到浏览器（get请求），但js发送了ajax或fetch请求到非同源的url，默认情况下会出现跨域问题

## jsonp

利用`script`标签加载不算跨域的特性实现跨域请求，详情见[jsonp](JS练习/跨域/jsonp)

## CORS

非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求（preflight），method为`options`。

浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些HTTP动词和头信息字段（主要通过在服务器配置一些响应头：`Access-Control-Allow-Origin: http://foo.com`、`Access-Control-Allow-Methods: GET, POST, PUT`等）。只有得到肯定答复，浏览器才会发出**正式的**ajax请求，否则就报错。

详情见[CORS](JS练习/跨域/CORS)

# 设计模式

方应杭：推荐JS只用看：（推荐看大话设计模式）

1. 发布订阅模式（又叫观察者模式=>事件委托=>DOM事件
2. 迭代模式
3. 装饰器模式

# token

用加密算法将数据+时间进行加密生成一个`xxx.xxx.xxx`的JWT发送给客户端，客户端一般存在localStorage中，每次需要进行身份验证的时候在请求首部添加`Authorization`字段，将token放在其中。服务端拿到token判断时间是否过期以及获取token中的数据（一般为userId）



# XHR与fetch对比

XHR有timeout属性，代表着一个请求在被自动终止前所消耗的毫秒数，可以用于拦截超时请求，例如请求在网络上传输过久（ttl）、服务端处理数据过久

XHR有progress事件，会在请求接收到数据的时候被周期性触发，可以用于监听请求进度



XHR不支持上传流式文件

fetch支持上传流式





# 框架

[框架解决问题](https://zhuanlan.zhihu.com/p/45510072)：**使用声明式语法，描述组件对象的嵌套关系，并自动生成与dom对象的对应关系。**

没有框架时写网页步骤：

1. 先写html、css静态页面
2. 操作dom，利用节点innerHTML属性生成元素

这样有个问题，页面改动时还需先写静态html改样式再写入innerHTML