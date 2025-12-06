import { Router } from "express";
import { userControllers } from "./users.controller";

const router = Router();

router.get("/", userControllers.getUsers);
router.get("/:userId", userControllers.getUser);
router.put("/:userId", userControllers.upadateUser);
router.delete("/:userId", userControllers.deleteUser);

export const userRoutes = router;
