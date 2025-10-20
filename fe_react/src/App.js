import { useState } from "react";

function App() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleIngest = async () => {
    setLoading(true);
    setStatus("Running ingestion...");
    try {
      const res = await fetch("http://localhost:5000/api/ai/ingest");
      const text = await res.text();
      setStatus(text);
    } catch (error) {
      setStatus("❌ Error running ingestion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4 font-bold">Offline RAG Ingestion Trigger</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        onClick={handleIngest}
        disabled={loading}
      >
        {loading ? "Running..." : "Run Ingestion"}
      </button>
      <p className="mt-4">{status}</p>
    </div>
  );
}

export default App;
