const server = require('http').createServer()

server.on('request', ((req, res) => {
    console.log('收到请求')
    setTimeout(()=>{
        res.end('hello')
    },3000)
}))

server.listen(8080, () => {

    console.log('监听在8080端口')
})
