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

      <main className="content">
        <div className="container">
          <div style={styles.card}>
            <h2 className="create-form-heading">Create Employee</h2>

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

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Full viewport height
    backgroundColor: "#f0f0f0"
  },
  card: {
    border: "1px solid black", // Black border
    borderRadius: "10px",
    padding: "20px",
    backgroundColor: "white",
    width: "400px", // Card width
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center"
  },
  form: {
    display: "flex",
    flexDirection: "column"
  },
  formGroup: {
    display: "flex", // Flexbox for inline layout
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px"
  },
  label: {
    marginRight: "10px",
    width: "35%" // Adjust label width to align properly
  },
  input: {
    width: "60%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "5px"
  },
  inlineGroup: {
    display: "flex",
    alignItems: "center"
  },
  button: {
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default CreateEmployee;
