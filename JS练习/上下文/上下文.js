function fn() {
    let a='a'
    function fn2() {
        console.log(a);//会沿着上下文链寻找变量a，如果到全局上下文都没找到变量就抛出ReferenceError（严格模式）或变量为undefined（非严格模式）
    }
    fn2()
}
fn()

// var关键字只有全局上下文和函数上下文的概念，而let关键字多了一个块级作用域的概念
{
    let b='b'
}
// console.log(b) // 报错

{
    var c='c'
}
console.log(c) // 不报错