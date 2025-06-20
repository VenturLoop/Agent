const express = require('express');
const router = express.Router();
const { getMarketResearchReport } = require('../controllers/marketResearchController');

// POST / (relative to where it's mounted, e.g., /api/ai/market-research/)
router.post('/', getMarketResearchReport);

module.exports = router;
