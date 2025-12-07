import { Request, Response } from "express";
import { bookingServices } from "./bookings.service";

const createBooking = async (req: Request, res: Response) => {
    try {
        const result = await bookingServices.saveBookings(req.body);
        const bookingResult = result.rows[0];
        if (result.rows.length) {
            await bookingServices.updateVehicleStatus(
                "booked",
                bookingResult.vehicle_id,
            );
        }
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
const getBookings = async (req: Request, res: Response) => {
    try {
        const result = await bookingServices.getBookings(req.user);
        if (result.rows.length) {
            res.status(200).json({
                success: true,
                message: "Bookings retrieved successfully",
                data: result.rows,
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
const updateBooking = async (req: Request, res: Response) => {
    const { status } = req.body;
    try {
        const result = await bookingServices.updateBookings(
            status,
            req.params.bookingId!,
        );

        const updatedBookingResult = result.rows[0];
        console.log(updatedBookingResult);
        // console.log(updatedBookingResult?.status);

        if (updatedBookingResult.status === "cancelled") {
            await bookingServices.updateVehicleStatus(
                "available",
                updatedBookingResult.vehicle_id,
            );
            res.status(200).json({
                success: true,
                message: "Booking cancelled successfully",
                data: updatedBookingResult,
            });
        } else if (updatedBookingResult?.status === "returned") {
            const result = await bookingServices.updateVehicleStatus(
                "available",
                updatedBookingResult.vehicle_id,
            );
            const updatedVehicleStatus = result.rows[0];
            console.log(updatedVehicleStatus);

            updatedBookingResult.vehicle = {
                availability_status: updatedVehicleStatus?.availability_status,
            };
            res.status(200).json({
                success: true,
                message: "Booking marked as returned. Vehicle is now available",
                data: updatedBookingResult,
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

export const bookingControllers = {
    createBooking,
    getBookings,
    updateBooking,
};
