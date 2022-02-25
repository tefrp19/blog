const express = require('express')
// 创建服务器的实例对象
const app = express()

// 注意中间件顺序问题

// 导入 cors 中间件实现跨域问题
const cors = require('cors')
app.use(cors())

// 配置 body-parser 中间件处理 json 数据
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// 配置 session 中间件
const session = require('express-session')
// 将session 存到 redis 中
app.use(session({
    secret: 'tefrp', // secret 为任意字符串
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3000 }
}))
// 该中间件配置成功后，可通过 req.session 来访问和使用 session 对象

// 导入路由（api）
const api = require('./router/api')
app.use(api)


app.listen(8000, () => {
    console.log('服务器运行在：http://127.0.0.1:8000');
})