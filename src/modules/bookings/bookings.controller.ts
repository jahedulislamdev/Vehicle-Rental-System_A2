import { Request, Response } from "express";
import { bookingServices } from "./bookings.service";

const saveBooking = async (req: Request, res: Response) => {
    try {
        const result = await bookingServices.saveBookings(req.body);
        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: result.rows[0],
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err?.message,
        });
    }
};

export const bookingControllers = {
    saveBooking,
};
