const { default: mongoose } = require("mongoose");
const Task = require("../models/Task");
const createError = require("http-errors");

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({});
    // res
    //   .status(200)
    //   .json({ "status": "success", data: { tasks, nbHits: tasks.length } });
    // res.json({ tasks });

    res.status(200).json({ tasks });
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    next(error);
  }
};

const getTask = async (req, res, next) => {
  try {
    // const { id: taskID } = req.params;
    const taskID = req.params.id;
    const task = await Task.findOne({ _id: taskID }).exec();

    if (!task) {
      return res.status(404).json({ msg: `task with id ${taskID} not found` });
    }
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  console.log(req.body);
  try {
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
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      return res.status(404).json({ msg: `task with id ${taskID} not found` });
    }
    res.status(200).json({ "status": "success", id: null });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
};
