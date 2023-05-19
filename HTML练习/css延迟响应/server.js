const server = require('http').createServer()
server.on('request', (req, res) => {
    console.log(req.url);
    res.setHeader('Access-Control-Allow-Origin', '*')
    let body
    switch (req.url) {
        case '/css':
            // 响应的内容为css
            console.log('请求css文件');
            res.setHeader('Content-Type', 'text/css')
            body = `div{
                    background-color: blue;
                }`
            // setTimeout(() => {
                res.end(body)
            // }, 0)
            break;
        case '/js':
            // 响应的内容为js
            console.log('请求js文件');
            res.setHeader('Content-Type', 'text/javascript')
            body = `
            console.log(document.querySelectorAll('div'));
            console.log(document.querySelector('.test').style.backgroundColor)
            `
            setTimeout(() => {
                res.end(body)
            }, 3000)
            break;
        default:
            break;
    }



})

server.listen(8000, () => {
    console.log('服务器运行在8000端口');
})