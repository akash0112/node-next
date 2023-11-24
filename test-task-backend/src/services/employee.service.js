const { buildFilterCriteria, buildSortCriteria, applyPagination } = require('../middlewares/pagination');
const { User } = require('../models');

const getEmployees = async (page = 1, name = '', location = '', sortBy = 'name', sortOrder = 'asc') => {
  try {
    const filter = buildFilterCriteria(name, location);
    const sortCriteria = buildSortCriteria(sortBy, sortOrder);
    const pagination = applyPagination(page);

    const query = User.find({ role: 'employee', ...filter })
      .select('-password')
      .populate({
        path: 'departments',
        select: 'departmentName', 
      })
      .skip(pagination.skip)
      .limit(pagination.limit)
      .sort(sortCriteria);

    const employees = await query.exec();
    return employees;
  } catch (error) {
    throw new Error('Error fetching employees');
  }
};

module.exports = {
  getEmployees,
};
