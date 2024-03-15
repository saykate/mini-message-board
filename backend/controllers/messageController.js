const Message = require("../models/Message");
const User = require("../models/User")

const list = async (req, res) => {
  const messages = await Message.find()
  console.log(messages)
  res.json({ message: "success", data: messages });
}
// const list = async (req, res) => {
//   try {
//     // Modify this line to populate the 'author' field with the User document it references
//     const messages = await Message.find().populate('author', 'username').exec();
//     console.log("messages:", messages);
//     res.json({ message: "success", data: messages });
//   } catch (error) {
//     console.error("Error fetching messages:", error);
//     res.status(500).json({ message: "Failed to fetch messages", error: error });
//   }
// };

module.exports = { list }
