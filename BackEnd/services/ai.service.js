const axios = require("axios");
require("dotenv").config();

const delay = (ms) => new Promise(res => setTimeout(res, ms));

const getQueryPlan = async (question, retry = 2) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `
You are a data analyst working with CSV data.

Convert the user question into STRICT JSON.

Rules:
- ONLY return JSON
- No explanation
- No markdown

Format:
{
  "action": "sort | groupby | average",
  "column": "column_name",
  "order": "asc | desc",
  "limit": number,
  "metric": "column_name"
}

Example:
User: top product by price
Output:
{
  "action": "sort",
  "column": "price",
  "order": "desc",
  "limit": 1
}

User: ${question}
`
              }
            ]
          }
        ]
      }
    );

    const text =
      response.data.candidates[0].content.parts[0].text;

    return text.replace(/```json|```/g, "").trim();

  } catch (error) {
    console.log("Gemini Error:", error.response?.data || error.message);

    if (retry > 0) {
      console.log("Retrying...");
      await delay(2000);
      return getQueryPlan(question, retry - 1);
    }

    return JSON.stringify({
      action: "error",
      message: "AI failed"
    });
  }
};

module.exports = getQueryPlan;