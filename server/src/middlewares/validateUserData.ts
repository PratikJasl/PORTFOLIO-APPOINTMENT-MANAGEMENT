import { Request, Response, NextFunction } from "express";
import { userSchema } from "../models/userSchema";

export function validateUserData(req: Request, res: Response, next: NextFunction): void{
    const{
        fullName,
        email,
        phone,
        password
    } = req.body;

    try {
        if(!fullName || !email || !password || !phone){
            res.status(400).json({ success: "false", message: "Missing required fields" });
            return;
        }
    
        const {error, value} = userSchema.validate(req.body);
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