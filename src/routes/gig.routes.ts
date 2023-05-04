import express from "express";
import { verifyToken } from "../../middlewares/jwt";
import { createGig, deleteGig, getAllGigs, getOneGig } from "../controllers/gig.controller";

const router = express.Router();

router.post("/", [verifyToken], createGig);
router.delete("/:id", [verifyToken], deleteGig);
router.get("/:id", [verifyToken], getOneGig);
router.get("/", [verifyToken], getAllGigs);

export default router;
