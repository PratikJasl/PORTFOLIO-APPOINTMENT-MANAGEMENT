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
            res.json({ success: false, message: "User ID is required" });
            return;
        }
        
        const user = await prisma.user.findUnique({
            where:{
                id: userID,
            }
        });
        
        if(!user){
            res.json({ success: "false", message: "User not found"});
            return;
        }

        if(user.isVerified){
            res.json({ success: "false", message: "Account already verified"});
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
            to: user.email,
            subject: 'Account Verification OTP',
            text: 
            `Hi ${user.fullName}👋, 
             Your account verification OTP is: ${OTP}.
            
             Best Regards
             Pratik Jussal`
        }

        await transporter.sendMail(mailOptions);

        res.json({success: "true", message: "Verification Email Send Successfully"});
        return;
    }catch(error){
        res.status(500).json({ success: "false", message: "Something Went Wrong", detail: error });
        return;
    }
}

export async function verifyEmail(req: Request, res: Response){
    const {userID, OTP} = req.body;

    if(!userID || !OTP){
        res.json({ success: false, message: "Missing Required Fields" });
        return;
    }

    try {
        const user = await prisma.user.findUnique({
            where:{
                id: userID,
            }
        });
        console.log(user);
        if(!user){
            res.json({ success: "false", message: "User not found"});
            return;
        }

        if(user.verifyOtp === '' || user.verifyOtp !== OTP){
            res.json({ success: "false", message: "Invalid OTP"});
            return;
        }

        if(user.verifyOtpExpiredAt.getTime() < Date.now()){
            res.json({ success: "false", message: "OTP Expired"});
            return;
        }

        const date = new Date (Date.now());
        await prisma.user.update({
            where:{
                id: userID,
            },
            data:{
                isVerified: true,
                verifyOtp: '',
                verifyOtpExpiredAt: date,
            }
        });

        res.json({success: "true", message: "Email Verified Successfully"});
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: "false", message: "Something Went Wrong", detail: error });
        return;
    }
}

export async function sendResetPasswordOTP(req: Request, res: Response){
    try{
        const { email } = req.body;

        if (!email) {
            res.json({ success: false, message: "Email is required" });
            return;
        }
        
        const user = await prisma.user.findUnique({
            where:{
                email: email,
            }
        });
        
        if(!user){
            res.json({ success: "false", message: "User not found"});
            return;
        }

        const OTP = String(Math.floor(100000 + Math.random() * 900000));
        const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);
        
        await prisma.user.update({
            where:{
                email: email,
            },
            data:{
                resetOtp: OTP,
                resetOtpExpiredAt: otpExpiry,
            }
        });
        
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Reset Password OTP',
            text: 
            `Hi ${user.fullName}👋, 
             Your reset password OTP is: ${OTP}.
            
             Best Regards
             Pratik Jussal`
        }

        await transporter.sendMail(mailOptions);

        res.json({success: "true", message: "Reset Password OTP Send Successfully"});
        return;
    }catch(error){
        res.status(500).json({ success: "false", message: "Something Went Wrong", detail: error });
        return;
    }
}

export async function resetPassword(req: Request, res: Response){
    const {email, OTP, password} = req.body;

    if(!email || !OTP || !password){
        res.json({ success: false, message: "Missing Required Fields" });
        return;
    }

    try {
        let user = await prisma.user.findUnique({
            where:{
                email: email
            }
        })
    
        if(!user){
            res.json({ success: false, message: "User Not Found" });
            return;
        }
    
        if(user.resetOtp === "" || user.resetOtp !== OTP){
            res.status(401).json({ success: false, message: "Invalid OTP" });
            return;
        }

        if(user.resetOtpExpiredAt.getTime() < Date.now()){
            res.json({ success: "false", message: "OTP Expired"});
            return;
        }
    
        const date = new Date (Date.now());
        const newPassword = await bcrypt.hash(password, 10);
    
        await prisma.user.update({
            where:{
                email: email,
            },
            data:{
                resetOtp: "",
                resetOtpExpiredAt: date,
                password: newPassword,
            }
        });
        
        res.status(200).json({ success: "true", message: "Password has been reset successfully" });
        return; 
    } catch (error) {
        res.status(500).json({ success: "false", message: "Something Went Wrong", detail: error });
        return;
    }
}