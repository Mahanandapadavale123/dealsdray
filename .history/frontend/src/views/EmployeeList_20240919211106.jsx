import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/employee.css";
import Header from "./layout/header";

const EmployeeList = () => {
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCreateEmployee = () => {
    navigate("/employees/create"); // Navigate to the create employee page
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/v1/employees",
          {
            withCredentials: true
          }
        );
       
        if ( response.data.status === true && Array.isArray(response.data.employees) ) {
          setEmployee(response.data.employees);
          console.log(employees);
          
        } else {
          setError("Unexpected response format");
        }
      } catch (err) {
        console.log(err);
        
        setError("Error fetching employees");
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
    <div className="page-container">
      <Header />

      <main className="content">
        <div className="container">
          <div className="row">
            <div className="page-heading-name">
              <span>Employee List</span>
              <div className="row">
                <button
                  className="create-button"
                  onClick={handleCreateEmployee}
                >
                  {" "}
                  Create Employee{" "}
                </button>
              </div>
            </div>

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
                {emps.map((employee) => (
                  <tr key={employee.f_Id}>
                    <td>{employee.f_Id}</td>
                    <td>
                      <img src={employee.f_Image} alt={employee.f_Name} />
                    </td>
                    <td>{employee.f_Name}</td>
                    <td>{employee.f_Email}</td>
                    <td>{employee.f_Mobile}</td>
                    <td>{employee.f_Designation}</td>
                    <td>{employee.f_gender}</td>
                    <td>{employee.f_Course}</td>
                    <td>
                      {new Date(employee.f_Createdate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeList;
