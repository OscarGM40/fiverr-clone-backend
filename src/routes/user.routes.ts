import express from "express";
import { deleteUser } from "../controllers/user.controller";
import { verifyToken } from "../../middlewares/jwt";
const router = express.Router();

router.delete("/:id", [verifyToken], deleteUser);

export default router;
