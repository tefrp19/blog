const server = require('http').createServer()

server.on('request', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Cache-Control')

    const querystring = require('querystring')
    let reqBodyData = ''
    req.on('data', (chunk) => {
        reqBodyData += chunk
        console.log(querystring.parse(reqBodyData));
    })

    const method = req.method

    const handleReq = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('ok')
            }, 2000)
        })
    }
    let data
    switch (method) {
        // 预检请求
        case 'OPTIONS':
            console.log('OPTIONS');
            res.end()
            break;
        case 'GET':
            console.log('get');

            res.setHeader('Cache-Control', 'public,max-age=10')
            data = await handleReq()
            res.end(data)
            break;
        case 'POST':
            console.log('post');
            res.setHeader('Cache-Control', 'public,max-age=10000')
            data = await handleReq()
            res.end(data)
            break;
        default:
            break;
    }

})
server.listen(8080)