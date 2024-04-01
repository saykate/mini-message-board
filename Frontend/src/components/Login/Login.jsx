import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css"
import useAuthContext from "../../hooks/useAuthContext";


const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate()
  const { setToken } = useAuthContext()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      alert("Please add your name and password");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }); 
      if (response.status === 404) {
          throw new Error(response.status)
        }
      if (!response.ok) {
        throw new Error(response.status);
      }
      const { data } = await response.json();

      setToken(data.accessToken)
      navigate('/')
    } catch (error) {
      console.error("Failed to login:", error);
      if (error.message === "404") {
        navigate('/register')
      } else {
        alert("Username or password is incorrect")
      }
    }
  };

  return (
    <div className={styles.login}>
      <h1 className={styles.h1}>Login:</h1>
      <form className={styles.loginInputs} action="">
        <div className={styles.loginDiv}>
          <label htmlFor="userName">Please enter your Username: </label>
          <input
            name="userName"
            type="text"
            value={formData.username}
            placeholder="your Username"
            autoComplete="username"
            required
            onChange={handleChange}
          />
        </div>
        <div className={styles.loginDiv}>
          <label htmlFor="password">Please enter your Password: </label>
          <input
            name="password"
            type="password"
            value={formData.password}
            placeholder="your Password"
            autoComplete="current-password"
            required
            onChange={handleChange}
          />
        </div>
      </form>
      <button className={styles.loginButton} onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default LoginForm;