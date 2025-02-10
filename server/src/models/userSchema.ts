import Joi from "joi";

//JOI schema for validating the incoming JSON data.
export const userSchema = Joi.object({
    fullName: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).required(),
    password: Joi.string().min(4).required()
});

// Data-Type frat for the incoming Data.
export interface userData {
    fullName: string,
    email: string,
    phone: string,
    password: string
}