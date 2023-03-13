const { default: mongoose } = require("mongoose");
const Task = require("../models/Task");
const createError = require("http-errors");
const asyncWrapper = require("../utils/async");

const getAllTasks = asyncWrapper(async (req, res, next) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const taskID = req.params.id;
  const task = await Task.findOne({ _id: taskID }).exec();

  if (!task) {
    return res.status(404).json({ msg: `task with id ${taskID} not found` });
  }
  res.status(200).json(task);
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate(
    {
      _id: taskID
    },
    req.body,
    { new: true, runValidators: false }
  );
  if (!task) {
    return res.status(404).json({ msg: `task with id ${taskID} not found` });
  }
  res.status(200).json({ id: taskID, data: req.body });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return res.status(404).json({ msg: `task with id ${taskID} not found` });
  }
  res.status(200).json({ "status": "success", id: null });
});

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
};
