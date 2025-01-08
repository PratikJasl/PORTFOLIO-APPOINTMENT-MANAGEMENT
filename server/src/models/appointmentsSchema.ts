import Joi from "joi";

//JOI schema for validating the incoming JSON data.
export const appointmentSchema = Joi.object({
    fullName: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).required(),
    appointmentDate: Joi.date().required(),
    appointmentTime: Joi.date().required(),
    status: Joi.string().valid('PENDING', 'COMPLETED').required(),
    notes: Joi.string().max(500)
});

// Data-Type frat for the incoming Data.
export interface appointmentData {
    fullName: string,
    email: string,
    phone: string,
    appointmentDate: Date,
    appointmentTime: Date,
    status: string,
    notes?: string
}