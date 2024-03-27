// controllers/messageController.js

const Conversation = require('../models/conversation.model');

// Controller to create a new message and add it to the conversation
const createMessage = async (req, res) => {
  try {
    const { sender, receiver, text } = req.body;
    
    // Find the conversation between sender and receiver
    let conversation = await Conversation.findOne({
      members: { $all: [sender, receiver] }
    });

    // If conversation doesn't exist, create a new one
    if (!conversation) {
      conversation = new Conversation({
        members: [sender, receiver],
        messages: [{ sender, receiver, text }]
      });
    } else {
      // If conversation exists, push the new message to the existing conversation
      conversation.messages.push({ sender, receiver, text });
    }

    // Save the updated conversation
    await conversation.save();

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to get all messages in a conversation between sender and receiver
const getMessages = async (req, res) => {
  try {
    const { sender, receiver } = req.body;
    
    // Find the conversation between sender and receiver
    let conversation = await Conversation.findOne({
      members: { $all: [sender, receiver] }
    });

    if (!conversation) {
      // If conversation doesn't exist, create a new one
      conversation = new Conversation({
        members: [sender, receiver],
        messages: [] // initialize messages array for the new conversation
      });

      // Save the new conversation
      await conversation.save();
    }

    // Return the messages in the conversation
    res.status(200).json({ messages: conversation.messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  createMessage,
  getMessages
};
