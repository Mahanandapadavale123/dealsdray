import React, { useState } from "react";
import Header from "./layout/header";
import "../css/create.css";

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

  const designations = ["Manager", "Saler", "HR"];
  const courses = ["Java", "JavaScript", "Python", "Node.js"];
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleGenderChange = (e) => {
    setFormData({ ...formData, gender: e.target.value });
  };

  const handleCourseChange = (e) => {
    const selectedCourse = e.target.value;
    const updatedCourses = formData.courses.includes(selectedCourse)
      ? formData.courses.filter((course) => course !== selectedCourse)
      : [...formData.courses, selectedCourse];
    setFormData({ ...formData, courses: updatedCourses });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
  };
  return (
    <div class="page-container">
      <Header />
      <div className="row breadcrump" >
          <span>Create Employee</span>
      </div>

      <main className="content">
        <div className="container">
          <div className="card">
          
            <form
              onSubmit={handleSubmit}
              className="form"
              encType="multipart/form-data"
            >
              {/* Name */}
              <div className="formGroup">
                <label className="label">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
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
                  onChange={handleChange}
                  required
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
                  required
                  className="input"
                />
              </div>

              {/* Designation */}
              <div className="formGroup">
                <label className="label">Designation:</label>
                <select
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                  className="input"
                >
                  <option value="">Select Designation</option>
                  {designations.map((designation) => (
                    <option key={designation} value={designation}>
                      {designation}
                    </option>
                  ))}
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
                      value="Male"
                      onChange={handleGenderChange}
                      required
                    />{" "}
                    Male
                  </label>
                  <label style={{ marginLeft: "10px" }}>
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      onChange={handleGenderChange}
                      required
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
                        onChange={handleCourseChange}
                      />{" "}
                      {course}
                    </label>
                  ))}
                </div>
              </div>

              {/* Image Upload */}
              <div className="formGroup">
                <label className="label">Upload Image:</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
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