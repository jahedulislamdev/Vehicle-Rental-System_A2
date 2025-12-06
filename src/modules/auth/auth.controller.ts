import { Request, Response } from "express";
import { authServices } from "./auth.service";

const userRegistration = async (req: Request, res: Response) => {
    try {
        const result = await authServices.register(req.body);
        const { password, ...userWithoutPassword } = result.rows[0];

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: userWithoutPassword,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: "Registration Failed!",
            error: err?.message,
        });
    }
};
const userLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const result = await authServices.login(email, password);
        if (result === null || result === false) {
            return res.status(401).json({
                success: false,
                message: "Invalid User",
            });
        }
        const { password: pass, ...user } = result.user;
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: { token: result.token, user },
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err?.message,
        });
    }
};

export const authControllers = {
    userRegistration,
    userLogin,
};
