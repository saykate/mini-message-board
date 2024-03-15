const { DateTime } = require("luxon");
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchemaOptions = {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
};

const UserSchema = new Schema ({
  username: { type: String, required: true }, 
  birthdate: { type: Date, required: true },
  // password: { type: String, required: true },
}, userSchemaOptions)

UserSchema.virtual("birthdate_formatted").get(function () {
  return DateTime.fromJSDate(this.birthdate).toLocaleString(DateTime.DATE_MED);
})

module.exports = mongoose.model("User", UserSchema)