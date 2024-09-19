import React, { useState } from "react";
import Header from "./layout/header";
import "../css/create.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const designations = ["Manager", "Sales", "HR"];
    const courses = ["MCA", "BCA", "BSC"];

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formDataToSend = new FormData(); // Using FormData to handle file uploads
            formDataToSend.append('name', formData.name);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('mobileNo', formData.mobile);
            formDataToSend.append('designation', formData.designation);
            formDataToSend.append('gender', formData.gender);
            formData.courses.forEach(course => formDataToSend.append('courses[]', course));
            formDataToSend.append('image', formData.image);

            // Make the POST request using axios
            const response = await axios.post('http://127.0.0.1:8000/api/v1/employees', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            // Check for successful response
            if (response.status === 201) {
                alert(response.data.message); // Assuming your API sends a message
                console.log('Success:', response.data);
                navigate("/employees"); // Redirect to the employee list
            } else {
                alert(response.data.message); // Handle unexpected responses
            }
        } catch (err) {
            console.error('Error creating employee:', err);
            if (err.response) {
                alert(err.response.data.message); // Show specific error message from API
            } else {
                alert('An unexpected error occurred.'); // Fallback error message
            }
        } finally {
            setIsLoading(false); // End loading
        }
    };

    return (
        <div className="page-container">
            <Header />

            <div className="row breadcrumb">
                <span>Create Employee</span>
            </div>

            <main className="content">
                <div className="container form-div">
                    <div className="card">
                        <form onSubmit={handleSubmit} className="form" encType="multipart/form-data">
                            <div className="formGroup">
                                <label className="label">Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="input"
                                    required
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
                                    className="input"
                                    required
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
                                    required
                                />
                            </div>

                            {/* Designation */}
                            <div className="formGroup">
                                <label className="label">Designation:</label>
                                <select
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleChange}
                                    className="input"
                                    required
                                >
                                    <option value="">Select Designation</option>
                                    {designations.map((designation) => (
                                        <option key={designation} value={designation}>{designation}</option>
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
                                        />{" "}
                                        Male
                                    </label>
                                    <label style={{ marginLeft: "10px" }}>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="Female"
                                            onChange={handleGenderChange}
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
                                <label className="label">Img Upload:</label>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleFileChange}
                                    className="input"
                                />
                            </div>

                            {/* Submit Button */}
                            <button type="submit" className="button">
                                {isLoading ? "Submitting..." : "Submit"}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CreateEmployee;
