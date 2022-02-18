const express=require('express')
// 创建服务器的实例对象
const app=express()

// 导入 cors 中间件实现跨域问题
const cors=require('cors')
app.use(cors())

// 配置 body-parser 中间件处理 json 数据
const bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// 导入路由（api）
const api=require('./router/api')
app.use(api)


app.listen(80,()=>{
    console.log('服务器运行在：http://127.0.0.1:80');
})