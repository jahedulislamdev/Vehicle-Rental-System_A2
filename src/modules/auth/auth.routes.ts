import { Router } from "express";
import { authControllers } from "./auth.controller";

const router = Router();

router.post("/signup", authControllers.userRegistration);
router.post("/signin", authControllers.userLogin);

export const authRoutes = router;
