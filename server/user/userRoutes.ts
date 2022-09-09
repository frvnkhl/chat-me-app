import { Router } from "express";
import { authenticate } from "../authentication/jwtAuth";
import { changeRoomController, getCurrentUserController, loginUserController, registerUserController } from "./userController";

const router = Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.get("/current", authenticate, getCurrentUserController);
router.patch('/change-room', authenticate, changeRoomController);

export { router };