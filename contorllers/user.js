import { response } from "express";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { sendCookie } from "../utils/fetures.js";
import { isAuthenticated } from "../middlewares/auth.js";
import Errorhandler from "../middlewares/error.js";

export const getAllusers = async (req, res) => {
  const users = await User.find({});

  res.json({
    suscess: true,
    users,
  });
};

// register is starts from hear...................
export const register = async (req, res,next) => {
try {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if(user) return next(new Errorhandler("user  already exist", 404))

  const haspassword = await bcrypt.hash(password, 10);

  user = await User.create({ name, email, password: haspassword });

  sendCookie(user, res, "Registerd suscessfully", 201);
} catch (error) {
  next(error)
}
};

// login starts from hear...............
export const login = async (req,res,next) => {
 try {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

 

    if(!user) return next(new Errorhandler("Invelid Email or passwords", 404))
 
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(404).json({
      suscess: false,
      message: "Invelid Email or passwords",
    });
  }

  sendCookie(user, res, `Welcome Back ${user.name}`, 200);
 } catch (error) {
  next(error)
 }
};

// getmydetails is starting form hear;

export const getMyDetails = async (req, res) => {
  try {
    const { token } = req.cookies;

  if (!token)
    return res.status(404).json({
      suscess: false,
      message: "Login First",
    });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded._id);

  res.status(200).json({
    suscess: true,
    user,
  });
  } catch (error) {
    next(error)
  }
};

// logout controler is hear

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", " ", { expires: new Date(Date.now()) })
    .json({
      suscess: true,
      message: "delated",
      user: req.user,
    });
};
