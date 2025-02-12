import { Router } from "express";
import { LogIn, LogOut, sendVerifyOTP, SignUp, verifyEmail } from "../controllers/authController";
import { validateUserData } from "../middlewares/validateUserData";
import { userAuth } from "../middlewares/userAuth";

const AuthRouter = Router();

//Appointment Routes:

//Create Appointment Route:
AuthRouter.post('/auth/signup',validateUserData, SignUp);

AuthRouter.post('/auth/login', LogIn);

AuthRouter.post('/auth/logout', LogOut);

AuthRouter.post('/auth/verify-otp', userAuth, sendVerifyOTP);

AuthRouter.post('/auth/verify-account', userAuth, verifyEmail);

export {AuthRouter}