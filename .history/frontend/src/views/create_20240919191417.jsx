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
            <h2>Create Employee</h2>
              <br>
            <form
              onSubmit={handleSubmit}
              style={styles.form}
              encType="multipart/form-data"
            >
              {/* Name */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>

              {/* Email */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>

              {/* Mobile */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Mobile Number:</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>

              {/* Designation */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Designation:</label>
                <select
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                  style={styles.input}
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
              <div style={styles.formGroup}>
                <label style={styles.label}>Gender:</label>
                <div style={styles.inlineGroup}>
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
              <div style={styles.formGroup}>
                <label style={styles.label}>Courses:</label>
                <div style={styles.inlineGroup}>
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
              <div style={styles.formGroup}>
                <label style={styles.label}>Upload Image:</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  style={styles.input}
                />
              </div>

              {/* Submit Button */}
              <button type="submit" style={styles.button}>
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full viewport height
    backgroundColor: '#f0f0f0'
  },
  card: {
    border: '1px solid black', // Black border
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: 'white',
    width: '400px', // Card width
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  formGroup: {
    display: 'flex', // Flexbox for inline layout
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px'
  },
  label: {
    marginRight: '10px',
    width: '35%' // Adjust label width to align properly
  },
  input: {
    width: '60%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '5px'
  },
  inlineGroup: {
    display: 'flex',
    alignItems: 'center'
  },
  button: {
    padding: '10px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};


export default CreateEmployee;