import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

export async function getUserDetail(req: Request, res: Response){
    const {userID} = req.body;

    if(!userID){
        res.json({ success: "false", message: "User ID not found, please login again"});
        return;
    }

    try {
        let user = await prisma.user.findUnique({
            where:{
                id: userID
            }
        })

        if(!user){
            res.json({ success: "false", message: "User not found"});
            return;
        }

        res.json({
            sucess: "true",
            userData:{
                name: user?.fullName,
                email: user?.email,
                isAccountVerified: user?.isVerified
            }
        });

    } catch (error) {
        res.status(500).json({ success: "false", message: "Something Went Wrong", detail: error });
        return;
    }
}