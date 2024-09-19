import './EmployeeForm.css';

const EmployeeForm = () => {
  // form handling logic remains the same
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

      {/* Other form fields go here */}

      <button type="submit">Create Employee</button>
    </form>
  );
};

export default EmployeeForm;
