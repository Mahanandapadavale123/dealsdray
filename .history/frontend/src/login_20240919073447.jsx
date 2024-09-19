import React, { useState } from "react";
import axios from "axios";
import styles from "./css/login.module.css";

const Login = ({ setToken }) => {
  const [f_userName, setF_userName] = useState("");
  const [f_Pwd, setF_Pwd] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/users/login",
        { f_userName, f_Pwd }
      );

      const { status, message } = response.data;
      
      if(status == true){
        alert(message);
        setToken(response.data.token);
      }else{
        alert(message);

        const data = await response.json();

        if (data.status) {
          // Redirect after successful login
          window.location.href = '/EmployeeTable';  // Adjust the path as needed
        } else {
          alert(data.message);  // Show error message
        }
      }
      
    } catch (error) {
      console.log(error);
      
      alert("Invalid Credentials");
    }
    
  };

  return (
    <div>
      <p><b>Login Page</b></p>
    <div className={styles.container}>
      <div className={styles.formContainer}>

        <form onSubmit={handleLogin} className={styles.form}>
          <label className={styles.label}>User Name</label>
          <input
            type="text"
            value={f_userName}
            onChange={(e) => setF_userName(e.target.value)}
            required
            className={styles.input}
          />
          <label className={styles.label}>Password</label>
          <input
            type="password"
            value={f_Pwd}
            onChange={(e) => setF_Pwd(e.target.value)}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Login</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;
