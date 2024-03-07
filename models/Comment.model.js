const mongoose = require("mongoose");  // why it is not asking for the same in the user model
const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "Content is required."],
    
    },
    author: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
   
    } ,
    date: {
      type: Date,
      default:Date.now,
    },
   post:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Post',
   },
    favorite: {
      type: Boolean,
    
    },
   
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
