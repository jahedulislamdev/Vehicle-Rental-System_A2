import { Request, Response } from "express";
import { userServices } from "./users.service";

const getUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getUser(req.params.userId!);
        if (result.rows.length) {
            res.status(200).json({
                success: true,
                message: "User retrieved successfully",
                data: result.rows[0],
            });
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: "Internal server error!",
            error: err?.message,
        });
    }
};
const getUsers = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getUsers();
        if (result.rows.length) {
            res.status(200).json({
                success: true,
                message: "Users retrieved successfully",
                data: result.rows,
            });
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: "Internal server error!",
            error: err?.message,
        });
    }
};
const upadateUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.updateUser(
            req.body,
            req.params.userId!,
        );
        if (result.rows.length) {
            res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: result.rows[0],
            });
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: "Internal server error!",
            error: err?.message,
        });
    }
};
const deleteUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.deleteUser(req.params.userId!);
        if (result.rowCount === 1) {
            res.status(200).json({
                success: true,
                message: "User deleted successfully",
                data: result.rows[0],
            });
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: "Internal server error!",
            error: err?.message,
        });
    }
};

export const userControllers = {
    getUser,
    getUsers,
    upadateUser,
    deleteUser,
};
