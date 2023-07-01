import express from 'express';
import { newTask, getMyTask,updateTask,deletTask } from '../contorllers/task.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();



router.post("/new",isAuthenticated,newTask);
router.get("/my",isAuthenticated,getMyTask);

router.route("/:id").put( isAuthenticated,updateTask).delete(isAuthenticated,deletTask)


export default router;
