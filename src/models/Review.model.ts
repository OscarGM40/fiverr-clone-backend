import { Document, Model, Schema, model } from "mongoose";

interface ReviewDocument extends Document {
  gigId: string;
  userId: string;
  star: number;
  desc: string;
}

interface ReviewModel extends Model<ReviewDocument> {
  build(attrs: ReviewDocument): ReviewDocument;
}

const ReviewSchema = new Schema<ReviewDocument>(
  {
    gigId: { type: String, required: true },
    userId: { type: String, required: true },
    star: { type: Number, enum: [1, 2, 3, 4, 5], required: true },
    desc: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const ReviewModel = model<ReviewDocument, ReviewModel>("Review", ReviewSchema);
