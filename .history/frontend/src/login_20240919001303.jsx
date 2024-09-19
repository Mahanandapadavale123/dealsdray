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
        { userName, password }
      );
      setToken(response.data.token);
    } catch (error) {
      console.log(error);
      
      alert("Invalid Credentials");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>Login Page</h2>

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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
