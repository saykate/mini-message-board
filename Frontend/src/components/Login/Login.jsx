import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css"
import useAuthContext from "../../hooks/useAuthContext";

const initUserState = {
  username: "",
};
const initPassState = {
  password: "",
};

const LoginForm = () => {
  const [userInput, setUserInput] = useState(initUserState);
  const [passwordInput, setPasswordInput] = useState(initPassState);
  const navigate = useNavigate()
  const { setToken } = useAuthContext()

  const handleGetUser = async (e) => {
    e.preventDefault();
    if (!userInput.username || !passwordInput.password) {
      alert("Please add your name and password");
      return;
    }
    try {
      console.log("userInput, passwordInput", userInput, passwordInput);
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userInput.username, 
          password: passwordInput.password
        }),
      }); 

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("401")
        } else {
          throw new Error("Network response was not ok");
        }
      }
      const { data } = await response.json();

      console.log("DATA", data)
      console.log("User successfully fetched:", data);
      setToken(data.accessToken)
      navigate('/')
    } catch (error) {
      console.error("Failed to login:", error);
      if (error.message === "401") {
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
            value={userInput.username}
            placeholder="your Username"
            autoComplete="username"
            required
            onChange={(e) =>
              setUserInput({ ...userInput, username: e.target.value })
            }
          />
        </div>
        <div className={styles.loginDiv}>
          <label htmlFor="password">Please enter your Password: </label>
          <input
            name="password"
            type="password"
            value={userInput.password}
            placeholder="your Password"
            autoComplete="current-password"
            required
            onChange={(e) =>
              setPasswordInput({ ...passwordInput, password: e.target.value })
            }
          />
        </div>
      </form>
      <button className={styles.loginButton} onClick={handleGetUser}>Login</button>
    </div>
  );
}

export default LoginForm;