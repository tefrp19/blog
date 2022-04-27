const server=require('http').createServer()
server.on('request',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:5501')
    res.end('hello')
})
server.listen(8080,()=>{
    console.log('服务器监听在8080端口');
})