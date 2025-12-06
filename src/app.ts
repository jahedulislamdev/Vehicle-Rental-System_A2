import express, { Request, Response } from "express";
import initDb from "./config/db";
import { authRoutes } from "./modules/auth/auth.routes";

const app = express();
// middleware
app.use(express.json());

initDb();
// routes
app.use("/api/v1/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Vehicle Rental System is Running...");
});

export default app;
