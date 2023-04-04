import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/User.model";
import { PassWordUtils } from "../utils/PasswordUtils";
import { JWTUtils } from "../utils/JWTUtils";
import { HttpCode, HttpException } from "../utils/CustomError";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // fijate que con CTRL + C realmente estoy copiando desde el modo visual todas las lineas,aunque no lo vea lo hace
    // req.body = username + email + password + country
    const newUser = new UserModel({
      ...req.body,
      password: PassWordUtils.encryptPassword(req.body.password),
    });
    await newUser.save();

    return res.status(201).json({ ok: true, user: newUser });
  } catch (error) {
    console.log(error);
    return next(new HttpException(HttpCode.INTERNAL_SERVER_ERROR, `Error of type: ${error}`));
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });

    if (!user)
      return next(
        new HttpException(HttpCode.NOT_FOUND, `User with username ${req.body.username} not found`),
      );

    //if there is a user we compare passwords
    const passwordsMatch = PassWordUtils.comparePasswords(req.body.password, user.password);

    if (!passwordsMatch)
      return next(new HttpException(HttpCode.UNAUTHORIZED, `Passwords don't match`));

    // if all is correct we generate a jwt
    const token = JWTUtils.generateToken({
      id: user._id,
      isSeller: user.isSeller,
    });
    // and we embebe it in the cookie
    return res
      .status(200)
      .cookie("accessToken ", token, {
        httpOnly: true,
        secure: false, // a true no la veo en Postman,pero lo querré en prod ??
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      })
      .json({ ok: true, user });
  } catch (error) {
    console.log(error);
    return next(new HttpException(HttpCode.INTERNAL_SERVER_ERROR, `Error of type: ${error}`));
  }
};

export const logout = async (req: Request, res: Response) => {
  return res
    .clearCookie("accessToken", {
      // localhost:5173 y localhost:3000 no son el mismo sitio y es lo que vamos a tener,ambos en puertos diferentes
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json({ ok: true, message: `User has been logged out` });
};
