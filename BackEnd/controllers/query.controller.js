const Session = require('../models/session.model.js');
const Query = require('../models/query.model.js');
const File = require('../models/file.model.js');
const axios = require('axios');
const path = require("path");


const getQueryPlan = require('../services/ai.service.js');

const handleQuery = async (req, res) => {
  try {
    const { sessionId, question } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({ error: "Question is required" });
    }

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    const file = await File.findById(session.fileId);
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    let parsedPlan;

    
    try {
      const aiPlan = await getQueryPlan(question);

      if (aiPlan && !aiPlan.includes("error")) {
        parsedPlan = JSON.parse(aiPlan);
        console.log("AI PLAN:", parsedPlan);
      }
    } catch (err) {
      console.log("AI failed, using fallback...");
    }

   
    if (!parsedPlan || parsedPlan.action === "error") {
      const q = question.toLowerCase();

      console.log("Using fallback logic...");

      if (q.includes("top") && q.includes("price")) {
        parsedPlan = {
          action: "sort",
          column: "price",
          order: "desc",
          limit: 1
        };
      }
      else if (q.includes("top 5")) {
        parsedPlan = {
          action: "sort",
          column: "price",
          order: "desc",
          limit: 5
        };
      }
      else if (q.includes("average")) {
        parsedPlan = {
          action: "average",
          column: "price"
        };
      }
      else if (q.includes("count")) {
        parsedPlan = {
          action: "count"
        };
      }
      else {
        return res.json({
          result: { message: "Query not understood" }
        });
      }
    }

    console.log("FINAL PLAN:", parsedPlan);


    const fullPath = path.resolve(file.filepath);

    const pythonRes = await axios.post(
      "http://localhost:5001/analyze",
      {
        filePath: fullPath,
        query: parsedPlan
      }
    );

    console.log("PYTHON RESPONSE:", pythonRes.data);

    const result = {
      message: "Analysis complete",
      data: pythonRes.data.data
    };

    await Query.create({
      sessionId,
      question,
      result
    });

    res.json({ result });

  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({
      error: "Something went wrong",
      message: error.message
    });
  }
};

module.exports = handleQuery;