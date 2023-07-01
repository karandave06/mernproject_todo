import Errorhandler from "../middlewares/error.js";
import { Task } from "../models/task.js";
import { User } from "../models/user.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, drisciption } = req.body;

    await Task.create({
      title,
      drisciption,
      user: req.user,
    });

    res.status(201).json({
      suscess: true,
      message: "Task added suscessfully",
    });
  } catch (error) {
    next(error);
  }
};
// getmy task
export const getMyTask = async (req, res) => {
try {
  const userid = req.user._id;

  const task = await Task.find({ user: userid });

  res.status(200).json({
    suscess: true,
    task,
  });
} catch (error) {
  next(error)
}
};
// update task
export const updateTask = async (req, res, next) => {
 try {
  const { id } = req.params;

  const task = await Task.findById(req.params.id);

  task.isComplated = !task.isComplated;

  if (!task) return next(new Errorhandler("Task not found", 404));

  await task.save();

  res.status(200).json({
    suscess: true,
    message: "task updated",
  });
 } catch (error) {
  next(error)
 }
};

export const deletTask = async (req, res, next) => {
 try {
  const task = await Task.findById(req.params.id);

  if (!task) return next(new Errorhandler("Task not found", 404));

  await task.deleteOne();

  res.status(200).json({
    suscess: true,
    message: "task delated",
  });
 } catch (error) {
  next(error)
 }
};
