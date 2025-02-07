import { Router, Request, Response } from "express";
import { createAppointment, getAppointment, removeAppointment, updateAppointment } from "../controllers/appointmentController";
import validateData  from "../middlewares/validateData";

const AppointemntRouter = Router();

//Appointment Routes:

//Create Appointment Route:
AppointemntRouter.post('/appointments', validateData, createAppointment);

//Fetch Appointment Route with pagination:
AppointemntRouter.get('/appointments', getAppointment);

//Remove Appointment by ID:
AppointemntRouter.post('/appointments/remove', removeAppointment);

//Update Appoinement by ID:
AppointemntRouter.post('/appointments/update', updateAppointment);

export {AppointemntRouter}