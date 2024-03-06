const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "Content is required."],
    
    },
    author: {
        type:mongose.Types.ObjectId,
        ref:'User',
   
    } ,
    date: {
      type: Date,
      required: [true, "Date and Time is required."],
    },
   post:{
    type:mongose.Types.ObjectId,
    ref:'Post',

   },
    favorite: {
      type: Boolean,
      required:true
      
    },
   
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
