import React, { useState } from 'react';

const EmployeeForm = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    courses: [],
    image: null
  });

  // Designation options for dropdown
  const designations = [ 'Manager', 'saler', 'HR'];

  // Courses options for checkbox
  const courses = ['Java', 'JavaScript', 'Python', 'Node.js'];

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
    console.log('Form data submitted:', formData);
  };

  return (
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

      <div>
        <label>Designation:</label>
        <select
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          required
        >
          <option value="">Select Designation</option>
          {designations.map((designation, index) => (
            <option key={index} value={designation}>
              {designation}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Gender:</label>
        <input
          type="radio"
          name="gender"
          value="Male"
          checked={formData.gender === 'Male'}
          onChange={handleGenderChange}
        />{' '}
        Male
        <input
          type="radio"
          name="gender"
          value="Female"
          checked={formData.gender === 'Female'}
          onChange={handleGenderChange}
        />{' '}
        Female
      </div>

      <div>
        <label>Courses:</label>
        {courses.map((course, index) => (
          <div key={index}>
            <input
              type="checkbox"
              name="courses"
              value={course}
              checked={formData.courses.includes(course)}
              onChange={handleCourseChange}
            />
            {course}
          </div>
        ))}
      </div>

      <div>
        <label>Image Upload:</label>
        <input type="file" name="image" onChange={handleFileChange} />
      </div>

      <button type="submit">Create Employee</button>
    </form>
  );
};

export default EmployeeForm;
