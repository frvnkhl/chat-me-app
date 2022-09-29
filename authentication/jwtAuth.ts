import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET_KEY || "";

interface CustomRequest extends Request {
  token: string | JwtPayload;
}

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    };

    const decoded = verify(token, jwtSecret);
    (req as CustomRequest).token = decoded;

    next();
  } catch (err) {
    res.status(401).send({ message: "Please, authenticate." });
  };
};

export { CustomRequest, authenticate };
