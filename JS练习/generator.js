// Generator 的应用？如何利用Generator实现异步？

// Generator 函数可以暂停执行和恢复执行，这是它能封装异步任务的根本原因。
// 除此之外，它还有两个特性，使它可以作为异步编程的完整解决方案：函数体内外的数据交换和错误处理机制。
function* gen() {
    var url = 'https://api.github.com/users/github';
    var result = yield fetch(url);
    console.log(result.bio);
}

var g = gen();
var result = g.next();
console.log(result);
result.value.then(function (data) {
    data = data.json()
    return data
}).then(function (data) {
    console.log('data',data);
    g.next(data);
});

