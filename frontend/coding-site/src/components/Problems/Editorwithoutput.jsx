import { useState } from "react";
import Editor from "@monaco-editor/react";
import api from "../../api/Axios"; // ✅ use shared axios instance

export default function EditorWithOutput() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const runCode = async () => {
    try {
      const res = await api.post("/run", { code }); // ✅ baseURL already 8006
      setOutput(res.data.output);
    } catch (err) {
      console.error(err);
      setOutput(
        err.response?.data?.message || "Error running code"
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Editor
        height="70vh"
        width="50vw"
        language="java"
        value={code}
        onChange={(v) => setCode(v || "")}
        theme="vs-dark"
      />

      <button
        onClick={runCode}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Run Code
      </button>

      <div
        style={{
          background: "#111",
          color: "#fff",
          marginTop: "20px",
          padding: "15px",
          height: "200px",
          overflow: "auto",
        }}
      >
        <pre>{output}</pre>
      </div>
    </div>
  );
}
