const { exec } = require('../db/mysql') // 导入封装的执行 sql 的异步函数（promise）
const escape = require('mysql').escape;// 防止 sql 注入
const { Model } = require('../model/model') // 抽象的响应对象

exports.register = (req, res) => {
    const { username, password } = req.body

    console.log('执行注册操作');
    const crypto = require('../utils/crypto')
    // 生成一个随机密码盐
    const randomNum = Math.floor(Math.random() * 1000)
    const salt = crypto('' + randomNum)
    const cryptedPassword = crypto(password + salt)
    const sql = `INSERT INTO user VALUES(null,?,null,?,?)`
    exec(sql, [username, cryptedPassword, salt]).then(result => {
        const userId = result.insertId
        res.send(new Model({ userId }))
    })
}

exports.getAllMatters = (req, res) => {
    //    const userId =escape(req.)
    const sql = `SELECT user_id,matter.id,status,remarks,deadline FROM matter JOIN user ON matter.user_id=user.id WHERE user_id=${1};`
    exec(sql).then(results => {
        // console.log(results);
        for (const item of results) {
            delete item.user_id // 删除前端不需要的字段
        }
        const model = new Model(200, 'ok', results)
        res.send(model)
    })
}

exports.addMatter = (req, res) => {

    const addMatterSql = 'insert into matter values (?,?,?,?,?)'
    // console.log(req.body);
    const matter = req.body

    db.query(addMatterSql, [null, matter.name, 0, matter.remarks, matter.deadline], (err, results) => {
        if (err) {
            console.log(err.message)
            res.send({
                status: 400,
                msg: '添加失败！',
                data: null,
            })
            return
        }
        res.send({
            status: 200,
            msg: '添加成功！',
            data: null,
        })
    })

}

exports.deleteMatter = (req, res) => {
    // 删除指定用户的事项，sql怎么写？传matter id？不安全？解决：同时传 matter id 和 user id

    // console.log(req.params);
    const deleteMatterSql = 'delete from matter where id=?'
    db.query(deleteMatterSql, req.params.id, (err, results) => {
        if (err) {
            console.log(err.message)
            res.send({
                status: 400,
                msg: 'error!',
                data: null
            })
            return
        }
        res.send({
            status: 200,
            msg: '删除成功！',
            data: null,
        })
    })

}

const jwt = require('jsonwebtoken')
const secreKey = '123456'
exports.login = (req, res) => {
   
    // 通过传入的 username 查找对应的 userID
    const sql = `SELECT id FROM user WHERE user_name=${username}`

    // exec(sql, username).then(results => {
    //     const userId = results.id
    //     const token = jwt.sign({ userId: userId }, secreKey, { expiresIn: '60000s' })
    //     res.send({
    //         msg: 'ok',
    //         token: token
    //     })

    // })
    // 生成 token 
}

// exports.sessionTest = (req, res) => {
//     const { userName } = req.query
//     // console.log(req);
//     if (req.session.views) {
//         req.session.views++
//         res.setHeader('Content-Type', 'text/html')
//         res.write('<p>views: ' + req.session.views + '</p>')
//         res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
//         res.write('<p>userName: ' + userName + '</p>')
//         res.end()
//     } else {
//         req.session.views = 1 // 如果是第一次访问则 session 中没有 views 值
//         res.end('welcome to the session demo. refresh!' + userName) // 根据不同的参数展示不同的userName
//     }
// }