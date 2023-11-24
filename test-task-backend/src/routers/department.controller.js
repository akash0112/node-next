const express = require('express');
const { DepartmentController } = require('../controllers');
const { verifyToken } = require('../middlewares/authVerify');



const departmentRouter = express.Router();



departmentRouter.post('/assignDepartment', DepartmentController.assignEmployee);
departmentRouter.put('/assignDepartment/:id', verifyToken,DepartmentController.updateDepartmentController);
departmentRouter.delete('/assignDepartment/:id', verifyToken, DepartmentController.deleteDepartmentController);
departmentRouter.post('/createDepartment', verifyToken, DepartmentController.createDepartmentController);

module.exports = departmentRouter;