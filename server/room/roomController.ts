import { NextFunction, Request, Response } from "express";
import {
  createNewRoomService,
  deleteRoomService,
  getAllRooms,
  getRoom,
  roomExists,
} from "./roomService";

const newRoomController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.name || !req.body.admin) {
    return res.status(422).send({ message: "Missing credentials!" });
  }

  if (await roomExists(req.body.name)) {
    return res
      .status(409)
      .send({ message: "You can't have more rooms with the same name!" });
  }

  const newRoom = await createNewRoomService(req.body.name, req.body.admin);
  if (!newRoom) {
    return res.status(400).send({ message: "Something went wrong!" });
  }

  return res.status(200).send({ message: "Room created!" });
};

const deleteRoomController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.params.id || !req.body.userId) {
    return res.status(422).send({ message: "Missing attributes!" });
  }

  const roomId = req.params.id;
  const userId = req.body.userId;

  const room = await getRoom(roomId);

  if (room.admin !== userId) {
    return res.status(403).send({ message: "Only admin can delete the room!" });
  }

  const roomDeleted = await deleteRoomService(roomId);

  if (!roomDeleted) {
    return res.status(400).send({ message: "Something went wrong!" });
  }

  return res.status(200).send({ message: "Room deleted successfully!" });
};

const getAllRoomsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const rooms = await getAllRooms();

  return res.status(200).send({ rooms: rooms });
};

const getRoomController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.params.id) {
    return res.status(422).send({ message: "Missing attributes!" });
  }

  const roomId = req.params.id;

  const room = await getRoom(roomId);

  return res.status(200).send({ rooms: room });
};

export { newRoomController, deleteRoomController, getAllRoomsController, getRoomController };
