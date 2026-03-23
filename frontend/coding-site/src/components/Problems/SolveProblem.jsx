import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import api from "../../api/Axios";

/* ---------------- LANGUAGE CONFIG ---------------- */
const LANGUAGES = {
  java: {
    label: "Java",
    monaco: "java",
    enabled: true,
    template: `class Main {
    public static void main(String[] args) {
        // write your code here
    }
}`
  },
  python: {
    label: "Python (Coming Soon)",
    monaco: "python",
    enabled: false,
    template: `# Python support coming soon`
  },
  javascript: {
    label: "JavaScript (Coming Soon)",
    monaco: "javascript",
    enabled: false,
    template: `// JavaScript support coming soon`
  }
};

export default function SolveProblem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState("java");
  const [code, setCode] = useState(LANGUAGES.java.template);
  const [output, setOutput] = useState("");
  const [customInput, setCustomInput] = useState("");
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH PROBLEM ---------------- */
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await api.get(`/api/problems/${id}`);
        setProblem(res.data);
      } catch (err) {
        console.error("Failed to load problem", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [id]);

  /* ---------------- LANGUAGE CHANGE ---------------- */
  const handleLanguageChange = (e) => {
    const lang = e.target.value;

    if (!LANGUAGES[lang].enabled) {
      alert("This language is not supported yet.");
      return;
    }

    setLanguage(lang);
    setCode(LANGUAGES[lang].template);
    setOutput("");
  };

  /* ---------------- RUN CODE ---------------- */
 const handleRun = async () => {
  try {
    const res = await api.post("/run", {
      code,
      input: customInput || problem?.sampleInput || ""
    });

    setOutput(res.data.output ?? "No output");
  } catch {
    setOutput("Error running code");
  }
};



  /* ---------------- SUBMIT CODE (TESTCASES) ---------------- */
  const handleSubmit = async () => {
    try {
      const res = await api.post("/api/code/submit", {
        problemId: Number(id),
        code
      });

      setOutput(
        `Passed ${res.data.passed}/${res.data.total}\n` +
        (res.data.allPassed ? "✅ All testcases passed!" : "❌ Some testcases failed")
      );
    } catch {
      alert("Submission failed");
    }
  };

  if (loading) return <h3 className="p-6">Loading problem...</h3>;
  if (!problem) return <h3 className="p-6">Problem not found</h3>;

  return (
    <div className="flex h-screen bg-[#F7F8FA]">

      {/* LEFT – PROBLEM DETAILS */}
      <div className="w-full lg:w-1/2 overflow-y-auto border-r bg-white p-6">

        <button
          className="mb-4 text-purple-600 hover:underline"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <h1 className="text-2xl font-bold mb-2">{problem.title}</h1>

        <span className={`inline-block mb-6 px-3 py-1 rounded-full text-sm font-medium
          ${problem.difficulty === "EASY" ? "bg-green-100 text-green-700"
          : problem.difficulty === "MEDIUM" ? "bg-yellow-100 text-yellow-700"
          : "bg-red-100 text-red-700"}`}>
          {problem.difficulty}
        </span>

        <section className="mb-6">
          <h2 className="font-semibold text-lg mb-2">Problem Description</h2>
          <p className="whitespace-pre-line text-gray-700">
            {problem.description || "No description provided."}
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold text-lg mb-2">Input Format</h2>
          <pre className="bg-gray-100 p-3 rounded">
            {problem.sampleInput || "N/A"}
          </pre>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold text-lg mb-2">Output Format</h2>
          <pre className="bg-gray-100 p-3 rounded">
            {problem.sampleOutput || "N/A"}
          </pre>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold text-lg mb-2">Constraints</h2>
          <ul className="list-disc pl-6 text-sm text-gray-700">
            <li>1 ≤ input size ≤ 10⁵</li>
            <li>Time Limit: 1 second</li>
            <li>Memory Limit: 256 MB</li>
          </ul>
        </section>
      </div>

      {/* RIGHT – CODE EDITOR */}
      <div className="w-full lg:w-1/2 p-6 flex flex-col">

        <div className="flex justify-end mb-3">
          <select
            value={language}
            onChange={handleLanguageChange}
            className="border px-3 py-1 rounded"
          >
            {Object.entries(LANGUAGES).map(([key, lang]) => (
              <option key={key} value={key}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 bg-white rounded shadow p-3">
          <Editor
            height="100%"
            theme="vs-dark"
            language={LANGUAGES[language].monaco}
            value={code}
            onChange={(val) => setCode(val || "")}
          />
        </div>
        
        {/* CUSTOM INPUT */}
<div className="mt-4 bg-white p-3 rounded shadow">
  <h3 className="font-semibold mb-2">Custom Input</h3>
  <textarea
    rows={4}
    className="w-full border rounded p-2 text-sm font-mono"
    placeholder="Enter input exactly as stdin (e.g. 5\n1 2 3 4 5)"
    value={customInput}
    onChange={(e) => setCustomInput(e.target.value)}
  />
</div>

        <div className="flex gap-4 mt-4">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded"
            onClick={handleRun}
          >
            Run Code
          </button>
          
          <button
            className="bg-green-600 text-white px-6 py-2 rounded"
            onClick={handleSubmit}
          >
            Submit Code
          </button>
        </div>

        {output && (
          <div className="mt-4 bg-white p-3 rounded shadow">
            <h3 className="font-semibold mb-1">Output</h3>
            <pre>{output}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
