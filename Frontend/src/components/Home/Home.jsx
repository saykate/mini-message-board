import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import Messages from "../Messages/Messages";
import useAuthContext from "../../hooks/useAuthContext";

const Home = ({ messages, setMessages }) => {
  const { isAuthenticated } = useAuthContext();

  return (
    <>
      <div className={styles.homeContainer}>
        <div className={styles.mainCard}>
          <h1>Welcome to the Mini Message Board</h1>
        </div>
          {isAuthenticated && (
            <Link className={styles.link} to="message/form">
              POST NEW MESSAGE
            </Link>
          )}
      </div>
      <div className={styles.subContainer}>
        <Messages messages={messages} setMessages={setMessages} />
      </div>
    </>
  );
};

export default Home;
