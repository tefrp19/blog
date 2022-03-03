const { Model } = require('../model/model')
const { exec } = require('../db/mysql')
// 校验注册
exports.checkRegister = (req, res, next) => {
    const { username, password } = req.body
    // console.log(username, password);
    // 1. 检查用户名是否符合规则：只能由字母、数字和下划线组成，且必须由字母或数字开头，长度最少1位最多10位
    // const usernameReg=/^[a-z|A-Z]([a-z|A-Z|_|0-9]){0,9}$/
    const usernameReg = /^[a-zA-Z0-9]\w{0,9}$/
    if (!usernameReg.test(username)) {
        // 403：服务器理解请求客户端的请求，但是拒绝执行此请求
        res.send(new Model(403, '用户名不符合规范'))
        // 结束该中间件（中间件不继续向后传递，结束本次请求）
    }

    // 2. 检查密码是否符合规则：不能包含空格，长度为8-16位字符（密码过长服务器一直计算），只能包含如下特殊字符：-_.
    const passwordReg = /^[\w\-_.]{8,20}$/
    if (!passwordReg.test(password)) {
        res.send(new Model(403, '密码不符合规范'))
    }

    // 3. 检查用户名是否已存在
    const sql = 'SELECT COUNT(*) FROM user WHERE user_name=?;'
    exec(sql, username).then(result => {
        const userNum = result[0]['COUNT(*)']
        if (userNum === 1) {
            res.send(new Model(403, '用户名重复，请重试！'))
        } else {
            // 4. 都没有问题则进行注册
            next()
        }

    })
}

// 校验登录 
exports.checkLogin = (req, res, next) => {
    let { username, password } = req.body
    // 1. 检查用户名是否存在
    const sql1 = 'SELECT COUNT(*) FROM user WHERE user_name=?;'
    exec(sql1, username).then(result => {
        console.log(result);
        const userNum = result[0]['COUNT(*)']
        if (userNum === 0) {
            res.send(new Model(403, '用户名不存在，请重试！'))
            return
        }
    })

    // 2. 检查密码是否正确
    const sql2 = 'SELECT COUNT(*) FROM user WHERE user_name=? and password=?;'
    // const salt=
    // password=require
    exec(sql2, [username,]).then(result => {
        const userNum = result[0]['COUNT(*)']
        if (userNum === 0) {
            res.send(new Model(403, '用户名不存在，请重试！'))
            return
        }
    })
    // 成功登录
    console.log(username, password);
}