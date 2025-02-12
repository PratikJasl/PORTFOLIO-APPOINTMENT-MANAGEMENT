import { Router } from "express";
import { getUserDetail } from "../controllers/userController";
import { userAuth } from "../middlewares/userAuth";

const userRouter = Router();

userRouter.get('/data', userAuth, getUserDetail);

export {userRouter}