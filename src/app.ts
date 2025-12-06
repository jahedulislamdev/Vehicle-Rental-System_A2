import express, { Request, Response } from "express";
import initDb from "./config/db";
import { authRoutes } from "./modules/auth/auth.routes";
import { bookingRoutes } from "./modules/bookings/bookings.routes";
import { vehicleRoutes } from "./modules/vehicles/vehicles.routes";

const app = express();

// middlewares
app.use(express.json());

initDb();

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/vehicles", vehicleRoutes);

app.use((req, res) => {
    res.status(404).send({
        success: false,
        message: "Route Not Found!",
        path: req.path,
    });
});

app.get("/", (req: Request, res: Response) => {
    res.send("Vehicle Rental System is Running...");
});

export default app;
