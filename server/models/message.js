const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  content: {type: String}
}, { timestamps: true })

mongoose.model("Message", MessageSchema)
