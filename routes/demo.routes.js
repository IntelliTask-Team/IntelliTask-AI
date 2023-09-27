const mongoose = require("mongoose");
const router = require("express").Router();

const Project = require("../models/Project.model");
const Task = require("../models/Task.model");

// ***** GET /api/demo/projects - TO DISPLAY DEMO PROJECTS *****
router.get("/demo/projects", (req, res, next) => {
    Project.find({ demo: true })
        .populate({
            path: 'tasks',
            options: { sort: { 'order': 1 } } 
        })
        .then((demoProjects) => res.json(demoProjects))
        .catch((err) => {
            console.log("Error getting demo projects...", err);
            res.status(500).json({
                message: "Error getting demo projects",
                error: err,
            });
        });
});

// ***** GET /api/demo/projects/:projectId - TO DISPLAY DEMO PROJECT DETAILS *****
router.get("/demo/projects/:projectId", (req, res, next) => {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        res.status(400).json({ message: "ID is not valid" });
        return;
    }

    Project.findOne({ _id: projectId, demo: true }) 
        .populate({
            path: 'tasks',
            options: { sort: { 'order': 1 } } 
        })
        .then((project) => {
            if (!project) {
                res.status(404).json({ message: "Demo project not found" });
                return;
            }
            res.json(project);
        })
        .catch((err) => {
            console.log("Error getting demo project details...", err);
            res.status(500).json({
                message: "Error getting demo project details",
                error: err,
            });
        });
});

module.exports = router;