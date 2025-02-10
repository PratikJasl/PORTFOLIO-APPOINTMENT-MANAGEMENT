import { Router, Request, Response } from "express";
import { createAppointment, getAppointment, removeAppointment, updateAppointment } from "../controllers/appointmentController";
import validateAppointmentData  from "../middlewares/validateAppointmentData";

const AppointemntRouter = Router();

//Appointment Routes:

//Create Appointment Route:
AppointemntRouter.post('/appointments', validateAppointmentData, createAppointment);

//Fetch Appointment Route with pagination:
AppointemntRouter.get('/appointments', getAppointment);

//Remove Appointment by ID:
AppointemntRouter.post('/appointments/remove', removeAppointment);

//Update Appoinement by ID:
AppointemntRouter.post('/appointments/update', updateAppointment);

export {AppointemntRouter}