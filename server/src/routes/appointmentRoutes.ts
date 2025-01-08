import { Router, Request, Response } from "express";
import { createAppointment, getAppointment, getAppointmentById } from "../controllers/appointmentController";
import validateData  from "../middlewares/validateData";

const router = Router();

//Appointment Routes:

//Create Appointment Route:
router.post('/appointments', validateData, createAppointment);

//Fetch Appointment Route with pagination:
router.get('/appointment', getAppointment);

//Fetch Appointments with Id:
router.get('/appointment:id', getAppointmentById);

export {router}