const express = require('express')
// 创建路由对象
const router = express.Router()

const service = require('../router_handler/service')
router.get('/getAllMatters', service.getAllMatters)
router.post('/addMatter', service.addMatter)
router.get('/deleteMatter/:id', service.deleteMatter)
router.post('/login',service.login)
router.get('/sessionTest',service.sessionTest)


module.exports = router

