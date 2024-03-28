const { DateTime } = require("luxon");
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const messageSchemaOptions = {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
};

const MessageSchema = new Schema ({
  text: { type: String, required: true }, 
  author: { type: Schema.Types.ObjectId, required: true, ref: "User" }, 
  postTime: { type: Date }
}, messageSchemaOptions)

MessageSchema.virtual("postTime_formatted").get(function () {
  return DateTime.fromJSDate(this.postTime).toLocaleString(DateTime.DATE_MED);
})

module.exports = mongoose.model("Message", MessageSchema)