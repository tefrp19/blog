const { db } = require('../dbConfig.js') //导入操作数据库的对象


exports.getAllMatters = (req, res) => {
    const getAllMattersSql = 'select * from matter'
    db.query(getAllMattersSql, (err, results) => {
        if (err) {
            console.log(err.message)
            res.send({
                status: 400,
                msg: 'error!',
                data: null
            })
            return
        }
        // console.log(results)
        res.send({
            status: 200,
            msg: '查询成功',
            data: results,
        })
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

exports.login = (req, res) => {
    console.log(req.session);
    if (!req.session.users) req.session.users = []
    req.session.users.push()


    res.send({
        msg: 'ok'
    })
}

exports.sessionTest = (req, res) => {
    const { userName } = req.query
    // console.log(req);
    if (req.session.views) {
        req.session.views++
        res.setHeader('Content-Type', 'text/html')
        res.write('<p>views: ' + req.session.views + '</p>')
        res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
        res.write('<p>userName: ' + userName + '</p>')
        res.end()
    } else {
        req.session.views = 1 // 如果是第一次访问则 session 中没有 views 值
        res.end('welcome to the session demo. refresh!' + userName) // 根据不同的参数展示不同的userName
    }
}