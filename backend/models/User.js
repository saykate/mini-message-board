const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
  }
);

UserSchema.plugin(passportLocalMongoose);

https: module.exports = mongoose.model("User", UserSchema);
