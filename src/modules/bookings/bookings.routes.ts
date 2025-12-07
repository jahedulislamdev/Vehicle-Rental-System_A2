import { Router } from "express";
import { bookingControllers } from "./bookings.controller";

const router = Router();
router.post("/", bookingControllers.createBooking);
router.get("/", bookingControllers.getBookings);
router.put("/:bookingId", bookingControllers.updateBooking);

export const bookingRoutes = router;
