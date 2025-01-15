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

//Function to fetch the appointment data. Implement Pagination here to improve performance.
//Step1: To implement pagination, we divide the total data into pages.
//Step2: From the front end we send the page we require along with the limit in one page.
//Step3: We only fetch the page specified with the required amount of data.
//Step4: We send pagination metadata along with result to the front-end.

export async function getAppointment(req: Request, res: Response){
    try {
        console.log("request Received");
        let page = parseInt(req.query.page as string) || 1; //Current Page number.
        let limit = parseInt(req.query.limit as string) || 10; //No'of records per page.

        const startIndex = (page-1) * limit; //Determines where to start.
        const take = limit;

        let result = await prisma.appointment.findMany({ //fetch from startindex, limit no' of records
            skip: startIndex, 
            take: limit,
        })

        const totalAppointments = await prisma.appointment.count();

        const totalPages = Math.ceil(totalAppointments / limit);

        if(result){
            res.status(200).json({
                data: result,
                pagination: {
                    currentPage: page,
                    totalPages: totalPages,
                    totalAppointments: totalAppointments,
                    limit: limit,
                },
            });
        }
    } catch (error) {
        console.log('Error while fetching data');
        res.status(500).json({message: "Unable to fetch data", error});
    }
}

export async function getAppointmentById(req: Request, res: Response){
    
}