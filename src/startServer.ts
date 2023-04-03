import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import userRoutes from "./routes/user.routes";
import gigRoutes from "./routes/gig.routes";
import orderRoutes from "./routes/order.routes";
import conversationRoutes from "./routes/conversation.routes";
import messageRoutes from "./routes/message.routes";
import reviewRoutes from "./routes/review.routes";
import authRoutes from "./routes/auth.routes";
import cookieParser from 'cookie-parser';

const app = express();
import "../database/connection";
import { HttpException } from "./utils/CustomError";
// middlewares
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// routes of the app
app.use("/api/users", userRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/auth", authRoutes);


app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
  const errorStatus = err?.statusCode || 500;

  return res.status(errorStatus).json({
    success: false,
    status: err?.statusCode || 500,
    message: err?.message || "Something went wrong",
  });
});

const PORT = process.env.API_PORT || 8800;
app.listen(PORT, () => {
  console.clear();
  console.log(`Fiverr server listening on port ${PORT}`);
});
