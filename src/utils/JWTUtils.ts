import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export type PayloadType = { id: string; isSeller: boolean };
export class JWTUtils {
  /**
   * @returns a token in its string representation given the payload received
   * @param payload the payload to store in the token
   */
  static generateToken(payload: PayloadType) {
    return jwt.sign(payload, process.env.JWT_SECRET!);
  }
  /**
   * @returns true or false depending if the id in the token stored in the cookie is the same as the third argumento
   * @param token a token retrieved previously from a cookie
   * @param res the global object response due to scope issues
   * @param userId any parsed Mongoose ObjectId to its string representation to check for
   */
  static checkTokenIsFromUser(req: Request, res: Response, token: string, userId: string) {
    let tokenAndUserAreTheSame: boolean = false;
    jwt.verify(token, process.env.JWT_SECRET!, (err, payload: any) => {
      if (err)
        return res
          .status(403)
          .json({ ok: false, error: `Something went wrong while verifying token: ${err}` });
      tokenAndUserAreTheSame = payload.id === userId;
      return null;
    });
    return tokenAndUserAreTheSame;
  }
}
