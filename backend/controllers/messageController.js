const Message = require("../models/Message");
const User = require("../models/User");
const { post } = require("../routes/messages");

const list = async (req, res) => {
  try {
    const messages = await Message.find()
    console.log(messages)
    res.json({ message: "success", data: messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Failed to fetch messages", error: error });
  }
}

const message = async (req, res) => {
  try {
    const {_id} = req.params
    const message = await Message.findById(_id)
    console.log(message)
    res.json({ message: "success", data: message 
  });
  } catch (error) {
    console.error("Error fetching message:", error);
    res.status(500).json({ message: "Failed to fetch message", error: error });
  }
}

const newPost = async (req, res) => {
  try {
    const { text, author, postTime } = req.body;
    if (!text || !author) {
      return res.status(400).json({ message: "Text and author are required." });
    }

        // Find the user by the author's id
        const user = await User.findById(author);
        if (!user) {
          return res.status(404).json({ message: "User not found." });
        }

    const newMessage = await Message.create({
      text: text, 
      author: user._id,
      postTime: postTime || Date.now()
    })
    
    console.log("Message added:", newMessage)
    res.status(201).json({ message: "Message successfully added", data: newMessage });
  } catch (error) {
    console.error("Error adding message:", error);
    res.status(500).json({ message: "Failed to add message", error: error });
  }
}

module.exports = { list, message, newPost }
