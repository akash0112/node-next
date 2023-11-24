const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  departmentName: String,
});

const DepartmentModel = mongoose.model('Department', departmentSchema);

module.exports = DepartmentModel;
