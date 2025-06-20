const { getGroqMarketResearch } = require('../services/groqService');
const logger = require('../utils/logger'); // Assuming logger exports .log and .error

/**
 * Controller method to handle generating a market research report.
 * @param {object} req The Express request object.
 * @param {object} res The Express response object.
 */
async function getMarketResearchReport(req, res) {
  logger.log('Received request for market research report');

  const { idea } = req.body;

  if (!idea) {
    logger.error('Startup idea is missing in the request body.');
    return res.status(400).json({ error: 'Startup idea is required' });
  }

  try {
    logger.log(`Generating market research for idea: "${idea}"`);
    const report = await getGroqMarketResearch(idea);

    if (report) {
      res.status(200).json(report);
    } else {
      // This case might occur if getGroqMarketResearch could return null
      // (e.g., if API key was missing and it didn't throw an error)
      // Though current implementation of getGroqMarketResearch throws errors.
      logger.error('Market research report was unexpectedly null or undefined.');
      res.status(500).json({ error: 'Failed to generate market research report (empty response from service)' });
    }
  } catch (error) {
    logger.error(`Error getting market research report: ${error.message}`);
    // Log the stack for more detailed debugging if needed, but not to the client
    // console.error(error.stack);
    res.status(500).json({ error: 'Failed to generate market research report' });
  }
}

module.exports = {
  getMarketResearchReport,
};
