const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: String,
  description: String,
  category:String,
  image:String,
  likes:Number
});

module.exports = mongoose.model("Blog", schema);
