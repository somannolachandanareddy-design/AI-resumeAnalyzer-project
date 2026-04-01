import React from "react";

function Result({ result }) {
  return (
    <div className="result">
      <h2>Analysis Result</h2>
      <pre>{result}</pre>
    </div>
  );
}

export default Result;