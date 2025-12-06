import express, { Request, Response } from "express";
import initDb from "./config/db";

const app = express();
// middleware
app.use(express.json());

initDb();
app.get("/", (req: Request, res: Response) => {
    res.send("Vehicle Rental System is Running...");
});

export default app;
