
import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    if (!text.trim()) {
      setError("Please enter some text first.");
      return;
    }

    setLoading(true);
    setError("");
    setSummary("");

    try {
      const response = await fetch("http://localhost:5000/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setSummary(data.summary);
    } catch (err) {
      setError(err.message || "Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(summary);
    alert("Summary copied!");
  };

  return (
    <div className="app">
      <div className="container">
        <h1>AI Text Summarizer</h1>
        <p className="subtitle">
          Turn long text into short and meaningful summaries.
        </p>

        <div className="card">
          <label>Enter Your Text</label>

          <textarea
            placeholder="Paste or type your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="bottom">
            <span>{text.length} characters</span>

            <button onClick={handleSummarize} disabled={loading}>
              {loading ? "Summarizing..." : "Summarize"}
            </button>
          </div>

          {error && <p className="error">{error}</p>}
        </div>

        {summary && (
          <div className="card result">
            <div className="result-header">
              <h2>Summary</h2>
              <button className="copy-btn" onClick={handleCopy}>
                Copy
              </button>
            </div>
            <p>{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
