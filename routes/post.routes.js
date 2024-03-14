const router = require('express').Router();
const mongoose = require("mongoose");
const User = require("../models/User.model")
const Post = require("../models/Post.model")
const Comment = require("../models/Comment.model")

//POST/api/comment
router.post('/post', (req, res, next) => {
    const { title, content, author, category } = req.body;

    // First let's check if the author is provided by its ID
    if (!mongoose.Types.ObjectId.isValid(author)) {
        return res.status(400).json({ message: "Invalid author ID" });
    }
    // Check if the author exists in the database
    User.findById(author)
        .then(existingAuthor => {
            if (!existingAuthor) {
                throw new Error("Author not found with ID: " + author);
            }
            // Create the post
            return Post.create({ title, content, author, category });
        })
        .then(newPost => {
            res.json(newPost);
        })
        .catch(error => {
            console.error("Error while creating the post", error);
            res.status(500).json({ message: "Error while creating the post" });
        });
});

// GET /api/post -  Retrieves all posts
router.get('/post', (req, res, next) => {
    Post.find()
        .populate('author')
        .populate('comments')
        .then((allPosts) =>
            res.json(allPosts))
        .catch((err) => {
            console.log("Error while retriving posts", err);
            res.status(500).json({ message: "Error while getting the posts" });
        });
});

//   PUT/ update a post
router.put('/post/:postId', async (req, res, next) => {
    const { postId } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: 'Specified id is not valid' });
        }
        const updatedPost = await Post.findByIdAndUpdate(postId, req.body, { new: true });
        res.json(updatedPost);
    } catch (error) {
        console.error("Error while updating the post", error);
        res.status(500).json({ message: "Error while updating the post" });
    }
});
//   DELETE/post

router.delete('/post/:postId', async (req, res, next) => {
    const { postId } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: 'Specified id is not valid' });
        }

        // Delete the comments that belogn to the post
        await Comment.deleteMany({ postId });

        // Delete the post
        await Post.findByIdAndDelete(postId);

        res.json({ message: `Post with ${postId} is removed successfully.` });
    } catch (error) {
        console.error("Error while deleting the post", error);
        res.status(500).json({ message: "Error while deleting the post" });
    }
});

router.get('/post/:postId', (req,res,next)=>{
    const {postId} = req.params;

    if(!mongoose.Types.ObjectId.isValid(postId)){
        res.status(400).json({message:`Specified id is not valid`});
        return;
    }

    Post.findById(postId)
    .populate('author')
    .populate('comments')
    .then((post)=>res.status(200).json(post))
    .catch((e)=>{
        console.log('Error while retrieving the project', e);
        res.status(500).json({message:"Error while retrieving the project"});

    });
})

module.exports = router;