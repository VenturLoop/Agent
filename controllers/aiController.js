const { getGroqChatCompletionStream } = require('../services/groqService');
const logger = require('../utils/logger');

/**
 * Controller method to handle streaming AI chat completions.
 * @param {object} req The Express request object.
 * @param {object} res The Express response object.
 */
async function streamAiChat(req, res) {
  const { prompt } = req.body;

  if (!prompt) {
    logger.error('Prompt is missing in the request body.');
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    // Set content type for streaming.
    // For Server-Sent Events (SSE), 'text/event-stream' would be more appropriate,
    // but for simple text streaming, 'text/plain' can work.
    // Let's start with text/plain and can refine if SSE is fully implemented.
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked'); // Important for streaming

    const stream = await getGroqChatCompletionStream(prompt);

    if (!stream) {
      logger.error('Failed to get stream from Groq service. API key might be missing or invalid.');
      return res.status(500).json({ error: 'Failed to connect to AI service.' });
    }

    // Handle stream data
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        res.write(content);
      }
    }

    // End the response when the stream is finished
    res.end();

  } catch (error) {
    logger.error(`Error in streamAiChat controller: ${error.message}`);
    if (!res.headersSent) {
      // If headers haven't been sent, we can send a proper error status
      res.status(500).json({ error: 'Internal Server Error while streaming AI response' });
    } else {
      // If headers were already sent (e.g., mid-stream error), we can only end the response.
      // The client might receive an incomplete response.
      logger.error('Headers already sent, ending response abruptly.');
      res.end(); // Ensure the response is ended.
    }
  }
}

module.exports = {
  streamAiChat,
};
