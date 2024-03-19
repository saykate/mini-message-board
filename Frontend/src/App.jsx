import { useState, useEffect } from "react";
import "./App.css";
import UserForm from "./components/UserForm"
import MessageForm from "./components/MessageForm"

function App() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [isFetchingUsers, setIsFetchingUsers] = useState(true);
  const [isFetchingMessages, setIsFetchingMessages] = useState(true);
  const [isCheckingUserLoggedIn, setIsCheckingUserLoggedIn] = useState(true);

  const getMessages = async () => {
    try {
      const response = await fetch("http://localhost:3000/messages");
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

  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/users");
      const { data } = await response.json();
      console.log("getUsers", data);
      setUsers(data);
      setIsFetchingUsers(false)
    } catch (error) {
      console.log(error);
    }
  };

  const checkUserLoggedIn = () => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      setCurrentUser(currentUser);
    }
    setIsCheckingUserLoggedIn(false);
  }

  const getUsername = (id) => {
    const user = users.find((user) => user._id === id);
    // console.log("username", username.username)
    // return username.username;
    if (user) {
      console.log("username", user.username);
      return user.username;
    } else {
      // Handle the case where the user is not found
      console.log(`User with id ${id} not found.`);
      return "Unknown User"; // Or any other placeholder text you prefer
    }
  }

  useEffect(() => {
    getUsers();
    getMessages();
    checkUserLoggedIn();
  }, []);

  if (isFetchingUsers || isFetchingMessages || isCheckingUserLoggedIn) {
    return <div>Loading...</div>;
  }

  return (
    <>
 {currentUser ? (
        <div>
          <h1>Welcome {getUsername(currentUser)}</h1>
        </div>
        ) : <UserForm setCurrentUser={setCurrentUser} />}
      {currentUser && (
        <MessageForm setMessages={setMessages} currentUser={currentUser} />
      )}
      <div>
        {messages.length ? (
          <div className="messages">
            <h2>Messages:</h2>
            <ul>
              {messages.map((message) => (
                <li key={message._id} onClick={() => getMessage(message._id)}>
                  {getUsername(message.author)}: {message.text}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div className="selected-message">
          {selectedMessage && (
            <div>
              <h2>Selected Message:</h2>
              <h4>{getUsername(selectedMessage.author)} said:</h4>
              <p>&quot;{selectedMessage.text}&quot;</p>
              <p>on {selectedMessage.postTime_formatted}</p>
            </div>
          )}
        </div>
      </div>
      <footer>{ currentUser ? <button onClick={() => setCurrentUser("")}>Log Out</button> : <></>}</footer>
    </>
  );
          }
export default App;
