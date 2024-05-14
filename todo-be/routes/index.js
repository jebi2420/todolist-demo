const express = require('express')
const router = express.Router()
const taskApi = require('./task.api')

router.use('/tasks', taskApi) // /tasks 주소가 불리면 무조선 taskApi 로 간다

module.exports = router;