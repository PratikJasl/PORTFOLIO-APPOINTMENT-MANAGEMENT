import { Request, Response, NextFunction } from "express";
import { appointmentSchema } from "../models/appointmentsSchema";

//Middleware to update the incoming Data. Utilizes JOI for schema validation.
function validateAppointmentData(req: Request, res: Response, next: NextFunction): void{
    const {
        fullName,
        email,
        phone,
        appointmentDate,
        appointementTime,  
        status,            
        notes             
    } = req.body

    try {
        if(!fullName || !email || !phone || !appointmentDate || appointementTime || !status){
            console.log('Missing required fields');
            res.status(400).json({ success: "false", message: "Missing required fields" }); 
            return
        }

        const {error, value} = appointmentSchema.validate(req.body);
        console.log(error, value);

        if (error) {
            console.log('Validation error:', error.details);
            res.status(400).json({ success: "false", message: 'Validation failed', details: error.details });
            return 
        }

        next();
        
    } catch (error) {
        console.log('Error validating data');
        res.status(500).json({ success: "false", message: 'Internal Server Error'});
        return
    }
}

export default validateAppointmentData;