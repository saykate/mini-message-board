const passport = require('passport')
const User = require('../models/User')
const { getToken } = require('../lib/jwt')

const handleLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })

    if (!user) {
      return res.status(401).json({ message: "User doesn't exist" })
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

      const token = getToken(user._id)
      res.status(200).json({ data: { accessToken: `Bearer ${token}`, user } })
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
      const token = getToken(user._id, { ...user });
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