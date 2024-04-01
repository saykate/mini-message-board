import styles from "./Messages.module.css";
import { useState, useEffect } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import Message from "./Message";
import { func } from "prop-types";
import { MessagesPropTypes } from "../../propTypes";

const Messages = ({ messages, setMessages }) => {
  const [selectedMessage, setSelectedMessage] = useState(undefined);
  const [isFetchingMessages, setIsFetchingMessages] = useState(true);
  const { token, userId, isAuthenticated } = useAuthContext();
  const currentUser = userId;

  const clearSelectedMessage = () => {
    setSelectedMessage(undefined);
  };

  const getMessages = async () => {
    try {
      const response = await fetch("http://localhost:3000/messages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = await response.json();
      console.log(data);

      setMessages(data);
      setIsFetchingMessages(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickMessage = (id) => {
    if (!isAuthenticated) {
      return;
    }
    const selected = messages.find((message) => message._id === id);
    setSelectedMessage(selected);
  };

  const submitEdit = async (id, editText) => {
    try {
      const response = await fetch(`http://localhost:3000/messages/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: editText }),
      });
      if (!response.ok) {
        throw new Error("Failed to update the message");
      }

      const updatedMessages = messages.map((message) => {
        if (message._id === id) {
          return { ...message, text: editText };
        }
        return message;
      });
      setMessages(updatedMessages);
      clearSelectedMessage();
    } catch (error) {
      console.error("Error updating message", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/messages/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete the message");
      }
      const filteredList = messages.filter((message) => message._id !== id);
      setMessages(filteredList);
      clearSelectedMessage();
    } catch (error) {
      console.error("Error deleting message", error);
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
      <div className={styles.mainCard}>
        {!selectedMessage && (
          <div>
            <h1 className={styles.header}>Messages: </h1>
            {messages.length ? (
              <div>
                <ul className={styles.messages}>
                  {messages.map((message) => (
                    <li key={message._id}>
                      <a
                        className={styles.author}
                        href={`/profile/${message.author._id}`}
                      >
                        {message.author.username}:
                      </a>
                      <a onClick={() => onClickMessage(message._id)}>
                        {message.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        )}
        {selectedMessage && (
          <Message
            selectedMessage={selectedMessage}
            handleGoBack={() => setSelectedMessage(undefined)}
            onSubmitEdit={submitEdit}
            handleDelete={handleDelete}
            allowEdit={currentUser === selectedMessage.author._id}
          />
        )}
      </div>
    </div>
  );
};

export default Messages;

Messages.propTypes = {
  messages: MessagesPropTypes,
  setMessages: func.isRequired,
};
