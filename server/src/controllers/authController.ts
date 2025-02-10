import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();


export async function SignUp(req: Request, res: Response){
    let {fullName, email, phone, password} = req.body;

    try {
        let existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            }
        })

        let existingPhone = await prisma.user.findUnique({
            where: {
                phone: phone,
            }
        })

        if(existingUser){
            res.status(400).json({ success: "false", message: "User already exists" });
            return;
        }

        if(existingPhone){
            res.status(400).json({ success: "false", message: "Phone number already exists" });
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

export async function LogIn(req: Request, res: Response){
    let {email, password} = req.body;

    if(!email || !password){
        res.status(400).json({success: "false", message: "Missing required fields"});
        return
    }

    try {
        let user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if(!user){
            res.status(400).json({success: "false", message: "User Does not exist"});
            return
        }

        if(user){
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
               res.status(400).json({success: "false", message: "Incorrect Password"}); 
               return;
            }

            const token = jwt.sign({ id: user.id}, process.env.JWT_SECRET as string, {expiresIn: '7d'});

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            }).json({success: "true", message: "User LogedIn Successfully"});
            return;
        }
    } catch (error) {
        res.json(500).json({success: "false", message: "Something Went Wrong", detatils: error});
        return
    }
}

export async function LogOut(req: Request, res: Response){
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        }).json({success: "true", message: "User LogedOut Successfully"});
        return;
    } catch (error) {
        res.json(500).json({success: "false", message: "Something Went Wrong", detatils: error});
        return; 
    }
}

export async function ResetPassword(){
    
}