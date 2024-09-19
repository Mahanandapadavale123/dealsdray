// EmployeeList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Styles from '../css/employee.css'

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/employees', {
          withCredentials: true,  // Ensure cookies are sent with the request if needed
        });
        if (response.data.status === true && Array.isArray(response.data.data)) {
          setEmployees(response.data.data); // Assuming data is in response.data.data
        } else {
          setError('Unexpected response format');
        }
      } catch (err) {
        setError('Error fetching employees');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
