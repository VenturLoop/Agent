const generateMarketResearchPrompt = (idea) => `
You are a market research expert.

Task:
Conduct a compact market research report for the following startup idea:
"${idea}"

Include:
1. Top 3 direct competitors (with a short line each on their approach)
2. Key emerging trends in this space (based on public data)
3. Target audience segments (demographics & psychographics)
4. Relevant threads/posts from Reddit, Twitter, or Product Hunt (titles & brief summary)

Only use publicly available data. Keep it factual and concise.
If possible, show light reasoning behind each insight.

Format:
{
  "competitors": [...],
  "trends": [...],
  "segments": [...],
  "posts": [...]
}
`;

module.exports = { generateMarketResearchPrompt };
