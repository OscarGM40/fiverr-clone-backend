import mongoose, { Document, Model } from "mongoose";
const { Schema, model } = mongoose;

// Interfaz que describe las propiedades que son requeridas para crear un nuevo User
interface UserAttrs {
  username: string;
  email: string;
  password: string;
  img?: string;
  country : string;
  phone:string;
  desc:string;
  isSeller: boolean;

}
interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  img?: string;
  country:string;
  phone:string;
  desc:string;
  isSeller: boolean;
}

interface UserModel extends Model<UserDocument> {
  build(attrs: UserAttrs): UserDocument;
}

const UserSchema = new Schema<UserDocument>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img: { type: String, required: false},
    country: { type: String,required:true },
    phone: { type: String, required: false },
    desc: { type: String, required: false },
    isSeller: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform(doc, ret) {
        // ret.id = ret._id;
        // delete ret._id;
        delete ret.password;
        // versionKey:false también hace lo mismo
        delete ret.__v;
        delete ret.updatedAt;
        delete ret.createdAt;
        // delete ret._id;
      },
    },
  },
);

export const UserModel = model<UserDocument, UserModel>("User", UserSchema);
