import React, { useState } from "react";
import axios from "axios";
import Result from "./Result";

function Upload() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file || !jobDescription) {
      alert("Upload resume & enter job description");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);

    setLoading(true);

    const res = await axios.post("http://localhost:5000/analyze", formData);
    setResult(res.data.message);

    setLoading(false);
  };

  return (
    <div className="card">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <textarea
        placeholder="Paste Job Description..."
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <button onClick={handleUpload}>Analyze Resume</button>

      {loading && <p>Analyzing...</p>}

      {result && <Result result={result} />}
    </div>
  );
}

export default Upload;