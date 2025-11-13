// import express from "express";
// import Task from "../models/Task.js";
// import { auth } from "../middleware/auth.js";

// const router = express.Router();

// router.use(auth);

// router.post("/", async (req, res) => {
//   const task = await Task.create({ ...req.body, userId: req.user.id });
//   res.json(task);
// });

// router.get("/", async (req, res) => {
//   const tasks = await Task.find({ userId: req.user.id });
//   res.json(tasks);
// });

// router.put("/:id", async (req, res) => {
//   const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(task);
// });

// router.delete("/:id", async (req, res) => {
//   await Task.findByIdAndDelete(req.params.id);
//   res.json({ message: "Deleted" });
// });

// export default router;
import express from "express";
import Task from "../models/Task.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Protect all routes
router.use(auth);

/* ➕ Create Task */
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      userId: req.user.id,
      title,
      description: description || "",
      completed: false,
    });

    res.status(201).json(task);
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* 📄 Get all tasks for this user */
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ✏️ Update task (title, description, or completed) */
router.put("/:id", async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* 🗑️ Delete task (only by owner) */
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found or not authorized" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
