import { useState } from "react";

const initState = {
  text: "",
  author: "",
  postTime: "",
};

const MessageForm = ({ setMessages, currentUser }) => {
  console.log(currentUser);
  const [postInput, setPostInput] = useState({
    text: "",
    author: currentUser,
    postTime: "",
  });

  const handleNewPost = async (e) => {
    e.preventDefault();
    console.log("POST INPUT", postInput);
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
      setPostInput(initState);
    } catch (error) {
      console.error("Failed to post message:", error);
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="add-post">
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
  );
};

export default MessageForm;
