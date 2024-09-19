import React, { useState } from "react";
import axios from "axios";
import styles from "./css/login.css";

const Login = ({ setToken }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/users/login",
        { userName, password }
      );
      setToken(response.data.token);
    } catch (error) {
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
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
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
