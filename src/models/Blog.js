import mongoose from "mongoose";

const schema = mongoose.Schema({
  title: String,
  description: String,
  category:String,
  image: {data: Buffer, contentType: String},
  likes:Number
});

export default mongoose.model("Blog", schema);