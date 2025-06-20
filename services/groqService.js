const Groq = require('groq-sdk');
const dotenv = require('dotenv');
const logger = require('../utils/logger');
const { generateMarketResearchPrompt } = require('../prompts/marketResearchPrompt');

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
const jsonModel = 'mixtral-8x7b-32768'; // Or another model good for JSON output

/**
 * Creates a chat completion stream from Groq.
 * @param {string} prompt The user's prompt.
 * @param {string} [model=defaultModel] The model to use for chat completion.
 * @returns {Promise<Groq.Chat.Completions.ChatCompletionChunk>} The stream object from Groq SDK.
 * @throws {Error} If there's an issue with the Groq API request.
 */
async function getGroqChatCompletionStream(prompt, model = defaultModel) {
  if (!apiKey) {
    logger.error('Groq API key not configured for streaming. Cannot make API calls.');
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
    throw err;
  }
}

/**
 * Gets market research insights from Groq as a JSON object.
 * @param {string} idea The startup idea for market research.
 * @returns {Promise<object>} The parsed JSON object with market research data.
 * @throws {Error} If there's an issue with the Groq API request or JSON parsing.
 */
async function getGroqMarketResearch(idea) {
  if (!apiKey) {
    logger.error('Groq API key not configured for market research. Cannot make API calls.');
    throw new Error('Groq API key not configured.');
  }

  const formattedPrompt = generateMarketResearchPrompt(idea);

  try {
    const response = await groq.chat.completions.create({
      model: jsonModel, // Using a specific model for JSON
      messages: [{ role: 'user', content: formattedPrompt }],
      response_format: { type: 'json_object' },
      temperature: 0.2, // For factual responses
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      logger.error('No content received from Groq for market research.');
      throw new Error('No content received from Groq API.');
    }

    try {
      const parsedJson = JSON.parse(content);
      return parsedJson;
    } catch (parseError) {
      logger.error(`Failed to parse JSON response from Groq: ${parseError.message}`);
      logger.error(`Raw response content: ${content}`); // Log the problematic content
      throw new Error('Failed to parse JSON response from Groq.');
    }
  } catch (apiError) {
    logger.error(`Error fetching market research from Groq: ${apiError.message}`);
    throw apiError; // Re-throw the API error
  }
}

module.exports = {
  getGroqChatCompletionStream,
  getGroqMarketResearch,
};
