import { Router } from "express";
import { authenticate } from "../authentication/jwtAuth";
import { deleteRoomController, getAllRoomsController, getRoomController, newRoomController } from "./roomController";

const router = Router();

router.post('/new', authenticate, newRoomController);
router.delete('/:id', authenticate, deleteRoomController);
router.get('/all', authenticate, getAllRoomsController);
router.get('/:id', authenticate, getRoomController);

export { router };