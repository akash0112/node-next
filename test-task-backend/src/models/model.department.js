const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    managerId:String,
    employeeId:String,
    departmentname: String,
});

const DepartmentModel = mongoose.model('Department', departmentSchema);

module.exports = DepartmentModel;
