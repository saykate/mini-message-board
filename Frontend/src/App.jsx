import { useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

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

  return (
    <div>
      <button onClick={getMessages}>Get Messages</button>
      <button onClick={getUsers}>Get Users</button>
      <ul>
        {messages.length &&
          messages.map((message) => (
            <li key={message._id}>
              {message.author}: {message.text}
            </li>
          ))}
      </ul>
      <ul>
        {users.length &&
          users.map((user) => (
            <li key={user._id}>
              {user.username}: {user.birthdate_formatted}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
