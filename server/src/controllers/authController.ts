import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();


export async function SignUp(req: Request, res: Response){
    let {fullName, email, phone, password} = req.body;

    if(!fullName || !email || !password || !phone){
        res.status(400).json({ success: "false", message: "Missing required fields" });
        return;
    }

    try {
        let existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            }
        })

        if(existingUser){
            res.status(400).json({ success: "false", message: "User already exists" });
            return;
        }

        let hashedPassword = await bcrypt.hash(password, 10);

        let newUser = await prisma.user.create({
            data: {
                fullName: fullName,
                email: email,
                phone: phone,
                password: hashedPassword
            }
        });

        const token = jwt.sign({ id: newUser.id}, process.env.JWT_SECRET as string, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        }).json({success: "true", message: "User Created Successfully"});

    } catch (error) {
        res.status(500).json({ success: "false", message: "Something Went Wrong, Make Sure Email and Phone are Unique", detail: error });
        return;
    }
}

export async function LogIn(){

}

export async function LogOut(){

}

export async function ResetPassword(){
    
}