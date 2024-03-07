const router = require('express').Router();
const mongoose = require("mongoose");
const User = require("../models/User.model")
const Post = require("../models/Post.model")


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
        .then((allPosts) =>
            res.json(allPosts))
        .catch((err) => {
            console.log("Error while retriving posts", err);
            res.status(500).json({ message: "Error while getting the posts" });
        });
});

//   PUT/ update a post
router.put('/post/:postId', (req, res, next) => {
    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Post.findByIdAndUpdate(postId, req.body, { new: true })
        .then((updatedPost) => res.json(updatedPost))
        .catch((err) => {
            console.log("Error while updating the post", err);
            res.status(500).json({ message: "Error while updating the post" });
        });
});
//   DELETE/post

router.delete('/post/:postId', (req, res, next) => {
    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Post.findByIdAndDelete(postId)
        .then(() => res.json({ message: `Post with ${postId} is removed successfully.` }))
        .catch((err) => {
            console.log("Error while deleting the post", err);
            res.status(500).json({ message: "Error while deleting the post" });
        });
});

module.exports = router;