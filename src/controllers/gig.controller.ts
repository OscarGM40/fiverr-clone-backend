import { NextFunction, Request, Response } from "express";
import { HttpCode, HttpException } from "../utils/CustomError";
import { GigModel } from "../models/Gig.model";

export const createGig = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.isSeller)
    return next(new HttpException(HttpCode.FORBIDEN, `Only sellers can create a gig`));
  try {
    const newGig = new GigModel({
      ...req.body,
      // si mandaran un userId lo pisamos con el de la request
      userId: req.userId,
    });
    const savedGig = await newGig.save();
    return res.status(201).json({ ok: true, gig: savedGig });
  } catch (error) {
    console.log(error);
    return next(new HttpException(HttpCode.INTERNAL_SERVER_ERROR, `Error of type: ${error}`));
  }
};
// solo puedo borrar mis gigs luego (gig.userId === req.userId)
export const deleteGig = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const gigToDelete = await GigModel.findById(req.params.id);
    // findById devuelve null si no encuentar un documento,pero no cae
    if (!gigToDelete)
      return next(new HttpException(HttpCode.NOT_FOUND, `No gig found with the given id`));

    if (gigToDelete?.userId !== req.userId)
      return next(new HttpException(HttpCode.UNAUTHORIZED, `You can only delete your own gigs`));

    gigToDelete.deleteOne();
    return res.status(200).json({ ok: true, message: `Gig has been deleted` });
  } catch (error) {
    console.log(error);
    return next(new HttpException(HttpCode.INTERNAL_SERVER_ERROR, `Error of type: ${error}`));
  }
};

export const getOneGig = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // ojo que si pongo findById({id:req.params.id}) falla el casteo a ObjectId
    const gig = await GigModel.findById(req.params.id);
    if (!gig) return next(new HttpException(HttpCode.NOT_FOUND, `No gig found with the given id`));
    return res.status(200).json({ ok: true, gig: gig });
  } catch (error) {
    console.log(error);
    return next(new HttpException(HttpCode.INTERNAL_SERVER_ERROR, `Error of type: ${error}`));
  }
};

export const getAllGigs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // ojo que si pongo findById({id:req.params.id}) falla el casteo a ObjectId
      const gigs = await GigModel.find();
      return res.status(200).json({ ok: true, gigs: gigs });
    } catch (error) {
      console.log(error);
      return next(new HttpException(HttpCode.INTERNAL_SERVER_ERROR, `Error of type: ${error}`));
    }
};
