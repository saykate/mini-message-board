import styles from "./Messages.module.css";
import { React, useState, useEffect } from "react";
import useAuthContext from "../../hooks/useAuthContext"

const Messages = ({ messages, setMessages }) => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isFetchingMessages, setIsFetchingMessages] = useState(true);
  const { token } = useAuthContext()

  const getMessages = async () => {
    try {
      const response = await fetch("http://localhost:3000/messages", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const { data } = await response.json();
      console.log(data);

      setMessages(data);
      setIsFetchingMessages(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getMessage = async (id) => {
    try {
      const selected = messages.find((message) => message._id === id);
      setSelectedMessage(selected);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  if (isFetchingMessages) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.messagesContainer}>
      <div className={styles.mainCard} >
        <div>
          <h1 className={styles.header}>Messages: </h1>
          {messages.length ? (
            <div>
              <ul className={styles.messages}>
                {messages.map((message) => (
                  <li key={message._id} onClick={() => getMessage(message._id)}>
                    {message.author.username}: {message.text}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Messages;
