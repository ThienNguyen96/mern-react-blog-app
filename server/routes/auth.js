import express from 'express';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/User.js';
const router = express.Router();

const salt = bcrypt.genSaltSync(10);

//REGISTER
router.post('/register', async(req, res) => {
    try {
        const hashedPass = bcrypt.hashSync(req.body.password, salt);
        const newUser = new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });

        const user = await newUser.save();
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
});

//LOGIN

router.post('/login', async(req, res) => {
    try {
        // const hashedPass = bcrypt.hashSync(req.body.password, salt);
        const user = await UserModel.findOne({username: req.body.username});
        !user && res.status(400).json('Wrong credentials!');

        const validated = await bcrypt.compareSync(req.body.password, user.password);
        !validated && res.status(400).json('Wrong credentials!');

        const {password, ...others} = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(400).json(error);
    }
});

export default router;