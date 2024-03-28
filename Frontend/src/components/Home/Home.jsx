import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import Messages from "../Messages/Messages";
import { React } from "react";

const Home = ({ messages, setMessages }) => {

  return (
    <>
      <div className={styles.homeContainer}>
        <div className={styles.mainCard} >
          <h1>Welcome to the Mini Message Board</h1>
        </div>
        <Link className={styles.loginLink} to="login">
          LOGIN
        </Link>
        <Link className={styles.registerLink} to="register">
          REGISTER
        </Link>
      </div>
      <div className={styles.subContainer}>
        <Messages messages={messages} setMessages={setMessages}/>
      </div>
    </>
  );
};

export default Home;
