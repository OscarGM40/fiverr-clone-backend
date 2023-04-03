import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/User.model";
import { HttpCode, HttpException } from "../utils/CustomError";

declare module "express-serve-static-core" {
  export interface Request {
    userId: string;
    isSeller: boolean;
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if (!user)
      return next(
        new HttpException(HttpCode.NOT_FOUND, `User with username ${req.body.username} not found`),
      );

    // ojo con el casteo y la necesidad de extender express
    if (req.userId === user._id.toString()) {
      await UserModel.findByIdAndDelete({ _id: req.params.id });
      return res
        .status(200)
        .json({ ok: true, message: `User with username ${user.username} has been deleted` });
    }
    // si llega aqui es que no es él
    return next(new HttpException(HttpCode.UNAUTHORIZED, `You cannot delete other users`));
  } catch (error) {
    console.log(error);
    return next(new HttpException(HttpCode.INTERNAL_SERVER_ERROR, `Error of type: ${error}`));
  }
};
