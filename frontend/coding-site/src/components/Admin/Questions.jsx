import React, { useState } from "react";
import Sidebar from "./Sidebar";
import api from "../../api/Axios";
import { PlusCircle, Trash2, Menu } from "lucide-react";

export default function Questions() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("EASY");
  const [category, setCategory] = useState("");
  const [day, setDay] = useState("");
  const [sampleInput, setSampleInput] = useState("");
  const [sampleOutput, setSampleOutput] = useState("");
  const [testcases, setTestcases] = useState([{ input: "", output: "" }]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const addTestcase = () =>
    setTestcases([...testcases, { input: "", output: "" }]);

  const removeTestcase = (i) =>
    setTestcases(testcases.filter((_, idx) => idx !== i));

  const updateTestcase = (i, field, value) => {
    const copy = [...testcases];
    copy[i][field] = value;
    setTestcases(copy);
  };

  const submit = async (e) => {
    e.preventDefault();

    await api.post("/api/admin/problems", {
      title,
      description,
      difficulty,
      category,
      dayNumber: Number(day),
      sampleInput,
      sampleOutput,
      testCases: testcases.map((t) => ({
        input: t.input,
        expectedOutput: t.output,
      })),
    });

    alert("Question added");
    setTitle("");
    setDescription("");
    setCategory("");
    setDay("");
    setSampleInput("");
    setSampleOutput("");
    setTestcases([{ input: "", output: "" }]);
  };

  return (
    <div className="flex min-h-screen bg-[#F6F8FC]">
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow"
      >
        <Menu size={22} />
      </button>

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="flex-1 p-6 md:ml-64 pt-16">
        <h2 className="text-3xl font-bold mb-6">Add Question</h2>

        <form
          onSubmit={submit}
          className="bg-white p-6 rounded-xl max-w-3xl space-y-4"
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-3 rounded"
            placeholder="Title"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-3 rounded"
            placeholder="Description"
          />

          <div className="grid grid-cols-3 gap-3">
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="border p-3 rounded"
            >
              <option>EASY</option>
              <option>MEDIUM</option>
              <option>HARD</option>
            </select>

            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-3 rounded"
              placeholder="Category"
            />

            <input
              type="number"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="border p-3 rounded"
              placeholder="Day"
            />
          </div>

          <input
            value={sampleInput}
            onChange={(e) => setSampleInput(e.target.value)}
            className="border p-3 rounded"
            placeholder="Sample Input"
          />
          <input
            value={sampleOutput}
            onChange={(e) => setSampleOutput(e.target.value)}
            className="border p-3 rounded"
            placeholder="Sample Output"
          />

          <h3 className="font-semibold">Testcases</h3>

          {testcases.map((tc, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={tc.input}
                onChange={(e) =>
                  updateTestcase(i, "input", e.target.value)
                }
                className="border p-2 flex-1 rounded"
                placeholder="Input"
              />
              <input
                value={tc.output}
                onChange={(e) =>
                  updateTestcase(i, "output", e.target.value)
                }
                className="border p-2 flex-1 rounded"
                placeholder="Output"
              />
              {testcases.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTestcase(i)}
                  className="text-red-600"
                >
                  <Trash2 />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addTestcase}
            className="flex gap-2 items-center text-sm"
          >
            <PlusCircle /> Add testcase
          </button>

          <button className="w-full bg-indigo-600 text-white py-3 rounded">
            Submit
          </button>
        </form>
      </main>
    </div>
  );
}
