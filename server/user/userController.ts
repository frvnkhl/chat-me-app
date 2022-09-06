import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../authentication/jwtAuth";
import {
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
    return res.status(422).send({ message: "missing credentials" });
  }

  if (await userExists(req)) {
    return res
      .status(409)
      .send({ message: "user with this username already exists" });
  }

  const newUser = await registerUserService(req);
  if (!newUser) {
    return res.status(400).send({ message: "something went wrong" });
  }
  return res.status(200).send({ message: "user created" });
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

export {
  registerUserController,
  loginUserController,
  getCurrentUserController,
};
