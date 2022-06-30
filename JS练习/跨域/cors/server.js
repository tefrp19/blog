const http = require('http')
const server = http.createServer()

server.on('request', (req, res) => {
    // 实现cors跨域

    // 1.如果是简单请求，只需要配置Access-Control-Allow-Origin字段
    // res.setHeader('Access-Control-Allow-Origin', '*'); //这个表示任意域名都可以访问，这样写不能携带cookie
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5501');

    // 2.如果是复杂请求，还需要配置其他字段，例如Access-Control-Allow-Methods允许请求的方法、Access-Control-Allow-Headers允许请求的头字段（一般为自定义）
    res.setHeader('Access-Control-Allow-Methods', 'DELETE,PUT');//设置方法
    res.setHeader("Access-Control-Allow-Headers", 'mytest')
    if (req.url === '/cors') {
        const data = {
            data: 123
        }
        res.end(JSON.stringify(data))
    }

})

server.listen(8000, () => {
    console.log('服务器运行在8000端口');
})