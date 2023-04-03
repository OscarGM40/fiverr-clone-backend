import { Document, Model, Schema, model } from "mongoose";

interface ConversationDocument extends Document {
  id: string;
  sellerId: string;
  buyerId: string;
  readBySeller: boolean;
  readByBuyer: boolean;
  lastMessage?: string;
}

interface ConversationModel extends Model<ConversationDocument> {
  build(attrs: ConversationDocument): ConversationDocument;
}

const ConversationSchema = new Schema<ConversationDocument>(
  {
    id: { type: String, required: true, unique: true },
    sellerId: { type: String, required: true },
    buyerId: { type: String, required: true },
    readBySeller: { type: Boolean, required: true },
    readByBuyer: { type: Boolean, required: true },
    lastMessage: { type: String, required: false },
  },
  { timestamps: true, versionKey: false },
);

export const ConversationModel = model<ConversationDocument, ConversationModel>(
  "Conversation",
  ConversationSchema,
);
