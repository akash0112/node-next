const PAGE_SIZE = 10;

 const buildFilterCriteria = (name, location) => {
  const filter = {};
  if (name) {
    filter.name = { $regex: new RegExp(name, 'i') };
  }
  if (location) {
    filter.location = { $regex: new RegExp(location, 'i') };
  }
  return filter;
};

 const buildSortCriteria = (sortBy = 'name', sortOrder = 'asc') => {
  const sortCriteria = {};
  sortCriteria[sortBy] = sortOrder === 'asc' ? 1 : -1;
  return sortCriteria;
};

 const applyPagination = (page = 1) => {
  const skip = (page - 1) * PAGE_SIZE;
  return { skip, limit: PAGE_SIZE };
};

module.exports={
  applyPagination,
  buildFilterCriteria,
  buildSortCriteria
}