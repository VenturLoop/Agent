const express = require('express');
const router = express.Router();
const { streamAiChat } = require('../controllers/aiController');

// POST /api/ai/chat
router.post('/chat', streamAiChat);

module.exports = router;
