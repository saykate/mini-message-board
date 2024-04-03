const Message = require("../models/Message");
const User = require("../models/User");

const list = async (req, res) => {
  try {
    const messages = await Message.find().populate({ path: "author" });

    console.log("MESSAGES", messages);
    res.json({ message: "success", data: messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Failed to fetch messages", error: error });
  }
};

const getMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findById(id);
    console.log("MESSAGE", message);
    res.json({ message: "success", data: message });
  } catch (error) {
    console.error("Error fetching message:", error);
    res.status(500).json({ message: "Failed to fetch message", error: error });
  }
};

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
      postTime: postTime || Date.now(),
    });

    console.log("Message added:", newMessage);
    res
      .status(201)
      .json({ message: "Message successfully added", data: newMessage });
  } catch (error) {
    console.error("Error adding message:", error);
    res.status(500).json({ message: "Failed to add message", error: error });
  }
};

const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const _updatedMessage = await Message.findByIdAndUpdate(
      id,
      { text },
      { new: true }
    );

    if (!_updatedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.json({ message: "success", _updatedMessage });
  } catch (error) {
    console.error("Error updating message", error);
    res.status(500).json({ message: "Failed to update message", error: error });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await Message.findByIdAndDelete(id);
    res.json({ message: "success" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ message: "Failed to delete message", error: error });
  }
};

module.exports = { list, getMessage, newPost, updateMessage, deleteMessage };
