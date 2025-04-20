const taskService = require("../services/tasks.services");

exports.getById = async (req, res) => {
    try {
        const task = await taskService.getTaskById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getByFollowupId = async (req, res) => {
    try {
        const tasks = await taskService.getTasksByFollowupId(req.params.followupId);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getByDeadlineRange = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        if (!startDate || !endDate) {
            return res.status(400).json({ message: "startDate and endDate are required" });
        }
        const tasks = await taskService.getTasksByDeadlineRange(startDate, endDate);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const task = await taskService.createTask(req.body);
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const updatedTask = await taskService.updateTask(req.params.id, req.body);
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        await taskService.removeTask(req.params.id);
        res.json({ message: "Task Deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
