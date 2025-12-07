import { Router } from "express";
import { bookingControllers } from "./bookings.controller";
import auth from "../../middleware/auth";

const router = Router();
router.post("/", bookingControllers.createBooking);
router.get("/", auth("admin", "customer"), bookingControllers.getBookings);
router.patch("/:bookingId", bookingControllers.updateBooking);

export const bookingRoutes = router;
