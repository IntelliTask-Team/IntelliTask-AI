const mongoose = require("mongoose");
const router = require("express").Router();

const Task = require("../models/Task.model");
const Project = require("../models/Project.model");

// ***** POST /api/:projectId/tasks  - TO CREATE NEW TASK IN DATABASE *****
router.post("/:projectId/tasks", (req, res, next) => {
  const { description } = req.body;
  const { projectId } = req.params;

  const newTask = { description, project: projectId };

  Task.create(newTask)
    .then((newTask) => {
      return Project.findByIdAndUpdate(projectId, {
        $push: { tasks: newTask._id },
      });
    })
    .then((response) => res.json(response))
    .catch((err) => {
      console.log("Error creating a new task...", err);
      res.status(500).json({
        message: "Error creating a new task",
        error: err,
      });
    });
});

// ***** DELETE /api/tasks/:taskId  - TO DELETE TASK BY ID *****
router.delete("/tasks/:taskId", (req, res, next) => {
  const { taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    res.status(400).json({ message: "ID is not valid" });
    return;
  }
  Task.findOneAndDelete({ _id: taskId })
    .then((task) => {
      return Project.findByIdAndUpdate(task.project, {
        $pull: { tasks: taskId },
      });
    })
    .then(() => {
      res.json({
        message: `Task with ${taskId} is removed successfully from database & projectlist.`,
      });
    })
    .catch((err) => {
      if (err.message === "Task not found") {
        res.status(404).json({
          message: "Task not found",
        });
      } else {
        res.status(500).json({
          message: "Error deleting task",
          error: err,
        });
      }
    });
});

module.exports = router;
