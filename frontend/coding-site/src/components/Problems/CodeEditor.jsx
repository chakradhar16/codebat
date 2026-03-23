import { useState } from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor() {
  const [code, setCode] = useState("// write code here");

  return (
    <div style={{ height: "500px", border: "1px solid #ddd" }}>
      <Editor
        height="100%"
        width="50vw"
        theme="vs-dark"
        defaultLanguage="java"
        value={code}
        onChange={(value) => setCode(value)}
      />
    </div>
  );
}
