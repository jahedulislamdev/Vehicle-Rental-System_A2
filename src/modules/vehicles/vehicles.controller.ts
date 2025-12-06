import { Request, Response } from "express";
import { vehicleServices } from "./vehicles.service";

const createVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.saveVehicle(req.body);
        if (result.rows.length) {
            res.status(201).json({
                success: true,
                message: "Booking created successfully",
                data: result.rows[0],
            });
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err?.message,
        });
    }
};
const getVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.getVehicle(req.params.vehicleId!);
        if (result.rows.length) {
            res.status(200).json({
                success: true,
                message: "Vehicle retrieved successfully",
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
const getVehicles = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.getVehicles();
        if (result.rows.length) {
            res.status(200).json({
                success: true,
                message: "Vehicles retrieved successfully",
                data: result.rows,
            });
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error: err?.message,
        });
    }
};
const updateVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.updateVehicle(
            req.body,
            req.params.vehicleId!,
        );
        if (result.rows.length) {
            res.status(200).json({
                success: true,
                message: "Vehicle updated successfully",
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
const deleteVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.deleteVehicle(
            req.params.vehicleId!,
        );
        if (result.rowCount === 1) {
            res.status(200).json({
                success: true,
                message: "Vehicle deleted successfully",
            });
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err?.message,
        });
    }
};

export const vehicleControllers = {
    createVehicle,
    getVehicle,
    getVehicles,
    updateVehicle,
    deleteVehicle,
};
