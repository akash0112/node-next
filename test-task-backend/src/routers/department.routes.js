const express = require('express');
const {  DepartmentController } = require('../controllers');
const departmentRouter = express.Router();



departmentRouter.post('/assignDepartment', DepartmentController.assignDepartment);

module.exports = departmentRouter;