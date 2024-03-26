const User = require("../models/User");

const list = async (req, res) => {
 try { 
  const users = await User.find();
  console.log(users);
  return res.json({ message: "success", data: users });
  } catch (error) {
    console.error("Error fetching message:", error);
    return res.status(500).json({ message: "Failed to fetch message", error: error });
  }
};

const getUser = async (req, res) => {
  try {
    const {_id} = req.params
    const user = await User.findById(_id)
    console.log(user)
    if (!user) {
      statusCode = 404;
      throw new Error("User not found");
    }
    return res.json({ message: "success", data: user });
  } catch (error) {
    console.error("Error fetching message:", error);
    return res.status(500).json({ message: "Failed to fetch message", error: error });
  }
}

module.exports = { list, getUser };
