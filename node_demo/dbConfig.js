// 1. 导入mysql模块
const mysql = require('mysql')
// 2. 创建与MySQL数据库的连接关系
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'test'//指定操作的数据库
})

module.exports=db