import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MessageForm.module.css";
import useAuthContext from "../../hooks/useAuthContext";

const initState = {
  text: "",
  author: "",
  postTime: "",
};

const MessageForm = ({ setMessages }) => {
  const navigate = useNavigate();
  const { userId, token } = useAuthContext();
  console.log(userId);
  const [postInput, setPostInput] = useState({
    text: "",
    author: userId,
    postTime: "",
  });

  const handleNewPost = async (e) => {
    e.preventDefault();
    console.log("POST INPUT", postInput);
    if (!postInput.text || !postInput.author) {
      alert("Please add your message");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/messages/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          text: postInput.text,
          author: userId,
          postTime: Date.now(),
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const { data } = await response.json();
      console.log("Post successfully added:", data);
      setMessages((prevMessages) => [...prevMessages, data]);
      setPostInput(initState);
      navigate("/");
    } catch (error) {
      console.error("Failed to post message:", error);
    }
  };

  if (!userId) {
    return null;
  }

  return (
    <div className={styles.addPost}>
      <div className={styles.postInput}>
        <label htmlFor="newPost">Enter your post: </label>
        <input
          id="newPost"
          type="text"
          value={postInput.text}
          placeholder="what's on your mind?"
          onChange={(e) => setPostInput({ ...postInput, text: e.target.value })}
        />
      </div>
      <button className={styles.postButton} 
        onClick={handleNewPost}>
        Add your post
      </button>
    </div>
  );
};

export default MessageForm;
