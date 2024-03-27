const express = require("express");
const router = express.Router();
let {createMessage,getMessages} = require("../controllers/conersation");
// Create a new conversation
router.post('/message', createMessage);

// Get all messages in a conversation
router.post('/messages',getMessages);

module.exports = router;
