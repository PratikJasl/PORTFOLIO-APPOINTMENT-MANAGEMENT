import { Router, Request, Response } from "express";


const AuthRouter = Router();

//Appointment Routes:

//Create Appointment Route:
AuthRouter.post('/auth/login');

AuthRouter.post('/auth/signup');

AuthRouter.post('/auth/logout');

AuthRouter.post('/auth/reset');

export {AuthRouter}