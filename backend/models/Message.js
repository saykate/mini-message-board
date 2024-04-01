const { DateTime } = require("luxon");
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MessageSchema = new Schema ({
  text: { type: String, required: true }, 
  author: { type: Schema.Types.ObjectId, required: true, ref: "User" }, 
  postTime: { type: Date }
}, messageSchemaOptions)


module.exports = mongoose.model("Message", MessageSchema)