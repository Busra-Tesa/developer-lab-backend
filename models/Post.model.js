const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
    
    },
    content: {
      type: String,
      required: [true, "Conent is required."],
    },
    date: {
      type: Date,
      default:Date.now,
    },
    author: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true, 
   
    },
    category: {
      type: String,enum:["Javascript","CSS","React","HTML"],
      required: [true, " Category is required."],
    },
   
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Post = model("Post", postSchema);

module.exports = Post;
