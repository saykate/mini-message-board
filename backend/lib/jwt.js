const jwt = require("jsonwebtoken") 
const passport = require('passport')

exports.getToken = (id, params = {}) => {
  return jwt.sign({ sub: id, ...params }, process.env.JWT_SECRET, { expiresIn: 3600 })
}

exports.verifyUser = passport.authenticate("jwt", { session: false })