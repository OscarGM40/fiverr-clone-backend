import { Document, Model, Schema, model } from "mongoose";

// realmente es necesaria esta interfaz??
interface MessageAttrs {
  ConversationId: string;
  UserId: string;
  desc: string;
}
interface MessageDocument extends Document {
  ConversationId: string;
  UserId: string;
  desc: string;
}

interface MessageModel extends Model<MessageDocument> {
  build(attrs: MessageAttrs): MessageDocument;
}

const MessageSchema = new Schema<MessageDocument>(
  {
    ConversationId: { type: String, required: true },
    UserId: { type: String, required: true },
    desc: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const MessageModel = model<MessageDocument, MessageModel>("Message", MessageSchema);
