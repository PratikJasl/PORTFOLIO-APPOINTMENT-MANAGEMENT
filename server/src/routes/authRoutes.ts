import { Router, Request, Response } from "express";
import { SignUp } from "../controllers/authController";

const AuthRouter = Router();

//Appointment Routes:

//Create Appointment Route:
AuthRouter.post('/auth/login');

AuthRouter.post('/auth/signup', SignUp);

AuthRouter.post('/auth/logout');

AuthRouter.post('/auth/reset');

export {AuthRouter}