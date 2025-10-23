import React, { useState } from "react";

function App() {
  const [status, setStatus] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleIngest = async () => {
    setStatus("Running ingestion...");
    const res = await fetch("http://localhost:5000/api/ai/ingest");
    const text = await res.text();
    setStatus(text);
  };

  const handleQuery = async () => {
    setAnswer("Searching...");
    const res = await fetch("http://localhost:5000/api/ai/query", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
    const data = await res.json();
    const text = data.output.replace(/\\r\\n/g, "\n"); // Fix line breaks
    setAnswer(text);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      <h1 className="text-2xl font-bold">Offline RAG</h1>

      <button
        onClick={handleIngest}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Run Ingestion
      </button>
      <p>{status}</p>

      <div className="flex flex-col items-center space-y-2 mt-8">
        <input
          type="text"
          placeholder="Ask a question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="border px-3 py-2 rounded-lg w-64"
        />
        <button
          onClick={handleQuery}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Ask
        </button>
      </div>

      <pre className="bg-gray-100 p-4 rounded-lg w-3/4 whitespace-pre-wrap">
        {answer}
      </pre>
    </div>
  );
}

export default App;
