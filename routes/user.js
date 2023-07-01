import express from "express";
 
import { getAllusers, register, login,getMyDetails,logout } from "../contorllers/user.js";

const router = express.Router();

router.get("/all",getAllusers);

router.post("/new",register);

router.post("/login", login);

router.post("/logout", logout);

router.get( "/me",getMyDetails);

export default router;
