import { useState } from "react";
import "./App.css";

function App() {
  const [postInput, setPostInput] = useState({ text: "", author: "", postTime: "" });
  const [userInput, setUserInput] = useState({ username: "", birthdate: "" });
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleNewUser = async (e) => {
    e.preventDefault();
    if (!userInput) {
      alert("Please add your name");
      return;
    }
    try {
      console.log("userInput", userInput)
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userInput.username,
          birthdate: userInput.birthdate,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const { data } = await response.json();
      console.log("User successfully add:", data);
      setUsers((prevUsers) => [...prevUsers, data]);
      setUserInput({ username: "", birthdate: "" });
    } catch {
      console.error("Failed to post message:", error);
    }
  };

  const handleNewPost = async (e) => {
    e.preventDefault();
    if (!postInput.text || !postInput.author) {
      alert("Please add your message and select a user");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: postInput.text,
          author: postInput.author,
          postTime: Date.now(),
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const { data } = await response.json();
      console.log("Post successfully add:", data);
      setMessages((prevMessages) => [...prevMessages, data]);
      setPostInput({ text: "", author: "", postTime: "" });
    } catch (error) {
      console.error("Failed to post message:", error);
    }
  };

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
  console.log(messages);

  const getMessage = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/messages/${id}`);
      const { data } = await response.json();
      console.log(data);
      setSelectedMessage(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/users");
      const { data } = await response.json();
      console.log(data);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(users);

  const getUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`);
      const { data } = await response.json();
      console.log(data);
      setSelectedUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="add-user">
        <div>
          <label htmlFor="userName">Please choose a User Name</label>
          <input
            id="userName"
            type="text"
            value={userInput.username}
            placeholder="choose your posting name"
            onChange={(e) => setUserInput({ ...userInput, username: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="birthdate">Please enter your Birthdate</label>
          <input
            id="birthdate"
            type="date"
            value={userInput.birthdate}
            onChange={(e) => setUserInput({ ...userInput, birthdate: e.target.value })}
          />
        </div>
        <button onClick={handleNewUser}>Add User Name</button>
      </div>
      <div className="add-post">
        <label htmlFor="selectUser">Select User: </label>
        <select 
          value={postInput.author} 
          id="selectUser" 
          onClick={getUsers}
          onChange={(e) => setPostInput({ ...postInput, author: e.target.value })}>
        {users.map(user => {
          return <option key={user._id} value={user.username}>{user.username}</option>
        })}
        </select>
        <label htmlFor="newPost">Enter your post: </label>
        <input
          id="newPost"
          type="text"
          value={postInput.text}
          placeholder="what's on your mind?"
          onChange={(e) => setPostInput({ ...postInput, text: e.target.value })}
        />
        <button onClick={handleNewPost}>Add your post</button>
      </div>
      <div>
        <button onClick={getMessages}>Get Messages</button>
        <button onClick={getUsers}>Get Users</button>
        <div className="messages">
          <h2>Messages:</h2>
          <ul>
            {messages.length &&
              messages.map((message) => (
                <li key={message._id} onClick={() => getMessage(message._id)}>
                  {message.author}: {message.text}
                </li>
              ))}
          </ul>
        </div>
        <div className="users">
          <h2>Users:</h2>
          <ul>
            {users.length &&
              users.map((user) => (
                <li key={user._id} onClick={() => getUser(user._id)}>
                  {user.username}
                </li>
              ))}
          </ul>
        </div>
      </div>
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
    </>
  );
}

export default App;
