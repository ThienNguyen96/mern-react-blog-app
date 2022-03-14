import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import multer from 'multer';

import authRoute  from './routes/auth.js';
import userRoute  from './routes/users.js';
import postRoute  from './routes/posts.js';
import categoriesRoute  from './routes/categories.js';
import path from 'path';

dotenv.config();

const app = express();
app.use(express.json());
const __dirname = path.resolve();
app.use('/images', express.static(path.join(__dirname, '/images')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
});

const upload = multer({storage: storage});
app.post('/api/upload', upload.single('file'), (req, res) => {
    res.status(200).json('File has been uploaded');
});


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected')
}).catch((err) => {
    console.log('Error', err)
});

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/categories', categoriesRoute);

app.listen("5000", () => {
    console.log('BE is running...');
});