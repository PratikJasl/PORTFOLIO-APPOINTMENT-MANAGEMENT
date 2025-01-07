import { Router, Request, Response } from "express";
import { createAppointment, getAppointment } from "../controllers/appointmentController";
import validateData  from "../middlewares/validateData";

const router = Router();

//Appointment Routes:

//Create Appointment Route:
router.post('/appointments', validateData, createAppointment);

//Fetch Appointement Route:
router.get('/appointment', getAppointment);


export {router}