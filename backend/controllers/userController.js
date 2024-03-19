const Message = require("../models/Message");
const User = require("../models/User");

const list = async (req, res) => {
 try { 
  const users = await User.find();
  console.log(users);
  res.json({ message: "success", data: users });
  } catch (error) {
    console.error("Error fetching message:", error);
    res.status(500).json({ message: "Failed to fetch message", error: error });
  }
};

const getUser = async (req, res) => {
  try {
    const {_id} = req.params
    const user = await User.findById(_id)
    console.log(user)
    res.json({ message: "success", data: user });
  } catch (error) {
    console.error("Error fetching message:", error);
    res.status(500).json({ message: "Failed to fetch message", error: error });
  }
}

const createUser = async (req, res) => {
  try {
    console.log("CREATE USER", req.body);
    // See if a user with this user name exists
    // If it already exists, just return it
    const existingUser = await User.findOne({ username: req.body.username });
    console.log("Existing User:", existingUser);
    if (existingUser) {
      console.log("User already exists")
      return res.json({ message: "User already exists", data: existingUser });
    }
    // otherwise, create a new user
    const { username, birthdate } = req.body;
    if (!username || !birthdate) {
      return res.status(400).json({ message: "Username and birthdate are required." });
    }

    const newUser = await User.create({
      username, 
      birthdate,
    })
    
    console.log("User added:", newUser)
    res.status(201).json({ message: "User successfully added", data: newUser });
  } catch (error) {
    console.error("Error adding User:", error);
    res.status(500).json({ message: "Failed to add User", error: error });
  }
}

module.exports = { list, getUser, createUser };
