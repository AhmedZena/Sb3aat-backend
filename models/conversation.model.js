const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
  
  }
}, { timestamps: true });

const conversationSchema = new Schema({
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  messages: [messageSchema]
}, { timestamps: true });

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
