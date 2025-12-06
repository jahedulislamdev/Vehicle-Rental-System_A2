import { Router } from "express";
import { vehicleControllers } from "./vehicles.controller";

const router = Router();
router.post("/", vehicleControllers.createVehicle);
router.get("/", vehicleControllers.getVehicles);
router.get("/:vehicleId", vehicleControllers.getVehicle);
router.put("/:vehicleId", vehicleControllers.updateVehicle);
router.delete("/:vehicleId", vehicleControllers.deleteVehicle);

export const vehicleRoutes = router;
