import { useState } from "react";
import { useNavigate } from "react-router-dom"
import styles from "./Register.module.css"
import useAuthContext from "../../hooks/useAuthContext";

const initState = {
  username: "",
  password: "",
};

const Register = () => {
  const navigate = useNavigate()
  const [userInput, setUserInput] = useState(initState);
  const { setToken } = useAuthContext()

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!userInput.username || !userInput.password) {
      alert("Please add your name and password");
      return;
    }
    try {
      console.log("userInput", userInput);
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInput),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const { data } = await response.json();
      console.log("User successfully added:", data);
      setToken(data.accessToken)
      navigate('/')
    } catch (error) {
      console.error("Failed to post message:", error);
    }
  };

  return (
    <div className={styles.addUser}>
      <h1 className={styles.h1}>Register here:</h1>
      <form className={styles.regInputs} action="">
        <div className={styles.userInput}>
          <label htmlFor="userName">Please choose a User Name: </label>
          <input
            name="userName"
            type="text"
            value={userInput.username}
            placeholder="choose your posting name"
            autoComplete="username"
            required
            onChange={(e) =>
              setUserInput({ ...userInput, username: e.target.value })
            }
          />
        </div>
        <div className={styles.userInput}>
          <label htmlFor="password">Please enter your password: </label>
          <input
            name="password"
            type="password"
            value={userInput.password}
            placeholder="choose a password"
            autoComplete="current-password"
            required
            onChange={(e) =>
              setUserInput({ ...userInput, password: e.target.value })
            }
          />
        </div>
        {/* <div className={styles.userInput}>
          <label htmlFor="passwordCheck">Re-enter your password: </label>
          <input
            name="passwordCheck"
            type="password"
            value={userInput.password}
            autoComplete="current-password"
            required
            onChange={(e) =>
              setUserInput({ ...userInput, password: e.target.value })
            }
          />
        </div> */}
      </form>
      <button className={styles.userButton} onClick={handleCreateUser}>Add User Name</button>
    </div>
  );
}

export default Register;