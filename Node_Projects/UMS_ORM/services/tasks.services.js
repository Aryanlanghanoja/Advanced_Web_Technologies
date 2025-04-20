const { Op } = require("sequelize");
const db = require("../models/tasks.model");

async function getTaskById(id) {
    return await db.Tasks.findByPk(id);
}

async function getTasksByFollowupId(followupId) {
    return await db.Tasks.findAll({ where: { FollowUP_ID: followupId } });
}

async function getTasksByDeadlineRange(startDate, endDate) {
    return await db.Tasks.findAll({
        where: {
            DeadLine: {
                [Op.between]: [startDate, endDate],
            },
        },
    });
}

async function createTask(data) {
    return await db.Tasks.create(data);
}

async function updateTask(id, data) {
    const task = await db.Tasks.findByPk(id);
    if (!task) throw new Error("Task not found");

    return await task.update(data);
}

async function removeTask(id) {
    const task = await db.Tasks.findByPk(id);
    if (!task) throw new Error("Task not found");

    return await task.destroy();
}

module.exports = {
    getTaskById,
    getTasksByFollowupId,
    getTasksByDeadlineRange,
    createTask,
    updateTask,
    removeTask,
};
