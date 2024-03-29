const express = require("express");
const router = express.Router();
let { createMessage, getMessages, getConversations } = require("../controllers/conersation");

// Create a new conversation
router.post('/message', createMessage);

// Get all messages in a conversation
router.post('/messages',getMessages);
//get all conversations 

router.get('/:userId',getConversations);

module.exports = router;
