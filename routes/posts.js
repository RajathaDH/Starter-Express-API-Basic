const express = require('express');

const Post = require('../models/Post');

const router = express.Router();

// get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();

        res.json({ status: 'success', posts });
    } catch (err) {
        console.log(err);
        res.json({ status: 'error', message: 'Internal error' });
    }
});

// get a single post by id
router.get('/:id', async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await Post.findById(postId);

        res.json({ status: 'success', post });
    } catch (err) {
        console.log(err);
        res.json({ status: 'error', message: 'Internal error' });
    }
});

// add new post
router.post('/', async (req, res) => {
    const { title, description } = req.body;

    try {
        const post = new Post({
            title,
            description
        });

        const newPost = await post.save();

        res.json({ status: 'success', post: newPost });
    } catch (err) {
        console.log(err);
        res.json({ status: 'error', message: 'Internal error' });
    }
});

module.exports = router;