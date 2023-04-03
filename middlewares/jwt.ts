import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { HttpCode, HttpException } from "../src/utils/CustomError";

declare module "express-serve-static-core" {
  export interface Request {
    userId: string;
    isSeller: boolean;
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;
  if (!token) return next(new HttpException(HttpCode.UNAUTHORIZED, `You are not authenticated`));

  return jwt.verify(token, process.env.JWT_SECRET!, (err: any, payload: any) => {
    if (err)
      return next(new HttpException(403, `Something went wrong while verifying token: ${err}`));

    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    next();
  });
};
