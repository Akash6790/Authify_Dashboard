import axios from "../api/axios";
import { useState } from "react";

export default function TaskList({ tasks = [], onChange }) {
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const token = localStorage.getItem("token");

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onChange();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (task) => {
    setEditId(task._id);
    setEditTitle(task.title);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(
        `/tasks/${id}`,
        { title: editTitle },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditId(null);
      setEditTitle("");
      onChange();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      await axios.put(
        `/tasks/${task._id}`,
        { completed: !task.completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onChange();
    } catch (err) {
      console.error(err);
    }
  };

  if (!tasks || tasks.length === 0) {
    return <p className="text-gray-500 mt-4">No tasks available. Add one!</p>;
  }

  return (
    <div className="mt-4 space-y-3">
      {tasks.map((task) => (
        <div
          key={task._id}
          className={`flex items-center justify-between p-3 rounded-lg shadow bg-white ${
            task.completed ? "opacity-70 line-through" : ""
          }`}
        >
          {editId === task._id ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="border p-2 rounded w-full mr-2"
            />
          ) : (
            <span
              className="cursor-pointer flex-1"
              onClick={() => handleToggleComplete(task)}
            >
              {task.title}
            </span>
          )}

          <div className="flex gap-2">
            {editId === task._id ? (
              <button
                onClick={() => handleUpdate(task._id)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEdit(task)}
                className="bg-yellow-400 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
            )}

            <button
              onClick={() => handleDelete(task._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
