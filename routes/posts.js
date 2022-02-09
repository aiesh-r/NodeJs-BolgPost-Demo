const express = require('express')
const router = express.Router();
const Post = require('../models/Post');

//FETCH ALL POSTS
router.get('/', async (req, res) => {
    try {
        const blogPosts = await Post.find();
        res.json(blogPosts);
    } catch (e) {
        res.status(500).json({ message: 'error occured' });
    }
});

// CREATE POSTS
router.post('/', async (req, res) => {
    console.log("body", req.body);
    const blogPost = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try {
        const savedPost = await blogPost.save();
        res.status(200).json(savedPost);
    } catch (e) {
        res.status(500).json({ message: 'error occured' });
    }
    // blogPost.save().then(data => {
    //     res.status(200).json(data);
    // }).catch(err => {
    //     console.log("error", err);
    //     res.status(500).json({ message: 'error occured' })
    // })
});

//FETCH SPECIFIC POST
router.get('/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const blogPost = await Post.findById(postId)
        res.json(blogPost);
    } catch (e) {
        res.status(500).json({ message: "error occured" });
    }

});

//DELETE SPECIFIC POST
router.delete('/:id', async (req, res) => {
    try {
        const result = await Post.remove({ _id: req.params.id });
        res.json(result);
    } catch (e) {
        console.log("error", e);
        res.status(500).json({ message: "error occured" });
    }

});

//UPDATE A POST
router.patch('/:id', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne({ _id: req.params.id }, { $set: { title: req.body.title } });
        res.json(updatedPost);
    } catch (e) {
        console.log("error", e);
        res.status(500).json({ message: "error occured" });
    }
})

module.exports = router