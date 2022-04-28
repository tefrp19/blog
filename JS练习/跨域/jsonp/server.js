const http = require('http')
const server = http.createServer()
server.on('request', (req, res) => {
    const urlReg = /^\/jsonp/
    if (urlReg.test(req.url)) {
        // 如何实现验证，即不能让第三方请求该api？
        // 可以检查请求的referer
        console.log(req.headers.referer);
        const data = { data: 123 }
        res.setHeader('Content-Type', 'text/javascript')

        const fn = 'handleResponse' + '(' + JSON.stringify(data) + ');'
        const fn2 = '(()=>{console.log(`另一个函数`);})();'
        const fn3 = fn + fn2
        // 响应的内容为js代码
        res.end(fn3)
    }

})

server.listen(8000, () => {
    console.log('服务器运行在8000端口');
})