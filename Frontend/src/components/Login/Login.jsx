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
    if (!userInput || !passwordInput) {
      alert("Please add your name and password");
      return;
    }
    try {
      console.log("userInput", userInput);
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
        throw new Error("Network response was not ok");
      }
      const { data } = await response.json();
      console.log("User successfully fetched:", data);
      // Check if user already exists from initial fetch
      // setUsers((prevUsers) => [...prevUsers, data]);
      setToken(data.accessToken)
      navigate('/')
    } catch (error) {
      console.error("Failed to post message:", error);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginInput}>
        <label htmlFor="userName">Please enter your Username: </label>
        <input
          id="userName"
          type="text"
          value={userInput.username}
          placeholder="your Username"
          onChange={(e) =>
            setUserInput({ ...userInput, username: e.target.value })
          }
        />
      </div>
      <div className={styles.loginInput}>
        <label htmlFor="password">Please enter your Password: </label>
        <input
          id="password"
          type="text"
          value={userInput.password}
          placeholder="your Password"
          onChange={(e) =>
            setPasswordInput({ ...passwordInput, password: e.target.value })
          }
        />
      </div>
      <button className={styles.loginButton} onClick={handleGetUser}>Login</button>
    </div>
  );
}

export default LoginForm;