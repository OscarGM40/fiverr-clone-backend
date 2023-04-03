import mongoose from "mongoose";
const { Schema, model } = mongoose;

interface Gig {
  userId: String;
  title:String;
  desc:String;
  totalStars:Number; // numero total de votos
  starNumber:Number; // puntuación de cada voto(luego la media es sumatorio de puntuaciones entre el total)
  cat:String;
  price:Number;
  cover:String;
  images:String[];
  shortTitle:String;
  shortDesc:String;
  deliveryTime:Number;
  revisionNumber:Number;
  features: String[];
  sales: Number;
   
}

const GigSchema = new Schema<Gig>(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    totalStars: { type:Number, default: 0 },
    starNumber: { type:Number, default: 0 },
    cat: { type:String, required: true },
    price: { type:Number , required: true },
    cover: { type:String , required: true },
    images: { type:[String] , required: false  },
    shortTitle:{ type: String, required:true},
    shortDesc:{ type: String, required:true},
    deliveryTime: { type: Number, required: true},
    revisionNumber: {type: Number, required: true},
    features: { type:[String] , required: false },
    sales: {type: Number, default: 0}
  },
  { timestamps: true, versionKey: false },
);

export const GigModel = model<Gig>("Gig", GigSchema);
