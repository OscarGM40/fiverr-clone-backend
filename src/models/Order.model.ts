import { Document, Model, Schema, model } from "mongoose";

interface OrderAttrs {}
interface OrderDocument extends Document {
  gigId: string;
  img?: string;
  title: string;
  price: number;
  sellerId: string;
  buyerId: string;
  isCompleted?: boolean;
  payment_intent?: string;
}
// diria que lo que necesito es crear una interface que extienda de Model<T> con mi tipado y despues pasarla en model(T,R) como tipo R
interface OrderModel extends Model<OrderDocument> {
  build(attrs: OrderDocument): OrderDocument;
}

const OrderSchema = new Schema<OrderDocument>(
  {
    gigId: { type: String, required: true },
    img: { type: String, required: false },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    // when contacting seller and buyer they will start a Conversation so we need both IDs
    sellerId: { type: String, required: true },
    buyerId: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
    payment_intent: { type: String, default: false },
  },
  { timestamps: true, versionKey: false },
);

export const OrderModel = model<OrderDocument, OrderModel>("Order", OrderSchema);
