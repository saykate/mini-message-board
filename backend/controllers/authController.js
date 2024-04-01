const passport = require('passport')
const User = require('../models/User')
// const { getToken } = require('../lib/jwt')
const jwt = require("jsonwebtoken")

const handleLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" })
    }
    user.authenticate(password, (err, user, info) => {
      console.log("IN AUTH CALLBACK", {
        err, 
        user, 
        info,
      })

      if (err) {
        next(err)
      }
      
      if(!user) {
        return res.status(401).json({ message: "Unauthorized" })
      }

      const token = jwt.sign({ sub: user._id, ...user }, process.env.JWT_SECRET, {
        expiresIn: 3600
      })
      res.status(200).json({ data: { accessToken: `Bearer ${token}` } })
    })
  } catch (error) {
    next(error)
  }
}

const handleRegister = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    User.register(new User({ username }), password, (err, user) => {
      if (err) {
        next(err);
      }
      console.log("USER", user)
      const token = jwt.sign({ sub: user._id, ...user }, process.env.JWT_SECRET, {
        expiresIn: 3600
      })
      res.status(201).json({ data: { accessToken: `Bearer ${token}` } });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleLogin,
  handleRegister,
};