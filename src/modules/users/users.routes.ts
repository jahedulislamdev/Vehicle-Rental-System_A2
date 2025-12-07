import { Router } from "express";
import { userControllers } from "./users.controller";
import auth from "../../middleware/auth";

const router = Router();

router.get("/", auth("admin"), userControllers.getUsers);
router.get("/:userId", userControllers.getUser);
router.put("/:userId", auth("admin", "customer"), userControllers.upadateUser);
router.delete("/:userId", auth("admin"), userControllers.deleteUser);

export const userRoutes = router;
