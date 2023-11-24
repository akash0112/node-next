const express = require('express')
const userRouter = require('./user.routes')
const employeeRouter = require('./employee.routes')
const departmentRouter = require('./department.controller')
const router = express.Router()


router.use('/user',userRouter)
router.use('/',employeeRouter)
router.use('/',departmentRouter)


module.exports=router