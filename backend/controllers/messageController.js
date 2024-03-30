const Message = require("../models/Message");
const User = require("../models/User");
const { post } = require("../routes/messages");

const list = async (req, res) => {
  try {
    const messages = await Message.find().populate({ path: "author" })

    console.log("MESSAGES", messages)
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
    console.log("MESSAGE", message)
    res.json({ message: "success", data: message });
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

const updateMessage = async (req, res) => {
  try {
    const {_id} = req.params
    const { text } = req.body
    const updatedMessage = await Message.findByIdAndUpdate(_id, { text }, { new: true })
    
    if (!updateMessage) {
      return res.status(404).json({ message: "Message not found" })
    }

    console.log("Message Updated", updatedMessage)
    res.json({ message: "success", updateMessage })
  } catch (error) {
    console.error("Error updating message", error)
    res.status(500).json({ message: "Failed to update message", error: error })
  }
}

const deleteMessage = async (req, res) => {
  try {
    const {_id} = req.params
    const message = await Message.findByIdAndDelete(_id)
    console.log("Message Deleted", message)
    res.json({ message: "success"});
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ message: "Failed to delete message", error: error });
  }
}


module.exports = { list, message, newPost, updateMessage, deleteMessage }
