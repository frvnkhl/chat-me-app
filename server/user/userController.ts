import { NextFunction, Request, Response } from "express";
import {
  changeRoomService,
  getCurrentUserService,
  loginUserService,
  registerUserService,
  userExists,
} from "./userService";

const registerUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.username || !req.body.password) {
    return res.status(422).send({ message: "Missing credentials!" });
  }

  if (await userExists(req)) {
    return res
      .status(409)
      .send({ message: "User with this username already exists!" });
  }

  const newUser = await registerUserService(req);
  if (!newUser) {
    return res.status(400).send({ message: "Something went wrong!" });
  }
  return res.status(200).send({ message: "User created!" });
};

const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.username || !req.body.password) {
    return res.status(422).send({ message: "missing credentials" });
  }

  if (!userExists(req)) {
    return res
      .status(404)
      .send({ message: "user with these credentials doesn't exist" });
  }
  try {
    const foundUser = await loginUserService(req);
    console.log({ response: foundUser });

    res.status(200).send(foundUser);
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

const getCurrentUserController = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const user = await getCurrentUserService(req);

  if (user === null) {
    return res.status(400).send({ message: "Something went wrong" });
  }

  res.status(200).send({ user: user });
};

const changeRoomController = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const user = await getCurrentUserService(req);

  if (user === null) {
    return res.status(400).send({ message: "Something went wrong" });
  }

  const roomChanged = changeRoomService(user.id, req.body.roomId);

  if (!roomChanged) {
    return res.status(400).send({ message: "Something went wrong!" });
  }
  return res.status(200).send({ message: "Room changed successfully!" });
};

export {
  registerUserController,
  loginUserController,
  getCurrentUserController,
  changeRoomController
};
