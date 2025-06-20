# Loop Mini Agent - AI Backend

## Overview

This project is a Node.js Express backend designed to provide AI-powered services. It currently features a chat endpoint that streams responses from Groq and a market research endpoint that generates a concise report for a startup idea using Groq's JSON mode. The architecture is set up to be extensible for future AI agent tools.

## Prerequisites

*   Node.js (v18.x or later recommended)
*   npm (comes with Node.js)

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    *   Create a `.env` file in the root of the project.
    *   Add your Groq API key to the `.env` file:
        ```env
        GROQ_API_KEY=your_groq_api_key_here
        ```
        This key is required to interact with the Groq API for chat and market research functionalities.

4.  **Running the application:**
    *   **Development Mode (with Nodemon for auto-restarts):**
        ```bash
        npm run dev
        ```
        *Note: The `dev` script needs to be added to `package.json`: `"dev": "nodemon server.js"`*

    *   **Production Mode:**
        ```bash
        npm start
        ```
        *Note: The `start` script needs to be added or confirmed in `package.json`: `"start": "node server.js"`*

## API Endpoints

### 1. Chat Endpoint

*   **Path:** `/api/ai/chat`
*   **Method:** `POST`
*   **Description:** Streams AI-generated responses for a given prompt.
*   **Request Body:**
    ```json
    {
      "prompt": "Your chat prompt here. For example, 'What is the capital of France?'"
    }
    ```
*   **Response:** Streamed plain text (`text/plain`).

### 2. Market Research Endpoint

*   **Path:** `/api/ai/market-research`
*   **Method:** `POST`
*   **Description:** Analyzes a startup idea and returns a structured market research report in JSON format.
*   **Request Body:**
    ```json
    {
      "idea": "Your startup idea here"
    }
    ```
*   **Example Request Body:**
    ```json
    {
      "idea": "An AI-powered nutrition coach for diabetic patients in India"
    }
    ```
*   **Response:** JSON object (`application/json`).
*   **Example Response Body:**
    ```json
    {
      "competitors": [
        { "name": "HealthifyMe", "approach": "AI nutritionist with Indian food focus." },
        { "name": "MySugr", "approach": "Diabetes management app with logging features." },
        { "name": "Cult.fit (formerly Cure.fit)", "approach": "Broad health and wellness platform with some nutrition coaching." }
      ],
      "trends": [
        "Increasing adoption of AI and ML in healthcare for personalized advice.",
        "Growing demand for telehealth and remote patient monitoring solutions, especially post-pandemic.",
        "Focus on hyperlocal and culturally relevant health solutions in markets like India."
      ],
      "segments": [
        { "demographics": "Urban and semi-urban adults in India, aged 30-60, diagnosed with Type 1 or Type 2 diabetes.", "psychographics": "Tech-savvy individuals actively seeking digital solutions for health management, concerned about long-term health, influenced by family health history." },
        { "demographics": "Younger adults (20-30) in India at high risk of diabetes or pre-diabetic.", "psychographics": "Health-conscious, preventative care mindset, digitally native, looking for convenient and accessible coaching." }
      ],
      "posts": [
        { "source": "Reddit r/india", "title": "Discussion on managing diabetes with diet in India", "summary": "Users discussing challenges and solutions for diabetic diets in India, highlighting need for culturally specific advice." },
        { "source": "Twitter #DiabetesIndia", "title": "Tweet about new diabetes tech in India", "summary": "Healthcare professional tweeting about a new wearable device for glucose monitoring gaining traction in India." },
        { "source": "Product Hunt (hypothetical if a similar product was launched)", "title": "AI Nutrition Coach for Specific Diets", "summary": "A product launch for an AI coach focusing on niche diets, indicating interest in specialized AI nutrition tools." }
      ]
    }
    ```

## Project Structure

The project follows a standard Node.js Express application structure:

*   `server.js`: Main entry point, sets up the HTTP server.
*   `app.js`: Configures the Express application, middleware, and mounts routes.
*   `controllers/`: Handles incoming requests, processes input, and interacts with services.
*   `routes/`: Defines API endpoints and maps them to controller functions.
*   `services/`: Contains business logic, interacts with external APIs (like Groq), and data processing.
*   `prompts/`: Stores prompt generation logic for interacting with AI models.
*   `utils/`: Utility functions, such as logging.
*   `.env`: Stores environment variables (e.g., API keys).
*   `package.json`: Manages project dependencies and scripts.

## Future Development / LLaMA Agent Tools

The current backend serves as a foundation for more advanced LLaMA-based agent tools. Future development could include:

*   **Cofounder Matching:** An agent that takes a startup idea and founder profile, then suggests potential cofounder archetypes or searches a database (if available) for matches.
*   **Investor Search:** An agent that, given a startup's stage, sector, and funding needs, identifies relevant investor profiles or firms.
*   **Enhanced Market Research:** Expanding the current market research tool with more data sources or deeper analysis using LLaMA.

This would involve:
1.  Creating new services similar to `groqService.js` but tailored to interact with LLaMA models (whether local instances or APIs).
2.  Developing specific prompts for each new agent tool in the `prompts/` directory.
3.  Adding new controllers and routes to expose these tools via API endpoints.

## Bonus Enrichment Ideas (for Market Research)

To further enhance the market research capabilities, the following could be integrated:

*   **Live Reddit Scraping:** Use libraries like `rss-to-json` or Reddit's API (PRAW for Python, or a Node.js equivalent) to fetch live, relevant discussions.
*   **Twitter/X Scraping:** Employ tools like `x-scraper` (if maintained and functional) or access the X API (if available and feasible) for real-time trends and sentiment.
*   **Product Hunt Integration:** Utilize the Product Hunt API to find related products, discussions, and trends.
*   **News API Integration:** Incorporate a news API (e.g., NewsAPI.org, GNews) to fetch recent articles related to the startup's domain.

These integrations would provide more dynamic and up-to-date insights for the market research reports.
