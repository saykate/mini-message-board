import styles from "./Messages.module.css";
import { React, useState, useEffect } from "react";
import useAuthContext from "../../hooks/useAuthContext";

const Messages = ({ messages, setMessages }) => {
  const [selectedMessage, setSelectedMessage] = useState("");
  const [isFetchingMessages, setIsFetchingMessages] = useState(true);
  const { token, userId, isAuthenticated } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("")
  const currentUser = userId

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

  const getMessage = async (id) => {
    if (isAuthenticated) {
    try {
      const selected = messages.find((message) => message._id === id);
      setSelectedMessage(selected);
    } catch (error) {
      console.log(error);
    }}
  };
  console.log("selectedMessage", selectedMessage); 

  useEffect(() => {
    getMessages();
  }, []);

  if (isFetchingMessages) {
    return <div>Loading...</div>;
  }

  const handleEditClick =(e, id) => {
    e.preventDefault()
    const mess = messages.find(message => message._id === id)
    setSelectedMessage(mess);
    setEditText(mess.text)
    setIsEditing(true)
  }

  const submitEdit = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/messages/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: editText })
      });
      if (!response.ok) {
        throw new Error('Failed to update the message');
      }
     
      const updatedMessages = messages.map(message => {
        if(message._id === id) {
          return { ...message, text: editText }
        }
        return message;
      })
      setMessages(updatedMessages)
      setIsEditing(false)
      setSelectedMessage("")
    } catch (error) {
      console.error("Error updating message", error)
      setIsEditing(false);
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/messages/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete the message');
      }
      const filteredList = messages.filter(message => message._id !== id)
      setMessages(filteredList)
      if (selectedMessage && selectedMessage._id === id) {
        setSelectedMessage("")
      }
    } catch (error) {
      console.error("Error deleting message", error)
    }
  }

  const backToHome = () => {
    setSelectedMessage("")
  }

  return (
    <div className={styles.messagesContainer}>
      <div className={styles.mainCard}>
        { !selectedMessage &&
          <div>
          <h1 className={styles.header}>Messages: </h1>
          {messages.length ? (
            <div>
              <ul className={styles.messages}>
                {messages.map((message) => (
                  <li key={message._id}>
                    <a className={styles.author} href={`/profile/${message.author._id}`} >
                      {message.author.username}:
                    </a>
                    <a onClick={() => getMessage(message._id)} >
                      {message.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>}
        { selectedMessage && 
        <div>
          <h1 className={styles.header}>Message: </h1>
          <h2>{selectedMessage.author.username} said: </h2>
          {isEditing ? (
            <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} />
          ) : (
            <p className={styles.message}>{selectedMessage.text}</p>
          )} 
          {selectedMessage.author._id === currentUser && 
            <div>
              {isEditing ? (
                <button className={styles.button} onClick={() => submitEdit(selectedMessage._id)}>Save ✔️</button>
              ) : (
                <>
                  <button className={styles.button} onClick={(e) => handleEditClick(e, selectedMessage._id)} >Edit ✎</button>
                  <button className={`${styles.button} ${styles.delete}`} onClick={() => handleDelete(selectedMessage._id)} >Delete 🗑️</button>
                </>
              )}
            </div>
          }
          <button className={styles.button} onClick={backToHome}>HOME</button>
        </div>
        }
      </div>
    </div>
  );
};

export default Messages;
