import { Router } from "express";
import { registerUserController } from "./userController";

const router = Router();

router.post("/register", registerUserController);

export { router };