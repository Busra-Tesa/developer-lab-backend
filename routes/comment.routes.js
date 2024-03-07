const router = require('express').Router();
const mongoose = require("mongoose");
const Comment = require("../models/Comment.model")
const Post = require("../models/Post.model")


//POST/api/comment
router.post('/comment', (req, res, next) => {
    const { content, author, post, favorite } = req.body;

    // First let's check if the author and the post are provided by their IDs
    if (!mongoose.Types.ObjectId.isValid(author) || !mongoose.Types.ObjectId.isValid(post)) {
        return res.status(400).json({ message: "Invalid author or post ID" });
    }

    // Check if the author exists in the database
    User.findById(author)
        .then(existingAuthor => {
            if (!existingAuthor) {
                throw new Error("Author not found with ID: " + author);
            }
            // Check if  post exists in the database
            return Post.findById(post);
        })
        .then(existingPost => {
            if (!existingPost) {
                throw new Error("Post not found with ID: " + post);
            }
            // Create the comment
            return Comment.create({ content, favorite, author, post });
        })
        .then(newComment => {
            res.json(newComment);
        })
        .catch(error => {
            console.error("Error while creating the comment", error);
            res.status(500).json({ message: "Error while creating the comment" });
        });
});


//GET Test method
router.get("/comment",(req,res,next)=>{
    res.send("it works");

})
// GET /api/comments -  Retrieves all comments
router.get('/comment', (req, res, next) => {
    Comment.find()
      .populate('post','author')
      .then((allComments) => 
      res.json(allComments))
      .catch((err) => {
        console.log("Error while retriving comments", err);
        res.status(500).json({ message: "Error while getting the comments" });
      });
  });


module.exports = router;