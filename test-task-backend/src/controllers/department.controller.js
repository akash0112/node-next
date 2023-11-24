
const { DepartmentService } = require("../services");
const { deleteDepartment, updateDepartment, createDepartment } = require("../services/department.service");

const assignEmployee = async (req, res) => {
  const { employeeId, departmentName } = req.body;

  try {
    const result = await DepartmentService.assignDepartmentToEmployee(employeeId, departmentName);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createDepartmentController = async (req, res) => {
  const { departmentName, employeeId } = req.body;

  try {
    const result = await createDepartment(departmentName, employeeId);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateDepartmentController = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;

  try {
    const result = await updateDepartment(id, newData);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteDepartmentController = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deleteDepartment(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  assignEmployee,
  updateDepartmentController,
  deleteDepartmentController,
  createDepartmentController
};
