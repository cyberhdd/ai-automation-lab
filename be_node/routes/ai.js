import express from "express";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// query handler for both get and post queries
function handleQuery(question, res) {
  if (!question)
    return res.status(400).send("Missing query question");

  const scriptPath = "../ai_py/day2/offline-rag/query.py";
  const py = spawn("python", [scriptPath, question]);

  let output = "";
  let error = "";

  py.stdout.on("data", (data) => (output += data.toString()));
  py.stderr.on("data", (data) => (error += data.toString()));
  
  py.on("close", (code) => {
    if (code === 0) {
      res.json({ output: output.trim() });
    } else {
      res.status(500).json({ error: error.trim() });
    }
  });
}

router.get("/ingest", (req, res) => {
  const pyProcess = spawn("python", ["../ai_py/day2/offline-rag/ingest.py"]);

  pyProcess.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  pyProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  pyProcess.on("close", (code) => {
    if (code === 0) res.send("✅ Ingestion pipeline executed successfully!");
    else res.status(500).send("❌ Error executing ingestion pipeline.");
  });
});


// router.get("/query", (req, res) => {
//   const question = req.query.q;
//   if (!question)
//     return res.status(400).send("Missing query parameter: ?q=your_question");

//   const scriptPath = "../ai_py/day2/offline-rag/query.py";
//   const py = spawn("python", [scriptPath, question]);

//   let output = "";
//   py.stdout.on("data", (data) => (output += data.toString()));
//   py.stderr.on("data", (data) => console.error("stderr:", data.toString()));
//   py.on("close", (code) => {
//     if (code === 0) {
//       res.send(output || "No response from query.");
//     } else {
//       res.status(500).send(`❌ Query failed with code ${code}`);
//     }
//   });
// });

// implement both get and post for query, handle from handleQuery function
/**
 * GET /api/ai/query?q=what+is+this
 * Easy testing from curl or browser
 * curl "http://localhost:5000/api/ai/query?q=what+is+this+document+about"
 */
router.get("/query", (req, res) => {
  const question = req.query.q;
  handleQuery(question, res)
});

/**
 * POST /api/ai/query
 * JSON body: { "question": "Explain this document" }
 * curl -X POST "http://localhost:5000/api/ai/query" \
  -H "Content-Type: application/json" \
  -d '{"question": "What is this document about?"}'
 */
router.post("/query", (req, res) => {
  const question = req.body.question;
  handleQuery(question, res)
});


router.get("/status", (req, res) => {
  res.json({ message: "AI backend is live ✅" });
});

export default router;
