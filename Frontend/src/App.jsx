import { useState, useEffect } from "react";
import "./App.css";
import UserForm from "./components/UserForm";
import MessageForm from "./components/MessageForm";

function App() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState("");

  const getMessages = async () => {
    try {
      const response = await fetch("http://localhost:3000/messages");
      const { data } = await response.json();
      console.log(data);
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(messages);

  const getMessage = async (id) => {
    try {
      const selected = messages.find((message) => message._id === id);

      setSelectedMessage(selected);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/users");
      const { data } = await response.json();
      console.log(data);
      setCurrentUser(data[0]._id);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async (id) => {
    try {
      const selected = users.find((user) => user._id === id);
      setSelectedUser(selected);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMessages();
    getUsers();
  }, []);

  return (
    <>
      <UserForm setUsers={setUsers} setCurrentUser={setCurrentUser} />
      {currentUser && (
        <MessageForm
          setMessages={setMessages}
          users={users}
          currentUser={currentUser}
        />
      )}
      <div>
        {messages.length ? (
          <div className="messages">
            <h2>Messages:</h2>
            <ul>
              {messages.map((message) => (
                <li key={message._id} onClick={() => getMessage(message._id)}>
                  {message.author}: {message.text}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {users.length ? (
          <div className="users">
            <h2>Users:</h2>
            <ul>
              {users.map((user) => (
                <li key={user._id} onClick={() => getUser(user._id)}>
                  {user.username}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div className="selected-message">
          {selectedMessage && (
            <div>
              <h2>Selected Message:</h2>
              <h4>{selectedMessage.author} said:</h4>
              <p>"{selectedMessage.text}"</p>
              <p>on {selectedMessage.postTime_formatted}</p>
            </div>
          )}
        </div>
        <div className="selected-user">
          {selectedUser && (
            <div>
              <h2>Selected User:</h2>
              <h4>{selectedUser.username}</h4>
              <p>born: {selectedUser.birthdate_formatted}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
