require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const User = require("./models/User");
const passport = require("passport");
const errorhandler = require("./middleware/errorHandler");
const { Strategy, ExtractJwt } = require("passport-jwt");
const SECRET = process.env.JWT_SECRET;
const mongoDB = process.env.MONGO_CREDS;
const app = express();
const mongoose = require("mongoose");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

mongoose.set("strictQuery", false);

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const checkIsAuthenticated = (req, res, next) => {
  passport.authenticate("jwt", (err, user, info) => {
    console.log("IN AUTH CALLBACK", {
      err,
      user,
      info
    });
    if (err) {
      throw new Error(err.message)
    }
    if (!user) {
      return res.status(401).json({
        error: "Not authenticated"
      })
    }
    return next()
  }) (req, res, next)
}

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
  secretOrKey: SECRET,
}

passport.use(
  new Strategy(options, async (payload, next) => {
    console.log("PAYLOAD", payload)
    try {
      const user = await User.findById(payload.sub)
      if (!user) {
        return next(null, false)
      }
      return next(null, user)
    } catch (error) {
      return next(error)
    }
  })
)

const authRouter = require("./routes/auth")
const userRouter = require("./routes/users");
const messageRouter = require("./routes/messages");
app.use("/auth", authRouter)
app.use("/users", checkIsAuthenticated, userRouter);
app.use("/messages", messageRouter);


app.use((req, res, next) => {
  return res.status(404).json({ 
    error: "Not Found"
  })
})

app.use(errorhandler);

module.exports = app;
