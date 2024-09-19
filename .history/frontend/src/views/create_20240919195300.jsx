import React, { useState } from "react";
import Header from "./layout/header";
import "../css/create.css";
import axios from "axios";

const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    courses: [],
    image: null
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true); // Start loading
      setError(null); // Reset error
      setSuccess(null); // Reset success

      try {
        const formDataToSend = new FormData(); // Using FormData to handle file uploads

        // Append form fields to FormData
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('mobile', formData.mobile);
        formDataToSend.append('designation', formData.designation);
        formDataToSend.append('gender', formData.gender);
        formData.courses.forEach((course) => formDataToSend.append('courses[]', course));
        formDataToSend.append('image', formData.image);

        // Make the POST request using axios
        const response = await axios.post('http://127.0.0.1:8000/api/v1/employees', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        // Handle success response
        if (response.status === 200) {
          setSuccess('Employee created successfully!');
          console.log('Success:', response.data);
        }
      } catch (err) {
        // Handle error
        setError('An error occurred while submitting the form. Please try again.');
        console.error('Error:', err.response || err.message);
      } finally {
        setIsLoading(false); // End loading
      }
  };



  return (
    <div className="page-container">
      <Header />

      <div className="row breadcrump" >
          <span>Create Employee</span>
      </div>

      <main className="content">
        <div className="container">
          <div className="card">
          
            <form onSubmit={handleSubmit} className="form" encType="multipart/form-data" >
              <div className="formGroup">
                <label className="label">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  
                  className="input"
                />
              </div>

              {/* Email */}
              <div className="formGroup">
                <label className="label">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  
                  className="input"
                />
              </div>

              {/* Mobile */}
              <div className="formGroup">
                <label className="label">Mobile Number:</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  
                  className="input"
                />
              </div>

              {/* Designation */}
              <div className="formGroup">
                <label className="label">Designation:</label>
                <select
                  name="designation"
                  value={formData.designation} className="input"
                >
                  <option value="">Select Designation</option>
                    <select selected value="" disabled></select>
                    <option value="HR">HR</option>
                    <option value="Manager">Manager</option>
                    <option value="Sales">Sales</option>
                </select>
              </div>

              {/* Gender */}
              <div className="formGroup">
                <label className="label">Gender:</label>
                <div className="inlineGroup">
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Male"  />{" "}
                    Male
                  </label>
                  <label style={{ marginLeft: "10px" }}>
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                    />{" "}
                    Female
                  </label>
                </div>
              </div>

              {/* Courses */}
              <div className="formGroup">
                <label className="label">Courses:</label>
                <div className="inlineGroup">
                  {courses.map((course) => (
                    <label key={course} style={{ marginRight: "10px" }}>
                      <input
                        type="checkbox"
                        value={course}
                      />{" "}
                      {course}
                    </label>
                  ))}
                </div>
              </div>

              {/* Image Upload */}
              <div className="formGroup">
                <label className="label">Img Upload:</label>
                <input
                  type="file"
                  name="image"
                  className="input"
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="button">
                 Submit
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};




export default CreateEmployee;
