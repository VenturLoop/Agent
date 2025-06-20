const Groq = require('groq-sdk');
const dotenv = require('dotenv');
const logger = require('../utils/logger'); // Assuming logger is in utils

dotenv.config();

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  logger.error('GROQ_API_KEY is not set in environment variables.');
  // Optionally, throw an error or exit if the API key is critical for startup
  // throw new Error('GROQ_API_KEY is not set.');
}

const groq = new Groq({
  apiKey: apiKey,
});

const defaultModel = 'mixtral-8x7b-32768';

/**
 * Creates a chat completion stream from Groq.
 * @param {string} prompt The user's prompt.
 * @param {string} [model=defaultModel] The model to use for chat completion.
 * @returns {Promise<Groq.Chat.Completions.ChatCompletionChunk>} The stream object from Groq SDK.
 * @throws {Error} If there's an issue with the Groq API request.
 */
async function getGroqChatCompletionStream(prompt, model = defaultModel) {
  if (!apiKey) {
    logger.error('Groq API key not configured. Cannot make API calls.');
    // Depending on desired behavior, you might want to return null or throw
    return null;
  }
  try {
    const stream = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: model,
      stream: true,
    });
    return stream;
  } catch (err) {
    logger.error(`Error creating Groq chat completion stream: ${err.message}`);
    throw err; // Re-throw the error to be handled by the caller
  }
}

module.exports = {
  getGroqChatCompletionStream,
};
