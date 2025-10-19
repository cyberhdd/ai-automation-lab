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

export default router;
