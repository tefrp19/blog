const server = require('http').createServer()

server.on('request', (req, res) => {
    // 解决跨域
    // 对于附带身份凭证的请求（通常是 Cookie），服务器不得设置 Access-Control-Allow-Origin 的值为*。
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5501');
    // 传输cookie还需添加下面这行
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    if (req.url === '/cookie') {
        console.log(req.url);
        console.log(req.headers.cookie);
        res.setHeader('Set-Cookie', 'serverCookie=test;HttpOnly')
        
        res.end('hello')
    }

    // 另外，如果前后端的项目不在一个ip下部署的，set-cookie会无效除非是https协议并对set-cookie响应头进一步设置
})
server.listen(8000, () => {
    console.log('服务器运行在8000端口');
})