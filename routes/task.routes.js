const mongoose = require("mongoose");
const router = require("express").Router();

const Task = require("../models/Task.model");
const Project = require("../models/Project.model");

// ***** POST /api/:projectId/tasks  - TO CREATE NEW TASK IN DATABASE *****
router.post("/:projectId/tasks", (req, res, next) => {
  const { description, order } = req.body; 
  const { projectId } = req.params;
  const newTask = { description, order, project: projectId }; 

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
  let taskProjectId;
Task.findOneAndDelete({ _id: taskId })
.then((task) => {
  // update order in backend after deleting task
  taskProjectId = task.project;
  return Task.updateMany(
    { order: { $gt: task.order } },
    { $inc: { order: -1 } }
  );
})
.then(() => {
  return Project.findByIdAndUpdate(taskProjectId, {
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

// PUT /api/tasks/reorder - TO REORDER TASKS
router.put("/tasks/reorder", (req, res, next) => {
  const { reorderedTasks } = req.body;

  const updatePromises = [];

  reorderedTasks.forEach((task, index) => {
    updatePromises.push(Task.findByIdAndUpdate(task._id, { order: index }));
  });

  Promise.all(updatePromises)
    .catch((error) => {
      console.log("Error reordering tasks...", error);
      res.status(500).json({
        message: "Error reordering tasks",
        error: error,
      });
    });
});

// ***** PUT /api/tasks/:taskId - TO UPDATE A TASK BY ID *****
router.put("/tasks/:taskId", (req, res, next) => {
  const { taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    res.status(400).json({ message: "ID is not valid" });
    return;
  }

  const updatedFields = req.body;

  Task.findByIdAndUpdate(taskId, updatedFields, { new: true })
    .then((updatedTask) => res.json(updatedTask))
    .catch((err) => {
      res.status(500).json({
        message: "Error updating task",
        error: err,
      });
    });
});

module.exports = router;
