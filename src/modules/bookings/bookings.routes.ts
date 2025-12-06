import { Router } from "express";
import { bookingControllers } from "./bookings.controller";

const router = Router();
router.post("/", bookingControllers.saveBooking);

export const bookingRoutes = router;
