const Message = require("../models/Message");
const User = require("../models/User");

const list = async (req, res) => {
  const users = await User.find();
  console.log(users);
  res.json({ message: "success", data: users });
};

module.exports = { list };
