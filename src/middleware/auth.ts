import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const reqHeader = req.headers.authorization;
            console.log("we are verifying the token : ", reqHeader);

            if (!reqHeader) {
                return res.status(401).json({
                    success: false,
                    message: "Access Denied!",
                });
            }
            const token = reqHeader?.split(" ")[1];
            const decoded = jwt.verify(
                token as string,
                config.jwtSecret as string,
            ) as JwtPayload;
            console.log("decoded token :", decoded);

            req.user = decoded as JwtPayload;
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Access Forbidden !!!",
                });
            }
            next();
        } catch (err: any) {
            res.status(500).json({
                success: false,
                error: err?.message,
            });
        }
    };
};
export default auth;
