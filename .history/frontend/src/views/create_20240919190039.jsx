import React, { useState } from "react";
import Header from "./layout/header";
import "../css/create.css";

const CreateEmployee = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    courses: [],
    image: null
  });

  // Designation options for dropdown
  const designations = ["Manager", "saler", "HR"];

  // Courses options for checkbox
  const courses = ["Java", "JavaScript", "Python", "Node.js"];

  // Handle input changes for textboxes and dropdown
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle gender (radio button)
  const handleGenderChange = (e) => {
    setFormData({ ...formData, gender: e.target.value });
  };

  // Handle course selection (checkbox)
  const handleCourseChange = (e) => {
    const selectedCourse = e.target.value;
    const updatedCourses = formData.courses.includes(selectedCourse)
      ? formData.courses.filter((course) => course !== selectedCourse)
      : [...formData.courses, selectedCourse];
    setFormData({ ...formData, courses: updatedCourses });
  };

  // Handle file input for image upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you would typically send formData to your backend
    console.log("Form data submitted:", formData);
    // navigate('/create-employee');
  };

  return (
    <div class="page-container">
      <Header />


      <main className="content">
        <div className="container">
          <div className="row page-heading-name">
            <span>Employee List</span>
            <div className="row">
              <button className="create-button" onClick={handleCreateEmployee}>
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
              {employees.map((employee) => (
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
      </main>




      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Mobile No:</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>

        {/* Other form fields go here */}

        <button type="submit">Create Employee</button>
      </form>
    </div>
  );
};

export default CreateEmployee;
