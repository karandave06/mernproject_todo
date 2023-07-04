import express from "express";
import userrouter from "./routes/user.js";
import taskrouter from "./routes/task.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { isAuthenticated } from "./middlewares/auth.js";
import { errormiddleware } from "./middlewares/error.js";
import cors from "cors"; 
import { createProxyMiddleware } from 'http-proxy-middleware'

export const app = express();
const router = express.Router();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", userrouter);
app.use("/api/v1/task", taskrouter);
app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://todobackend-77ty.onrender.com',
    changeOrigin: true,
    secure: false,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:5173',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
);

app.use(cors())
// app.use(
//   cors({
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//     credentials: true,
//   })
// );

app.get("/", (req, res) => {
  res.send("welcome");
});

app.use(errormiddleware);
