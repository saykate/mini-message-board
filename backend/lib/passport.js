const { Strategy, ExtractJwt } = require('passport-jwt')
const User = require('../models/User')
const passport = require('passport')

const SECRET = process.env.JWT_SECRET

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
  secretOrKey: SECRET,
}

module.exports = (passport) => {
  console.log("INIT PASSPORT")
  passport.use(
    new Strategy(options, async (payload, done) => {
      console.log("PAYLOAD", payload)
      try {
        const user = await User.findById(payload.sub);
        if (!user) {
          return done(null, false)
        }
        return done(null, user)
      } catch (error) {
        return done(error)
      }
    })
  )
}