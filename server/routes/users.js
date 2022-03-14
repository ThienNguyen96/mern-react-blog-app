import express from 'express';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/User.js';
import { PostModel } from '../models/Post.js';
const router = express.Router();


//Update
router.put('/:id', async(req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = bcrypt.genSaltSync(10);
            req.body.password = await bcrypt.hashSync(req.body.password, salt);
        }
        try {
            const updateUser = await UserModel.findByIdAndUpdate(req.params.id, {
               $set: req.body 
            }, {new: true});
            res.status(200).json(updateUser);
        } catch (error) {
            res.status(400).json(error);
        }
    } else {
        res.status(401).json('You can update only your account!');
    }
});

//Update
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
      try {
        const user = await UserModel.findById(req.params.id);
        try {
            //delete the post related to this user
          await PostModel.deleteMany({ username: user.username });
          await UserModel.findByIdAndDelete(req.params.id);
          res.status(200).json("User has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
      } catch (err) {
        res.status(404).json("User not found!");
      }
    } else {
      res.status(401).json("You can delete only your account!");
    }
});

//GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});


export default router;