import { Router, Request, Response } from "express";
import { LogIn, LogOut, sendVerifyOTP, SignUp, verifyEmail } from "../controllers/authController";
import { validateUserData } from "../middlewares/validateUserData";

const AuthRouter = Router();

//Appointment Routes:

//Create Appointment Route:
AuthRouter.post('/auth/signup',validateUserData, SignUp);

AuthRouter.post('/auth/login', LogIn);

AuthRouter.post('/auth/logout', LogOut);

AuthRouter.post('/auth/verifyotp', sendVerifyOTP);

AuthRouter.post('/auth/verifyemail', verifyEmail);

export {AuthRouter}