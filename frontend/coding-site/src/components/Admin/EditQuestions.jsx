import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import api from "../../api/Axios";
import { Pencil, Trash2, Menu } from "lucide-react";

export default function EditQuestions() {
  const [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("EASY");
  const [category, setCategory] = useState("");
  const [day, setDay] = useState("");
  const [sampleinput, setSampleInput] = useState("");
  const [sampleoutput, setSampleOutput] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  /* ================= LOAD ================= */

  const loadQuestions = async () => {
    const res = await api.get("/api/admin/problems");
    setQuestions(res.data);
    setCurrentPage(1);
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  /* ================= DELETE ================= */

  const deleteQuestion = async (id) => {
    if (!window.confirm("Delete this question?")) return;
    await api.delete(`/api/admin/problems/${id}`);
    loadQuestions();
  };

  /* ================= EDIT ================= */

  const handleEditClick = (q) => {
    setSelected(q.id);
    setTitle(q.title || "");
    setDescription(q.description || "");
    setDifficulty(q.difficulty || "EASY");
    setCategory(q.category || "");
    setDay(q.dayNumber || "");
    setSampleInput(q.sampleInput || "");
    setSampleOutput(q.sampleOutput || "");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    await api.put(`/api/admin/problems/${selected}`, {
      title,
      description,
      difficulty,
      category,
      dayNumber: Number(day),
      sampleInput: sampleinput,
      sampleOutput: sampleoutput,
    });

    setSelected(null);
    loadQuestions();
  };

  /* ================= PAGINATION ================= */

  const totalPages = Math.ceil(questions.length / ITEMS_PER_PAGE);
  const paginated = questions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
        <h2 className="text-3xl font-bold mb-6">Manage Questions</h2>

        <div className="bg-white rounded-2xl border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Difficulty</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((q) => (
                <tr key={q.id} className="border-t">
                  <td className="p-4">{q.title}</td>
                  <td className="p-4">{q.difficulty}</td>
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => handleEditClick(q)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => deleteQuestion(q.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MODAL */}
        {selected && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <form
              onSubmit={handleUpdate}
              className="bg-white p-6 rounded-xl w-full max-w-xl space-y-4"
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
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full border p-3 rounded"
              >
                <option>EASY</option>
                <option>MEDIUM</option>
                <option>HARD</option>
              </select>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border p-3 rounded"
                placeholder="Category"
              />
              <input
                type="number"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full border p-3 rounded"
                placeholder="Day"
              />
              <textarea
                value={sampleinput}
                onChange={(e) => setSampleInput(e.target.value)}
                className="w-full border p-3 rounded"
                placeholder="Sample Input"
              />
              <textarea
                value={sampleoutput}
                onChange={(e) => setSampleOutput(e.target.value)}
                className="w-full border p-3 rounded"
                placeholder="Sample Output"
              />

              <button className="w-full bg-indigo-600 text-white py-3 rounded">
                Update Question
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
