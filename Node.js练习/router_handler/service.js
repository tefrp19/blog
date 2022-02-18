const db = require('../dbConfig.js') //导入操作数据库的对象



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