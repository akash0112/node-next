const { DepartmentModel, User } = require("../models");

const assignDepartmentToEmployee = async (employeeId, departmentName) => {
  try {
    const employee = await User.findById(employeeId);
    if (!employee) {
      throw new Error('Employee not found');
    }

    let department = await DepartmentModel.findOne({ departmentName });

    if (!department) {
      department = new DepartmentModel({ departmentName });
      await department.save();
    }

    const existingDepartment = employee.departments.find(
      dep => dep.toString() === department._id.toString()
    );

    if (!existingDepartment) {
      employee.departments.push(department._id);
      await employee.save();
    } else {
      throw new Error('Department already assigned to the employee');
    }

    return { message: 'Department assigned to employee successfully', employee };
  } catch (error) {
    throw new Error(error.message);
  }
};



const createDepartment = async (departmentName, employeeId) => {
  try {
    const employee = await User.findById(employeeId);

    if (!employee) {
      throw new Error('Employee not found');
    }
    let department = await DepartmentModel.findOne({  departmentName });

    if (!department) {
      department = new DepartmentModel({ departmentName });
      await department.save();
    }

    const existingDepartment = employee.departments.find(
      dep => dep._id.toString() === department._id.toString()
    );

    if (!existingDepartment) {
      employee.departments.push(department._id);
      await employee.save();
    } else {
      throw new Error('Department already assigned to the employee');
    }

    const departments = await DepartmentModel.create({departmentName});
    departments.employee = employeeId; 
    await departments.save();

    return { message: 'Department created successfully',  departments };
  } catch (error) {
    throw new Error('Error creating department: ' + error.message);
  }
};



const updateDepartment = async (departmentId, newData) => {
  try {
    const department = await DepartmentModel.findById(departmentId);

    if (!department) {
      throw new Error('Department not found');
    }

    Object.assign(department, newData);
    await department.save();

    return { message: 'Department details updated successfully', department };
  } catch (error) {
    throw new Error('Error updating department details: ' + error.message);
  }
};

const deleteDepartment = async (departmentId) => {
  try {
    const department = await DepartmentModel.findById(departmentId);

    if (!department) {
      throw new Error('Department not found');
    }

    await department.deleteOne();

    return { message: 'Department deleted successfully' };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  assignDepartmentToEmployee,
  deleteDepartment,
  updateDepartment,
  createDepartment
};
