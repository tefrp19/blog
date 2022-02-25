// 1. 导入mysql模块
const mysql = require('mysql')
// 2. 创建与MySQL数据库的连接关系
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'test'//指定操作的数据库
})

// redis 连接
const redis = require('redis')
const redisClient = redis.createClient({
    url: 'redis://tefrp:passwords@121.41.94.106:6379',

})
// (async () => {

// redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();
// await redisClient.connect();

// await redisClient.set('key', 'value');
// const value = await redisClient.get('key');
// })()


module.exports = {
    db,

}
