import { useEffect, useState } from "react";
import axios from "../api/axios";
import UserProfile from "../components/UserProfile";
import TaskForm from "../components/TaskForm";
import { LogOut, Loader2, Edit, Trash2, Check, X } from "lucide-react";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editTask, setEditTask] = useState(null);

  const token = localStorage.getItem("token");

  const fetchUserAndTasks = async () => {
    try {
      const [userRes, taskRes] = await Promise.all([
        axios.get("/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setUser(userRes.data);
      setTasks(taskRes.data);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      localStorage.removeItem("token");
      window.location.href = "/login";
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchUserAndTasks();
    else window.location.href = "/login";
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // ✅ Delete Task
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await axios.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUserAndTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // ✅ Start Editing Task
  const startEdit = (task) => setEditTask(task);

  // ✅ Cancel Editing
  const cancelEdit = () => setEditTask(null);

  // ✅ Save Edited Task
  const handleEditSave = async () => {
    if (!editTask.title.trim()) return;
    try {
      await axios.put(
        `/tasks/${editTask._id}`,
        { title: editTask.title, description: editTask.description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditTask(null);
      fetchUserAndTasks();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex justify-center items-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
          <p className="text-white text-lg font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      {/* Header */}
      <header className="bg-zinc-950 border-b border-zinc-800 sticky top-0 z-10 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-sm text-gray-400 mt-1">
              Welcome back,{" "}
              <span className="text-blue-400 font-medium">
                {user?.name || "User"}
              </span>
              !
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-5 py-2.5 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-red-900/30"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        {/* User Info + Task Form */}
        <section className="bg-zinc-950/70 border border-zinc-800 rounded-2xl p-8 shadow-lg space-y-8">
          {user && (
            <div className="pb-6 border-b border-zinc-800">
              <div className="bg-gray-100 text-black rounded-xl p-6 shadow-inner">
                <UserProfile user={user} />
              </div>
            </div>
          )}
          <div className="bg-gray-100 text-black rounded-xl p-6 shadow-inner">
            <h2 className="text-xl font-semibold mb-4 text-black">
              Create New Task
            </h2>
            <TaskForm onSuccess={fetchUserAndTasks} />
          </div>
        </section>

        {/* Task List Section */}
        <section className="bg-zinc-950/70 border border-zinc-800 rounded-2xl p-8 shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">
            {editTask ? "Edit Your Task" : "Your Tasks"}
          </h2>

          <div className="space-y-4">
            {tasks.length === 0 ? (
              <p className="text-gray-400 text-center py-8">
                No tasks yet. Add one above.
              </p>
            ) : (
              tasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-gray-100 text-black rounded-lg p-4 shadow-md flex justify-between items-start"
                >
                  {editTask && editTask._id === task._id ? (
                    // ✏️ Edit Mode
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={editTask.title}
                        onChange={(e) =>
                          setEditTask({ ...editTask, title: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded p-2 text-black"
                      />
                      <textarea
                        rows="2"
                        value={editTask.description}
                        onChange={(e) =>
                          setEditTask({
                            ...editTask,
                            description: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded p-2 text-black"
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={handleEditSave}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1"
                        >
                          <Check className="w-4 h-4" /> Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded flex items-center gap-1"
                        >
                          <X className="w-4 h-4" /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // ✅ View Mode
                    <>
                      <div>
                        <h3 className="text-lg font-semibold">
                          {task.title}
                        </h3>
                        <p className="text-sm text-gray-700 mt-1">
                          {task.description || "No description"}
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => startEdit(task)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(task._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
