const router = require('express').Router();
const mongoose = require("mongoose");
const Comment = require("../models/Comment.model")
const Post = require("../models/Post.model")
const User = require("../models/User.model")

const {isAuthenticated} = require("../middleware/jwt.middleware");


//POST/api/comment
router.post('/comment', isAuthenticated, (req, res, next) => {
        console.log("req body",req.body);
    const { content, postId, favorite } = req.body;
    const currentUserId = req.payload._id;

    // First lets check  if the author and the post are provided  by using their IDs
    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: "Invalid author or post ID" });
    }
        // Post.findById(postId)
        // .then(existingPost => {
        //     if (!existingPost) {
        //         throw new Error("Post with specifiedd Id not found:"+postId);
        //     }
            // Create the comment
             Comment.create({ content, favorite, author: currentUserId, postId })
        
        .then(newComment => {
           
            return Post.findByIdAndUpdate(newComment.postId,{$push:{comments:newComment._id}})

                        
        })
        .then(()=>{

                res.status(201).json("The post was successfully created");
        })
        .catch(error => {
            console.error("Error while creating the comment", error);
            res.status(500).json({ message: "Error while creating the comment" });
        });
});

// GET /api/comments -  Retrieves all comments
router.get('/comment', (req, res, next) => {
    Comment.find()
      .populate('author')
      .populate('postId')
      .then((allComments) => 
      res.json(allComments))
      .catch((err) => {
        console.log("Error while retriving comments", err);
        res.status(500).json({ message: "Error while getting the comments" });
      });
  });
  //   PUT/ update a comment
router.put('/comment/:commentId', async (req, res, next) => {
    const { commentId } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({ message: 'Specified id is not valid' });
        }

        const updateComment = await Comment.findByIdAndUpdate(commentId, req.body, { new: true });
        res.json(updateComment);
    }   catch (error) {
        console.error("Error while updating the comment", error);
        res.status(500).json({ message: "Error while updating the comment" });
    }
});

//Delete/commens/commentId
  router.delete('/comment/:commentId', async (req, res, next) => {
    const { commentId } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({ message: 'Specified id is not valid' });
        }

        await Comment.findByIdAndDelete(commentId);

        res.json({ message: `Comment with ${commentId} is removed successfully.` });
    } catch (error) {
        console.error("Error while deleting the comment", error);
        res.status(500).json({ message: "Error while deleting the comment" });
    }
});

module.exports = router;