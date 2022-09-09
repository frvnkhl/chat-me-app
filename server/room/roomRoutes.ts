import { Router } from "express";
import { authenticate } from "../authentication/jwtAuth";
import { deleteRoomController, newRoomController } from "./roomController";

const router = Router();

router.post('/new', authenticate, newRoomController);
router.delete('/:id', authenticate, deleteRoomController);

export { router };