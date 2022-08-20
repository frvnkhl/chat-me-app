import { NextFunction, Request, Response } from "express";
import { registerUserService, userExists } from "./userService";

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
  if (newUser) {
    return res.status(200).send({ message: "user created" });
  }

  return res.status(400).send({ message: "something went wrong" });
};

export { registerUserController };
