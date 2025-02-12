import { Router } from "express";
import { LogIn, LogOut, resetPassword, sendResetPasswordOTP, sendVerifyOTP, SignUp, verifyEmail } from "../controllers/authController";
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

AuthRouter.post('/auth/send-reset-otp', sendResetPasswordOTP);

AuthRouter.post('/auth/reset-password', resetPassword);

export {AuthRouter}