import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//function to create a new Appointment.
export async function createAppointment(req: Request, res: Response){
    //console.log("received response", req.body);

    const {
        fullName,
        email,
        phone,
        appointmentDate,
        appointmentTime,  
        status,            
        notes             
    } = req.body

    try {
        const result = await prisma.appointment.create({
            data: { 
                fullName,
                email,
                phone,
                appointmentDate,
                appointmentTime,  
                status,
                notes
            } 
        })
        if(result){
            console.log('Data added to the DB', result);
            res.status(201).json({message: 'Data added to the DB', result});
        }        
    } catch (error: unknown) {
        //console.error(error);

        //Checks the error code to determine type of error.
        if (error instanceof Error && (error as any).code === 'P2002' && (error as any).meta.target.includes('email')) {
            // Error due to duplicate email
            res.status(409).json({
                error: "Duplicate email detected. This email is already associated with an existing appointment."
            });
        } else {
            // General error handling
            res.status(500).json({
                error: "Failed to create appointment. Please try again later."
            });
        }
    }
}

export async function getAppointment(req: Request, res: Response){
    
}
