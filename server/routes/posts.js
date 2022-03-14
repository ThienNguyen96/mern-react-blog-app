import express from 'express';
// import { UserModel } from '../models/User.js';
import { PostModel } from '../models/Post.js';
const router = express.Router();


//Create post
router.post("/", async (req, res) => {
    const newPost = new PostModel(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
});

//Update post

router.put("/:id", async(req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                const updatePost = await PostModel.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, {new: true});
                res.status(200).json(updatePost);
            } catch (error) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json('You can update only your post!');
        }
      } catch (err) {
        res.status(500).json(err);
      }
});

//Delete post

router.delete("/:id", async(req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
               await post.delete();
                res.status(200).json('Post has been deleted.');
            } catch (error) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json('You can delete only your post!');
        }
      } catch (err) {
        res.status(500).json(err);
      }
});

// Get post
router.get("/:id", async(req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(err);
    }
});

//get all posts
router.get("/", async(req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if (username) {
            posts = await PostModel.find({username});
        } else if (catName) {
            posts = await PostModel.find({
                categories: {
                    $in: [catName]
                }
            })
        } else {
            posts = await PostModel.find();
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(err);
    }
});



export default router;