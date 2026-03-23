import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import api from "../../api/Axios";
import { Plus, Trash2, CheckCircle, Menu } from "lucide-react";

export default function ManageTestcases() {
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [testcases, setTestcases] = useState([]);
  const [input, setInput] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    api.get("/api/admin/problems").then((res) => setProblems(res.data));
  }, []);

  const loadTestcases = async (id) => {
    const res = await api.get(`/api/testcases/problem/${id}`);
    setTestcases(res.data);
  };

  const addTestcase = async () => {
    await api.post(`/api/testcases/add/${selectedProblem.id}`, {
      input,
      expectedOutput,
    });
    setInput("");
    setExpectedOutput("");
    loadTestcases(selectedProblem.id);
  };

  const updateTestcase = async (tc) => {
    await api.put(`/api/testcases/${tc.id}`, tc);
    loadTestcases(selectedProblem.id);
  };

  const deleteTestcase = async (id) => {
    await api.delete(`/api/testcases/${id}`);
    loadTestcases(selectedProblem.id);
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
        <h2 className="text-3xl font-bold mb-6">Manage Testcases</h2>

        <div className="flex gap-6">
          <div className="w-1/3 bg-white border rounded-xl">
            {problems.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  setSelectedProblem(p);
                  loadTestcases(p.id);
                }}
                className="p-4 border-b cursor-pointer hover:bg-gray-100"
              >
                {p.title}
              </div>
            ))}
          </div>

          {selectedProblem && (
            <div className="flex-1 bg-white border rounded-xl p-4">
              <h3 className="font-semibold mb-4">
                {selectedProblem.title}
              </h3>

              <div className="flex gap-2 mb-4">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="border p-2 flex-1 rounded"
                  placeholder="Input"
                />
                <input
                  value={expectedOutput}
                  onChange={(e) => setExpectedOutput(e.target.value)}
                  className="border p-2 flex-1 rounded"
                  placeholder="Expected Output"
                />
                <button
                  onClick={addTestcase}
                  className="bg-green-500 text-white px-4 rounded"
                >
                  <Plus />
                </button>
              </div>

              {testcases.map((tc) => (
                <div
                  key={tc.id}
                  className="flex gap-2 mb-2 items-center"
                >
                  <input
                    defaultValue={tc.input}
                    onBlur={(e) => (tc.input = e.target.value)}
                    className="border p-2 flex-1 rounded"
                  />
                  <input
                    defaultValue={tc.expectedOutput}
                    onBlur={(e) =>
                      (tc.expectedOutput = e.target.value)
                    }
                    className="border p-2 flex-1 rounded"
                  />
                  <button
                    onClick={() => updateTestcase(tc)}
                    className="bg-indigo-500 text-white p-2 rounded"
                  >
                    <CheckCircle size={18} />
                  </button>
                  <button
                    onClick={() => deleteTestcase(tc.id)}
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
