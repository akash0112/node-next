const { EmployeeService } = require("../services");


const getEmployeesController = async (req, res) => {
  try {
    const { page = 1, name, location, sortBy = 'name', sortOrder = 'asc' } = req.query;
    const employees = await EmployeeService.getEmployees(page, name, location, sortBy, sortOrder);
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching employees' });
  }
};

module.exports = {
  getEmployeesController,
};
