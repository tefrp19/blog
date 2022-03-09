const express = require('express')
const app = express()
const server = require('http').createServer(app)
const WebSocket = require('ws')

const wss = new WebSocket.Server({ server: server })

wss.on('connection', (ws) => {
    // 客户端连接到服务器
    console.log('new client connected!');
    ws.send('已连接到服务器')
    // 服务器收到信息
    ws.on('message', (message) => {
        console.log('从客户端来的消息：', message);
        wss.clients.forEach(function each(client) {
            if (client!==ws&& client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    })
})

app.get('/hello', (req, res) => res.send('hello!'))

server.listen(8000, () => console.log('服务器监听在8000端口'))


