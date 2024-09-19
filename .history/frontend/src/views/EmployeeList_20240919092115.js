import React, { useEffect, useState } from 'react';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  
  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/v1/employees');
      const data = await response.json();
      setEmployees(data);
    };

    fetchEmployees();
  }, []);

  return (
    <div>
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Create Date</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.f_Id}>
              <td>{employee.f_Id}</td>
              <td><img src={employee.f_Image} alt={employee.f_Name} width="50" /></td>
              <td>{employee.f_Name}</td>
              <td>{employee.f_Email}</td>
              <td>{employee.f_Mobile}</td>
              <td>{employee.f_Designation}</td>
              <td>{employee.f_gender}</td>
              <td>{employee.f_Course}</td>
              <td>{employee.f_Createdate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
