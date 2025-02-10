import { Router, Request, Response } from "express";
import { SignUp } from "../controllers/authController";
import { validateUserData } from "../middlewares/validateUserData";

const AuthRouter = Router();

//Appointment Routes:

//Create Appointment Route:
AuthRouter.post('/auth/login');

AuthRouter.post('/auth/signup',validateUserData, SignUp);

AuthRouter.post('/auth/logout');

AuthRouter.post('/auth/reset');

export {AuthRouter}