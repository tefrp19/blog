function fn() {
    let a=1
    function fn2() {
        console.log(a);//会沿着上下文链寻找变量a，如果到全局上下文都没找到变量就抛出ReferenceError
    }
    fn2()
}
fn()