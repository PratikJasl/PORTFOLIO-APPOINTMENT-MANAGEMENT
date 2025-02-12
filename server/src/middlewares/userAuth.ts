import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

export function userAuth(req: Request, res: Response, next: NextFunction){
    const token = req.cookies.token;
    console.log("Cntrl in middleware, token:", token);
    if(!token){
        res.status(401).json({success: "false", message: "Not Authorized Login Again"});
        return;
    }

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            res.status(401).json({ success: "false", message: "JWT secret is not defined" });
            return;
        }

        
        const tokenDecode = jwt.verify(token, secret);
        console.log("decoded Token:", tokenDecode);

        if (tokenDecode && typeof tokenDecode === 'object' && 'id' in tokenDecode) {
            req.body.userID = tokenDecode.id;
            console.log("user ID:", req.body.userID);
        }else{
            res.status(401).json({ success: "false", message: "Not Authorized Login Again" });
            return;
        }
        next();

    } catch (error) {
        res.status(401).json({success: "false", message: "Something Went Wrong", details: error});
        return;
    }
}