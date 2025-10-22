import express from "express";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

router.get("/query", (req, res) => {
  const question = req.query.q;
  if (!question) return res.status(400).send("Missing query parameter: ?q=your_question");

  const scriptPath = "../ai_py/day2/offline-rag/query.py";
  const py = spawn("python", [scriptPath, question]);

  let output = "";
  py.stdout.on("data", (data) => (output += data.toString()));
  py.stderr.on("data", (data) => console.error("stderr:", data.toString()));
  py.on("close", (code) => {
    if (code === 0) {
      res.send(output || "No response from query.");
    } else {
      res.status(500).send(`❌ Query failed with code ${code}`);
    }
  });
});

router.get("/status", (req, res) => {
  res.json({ message: "AI backend is live ✅" });
});


export default router;
