const express = require('express');
const { EmployeeController } = require('../controllers');


const employeeRouter = express.Router();



employeeRouter.get('/employee', EmployeeController.getEmployeesController);

module.exports = employeeRouter;