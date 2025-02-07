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
export async function getAppointment(req: Request, res: Response){
    try {

        let page = parseInt(req.query.page as string) || 1; //Current Page number.
        let limit = parseInt(req.query.limit as string) || 10; //No'of records per page.

        const startIndex = (page-1) * limit; //Determines where to start.
        // const take = limit;

        let result = await prisma.appointment.findMany({ //fetch from startindex, to limit no' of records
            skip: startIndex, 
            take: limit,
        })

        const totalAppointments = await prisma.appointment.count(); //calculate the total data.

        const totalPages = Math.ceil(totalAppointments / limit); //calculate the total pages.
 
        if(result){ // send the data and the pagination Metadata to front-end.
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

//Function to Delete appoinments by their ID's.
export async function removeAppointment(req: Request, res: Response){
    try {
        let id = parseInt(req.query.id as string);
        console.log('Received ID is:',id);

        if(!id) {
            res.status(400).json({ msg: 'Appointment ID is required' });
            return;
        }

        if(typeof id !== 'number'){
            res.status(400).json({ msg: 'Invalid Appointment ID format' });
            return;
        }

        let result = await prisma.appointment.delete({
            where: {
                id: id
            }
        });

        if(result){
            console.log('Appointement deleted successfully', result);
            res.status(200).json({msg: "Appointment deleted successfully", result});
            return;
        }else {
            res.status(404).json({ msg: 'Appointment not found' });
            return;
        }

    } catch (error) {
        console.log('Error occured while deletion:', error);
        res.status(500).json({msg:'Error occured while deletion', error: error});
        return;
    }
}

export async function updateAppointment(req: Request, res: Response){
    try {
        let id = parseInt(req.query.id as string);
        let status = req.query.status;
        console.log('Received ID is:',id);
        console.log('Status revceived is:',status);
        console.log('Type of status:', typeof(status));

        if(!id) {
            res.status(400).json({ msg: 'Appointment ID is required' });
            return;
        }

        if(typeof id !== 'number'){
            res.status(400).json({ msg: 'Invalid Appointment ID format' });
            return;
        }

        if((typeof status !== 'string') || (status !== 'PENDING' && status !== 'COMPLETED')){
            res.status(400).json({ msg: 'Invalid Appointment status format' });
            return;
        }

        let result = await prisma.appointment.update({
            where: {
                id: id
            },
            data:{
                status: status
            }
        })

        if(result){
            console.log('Appointement deleted successfully', result);
            res.status(200).json({msg: "Appointment deleted successfully", result});
            return;
        }else {
            res.status(404).json({ msg: 'Appointment not found' });
            return;
        }

    } catch (error) {
        console.log('Error occured while deletion:', error);
        res.status(500).json({msg:'Error occured while deletion', error: error});
        return;
    }
}