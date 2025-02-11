import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../config/nodeMailer";

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
            res.status(400).json({ success: "false", message: "User Email already exists" });
            return;
        }

        if(existingPhone){
            res.status(400).json({ success: "false", message: "User Phone number already exists" });
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
        })

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome!! Thanks for Signing Up',
            text: 
            `Hi ${fullName}👋, 
             We're thrilled to have you on board. Your account has been created with email id 📧: ${email}.
            
             Best Regards
             Pratik Jussal`
        }
        await transporter.sendMail(mailOptions);

        res.json({success: "true", message: "User Created Successfully"});
        return 

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

export async function sendVerifyOTP(req: Request, res: Response){
    try{
        const { userID } = req.body;

        if (!userID) {
            res.status(400).json({ success: false, message: "User ID is required" });
            return;
        }
        
        const existingUser = await prisma.user.findUnique({
            where:{
                id: userID,
            }
        });
        
        if(!existingUser){
            res.status(400).json({ success: "false", message: "User not found"});
            return;
        }

        if(existingUser.isVerified){
            res.status(400).json({ success: "false", message: "Account already verified"});
            return;
        }

        const OTP = String(Math.floor(100000 + Math.random() * 900000));
        const otpExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
        
        await prisma.user.update({
            where:{
                id: userID,
            },
            data:{
                verifyOtp: OTP,
                verifyOtpExpiredAt: otpExpiry,
            }
        });
        
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: existingUser.email,
            subject: 'Account Verification OTP',
            text: 
            `Hi ${existingUser.fullName}👋, 
             Your account verification OTP is: ${OTP}.
            
             Best Regards
             Pratik Jussal`
        }

        await transporter.sendMail(mailOptions);

        res.json({success: "true", message: "Verification Email Send Successfully"});
        return 
    }catch(error){
        res.status(500).json({ success: "false", message: "Something Went Wrong", detail: error });
        return;
    }
}