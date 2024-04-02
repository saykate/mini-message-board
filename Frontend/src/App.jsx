import { useState, useEffect, React } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Register/Register";
import LoginForm from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import MessageForm from "./components/MessageForm/MessageForm";
import Messages from "./components/Messages/Messages";
import AuthRoute from "./components/AuthRoute/AuthRoute"
import useAuthContext from "./hooks/useAuthContext";

function App() {
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState('')
  const { token } = useAuthContext

  const getUser = async (id) => {
    console.log("clicked getUser")
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: GET,
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      const selected = response.find((user) => user._id === id);      
      setSelectedUser(selected);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("selectedUser", selectedUser)

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<Home messages={messages} setMessages={setMessages}/>} path="/" />
          <Route element={<Register />} path="/register" />
          <Route element={<LoginForm />} path="/login" />
          <Route element={<AuthRoute><Profile /></AuthRoute>} path="/profile/:id" />
          <Route element={<AuthRoute><MessageForm setMessages={setMessages}/></AuthRoute>} path="/message/form" />
          <Route element={<Messages messages={messages} setMessages={setMessages} />} path="/messages" />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
