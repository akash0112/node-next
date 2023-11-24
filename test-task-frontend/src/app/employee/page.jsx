"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeesSuccess } from '@/store/actions/authActions';
import { getEmployees } from '@/store/api/api';

const EmployeeList = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state?.auth?.user?.user?.role)
  const employeesList = useSelector((state) => state?.employees?.employees);

  const [expandedId, setExpandedId] = useState(null);
  const [nameFilter, setNameFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [sortBy, setSortBy] = useState('username');
  const [sortOrder, setSortOrder] = useState('asc');

  const fetchData = async ({ name, location, sortBy, sortOrder }) => {
    try {
      const data = await getEmployees({ name, location, sortBy, sortOrder });
      dispatch(fetchEmployeesSuccess(data));
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleFilter = () => {
    fetchData({ name: nameFilter, location: locationFilter, sortBy, sortOrder });
  };

  const handleSort = (field) => {
    if (field === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  useEffect(() => {
    fetchData({ name: nameFilter, location: locationFilter, sortBy, sortOrder });
  }, [dispatch, nameFilter, locationFilter, sortBy, sortOrder]);

  const toggleAccordion = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen px-5">
      <div className="flex items-center my-4">
        <input
          type="text"
          placeholder="Filter by Name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded mr-4"
        />
        <input
          type="text"
          placeholder="Filter by Location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded mr-4"
        />

        <button onClick={handleFilter} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Apply Filters
        </button>
      </div>


      <div className="mb-4">
        <button onClick={() => handleSort('username')}>
          Sort by Name {sortBy === 'username' && <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>}
        </button>
        <button onClick={() => handleSort('location')}>
          Sort by Location {sortBy === 'location' && <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>}
        </button>
      </div>


      <div className="max-w-full mx-auto mt-8">
        {role === "manager" ? <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-1 rounded">
          Assign
        </button> : ''}
        {employeesList.map((employee) => (
          <div key={employee._id} className="border-b border-gray-300 mb-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleAccordion(employee._id)}
            >
              <h3 className="px-5 py-2">
                <span className="font-bold text-lg"> Name: </span>
                {employee.username}
              </h3>
              <h3 className="px-5 py-2">
                <span className="font-bold text-lg"> Email: </span>
                {employee.email}
              </h3>
              <h3 className="px-5 py-2">
                <span className="font-bold text-lg"> Location: </span>
                {employee.location}
              </h3>
              <h3 className="px-5 py-2">
                <span className="font-bold text-lg"> Role: </span>
                {employee.role}
              </h3>
              <span>{expandedId === employee._id ? 'v' : '>'}</span>
            </div>
            {expandedId === employee._id && (
              <div className="p-4 bg-white">
                <ul>
                  {employee.departments.map((department) => (
                    <li key={department._id} className={`${role === 'flex justify-between items-center' ? 'flex' : ''}`}>
                      <span className="font-bold text-lg">Department: </span> {department.departmentName}
                      {role === 'manager' ? <button onClick={() => handleUpdateDepartment(employee._id, department._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-1 rounded">
                        Update
                      </button> : ''}
                      {role === 'manager' ? <button onClick={() => handleDeleteDepartment(employee._id, department._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-1 rounded">
                        Delete
                      </button> : ''}
                      {role === 'manager' ? <button onClick={() => handleAddDepartment(employee._id, department._id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-1 rounded">
                        Create
                      </button> : ''}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
