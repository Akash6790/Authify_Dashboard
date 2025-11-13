import { useState } from "react";
import axios from "../api/axios";

export default function TaskForm({ onSuccess }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await axios.post(
        "/tasks",
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle("");
      setDescription("");
      onSuccess(); // refresh tasks after adding
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 bg-gray-100 p-5 rounded-lg shadow-inner"
    >
      <input
        type="text"
        placeholder="Task title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-300 rounded p-2 w-full text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <textarea
        placeholder="Task description (optional)..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-gray-300 rounded p-2 w-full text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        rows="3"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Add Task
      </button>
    </form>
  );
}
