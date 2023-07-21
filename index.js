import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import multer from 'multer';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import Home from './routes/get/home.js';
import LogIn from './routes/get/logIn.js';
import Profile from './routes/get/profile.js';
import ResetPassword from './routes/get/resetPassword.js';
import SignUp from './routes/get/signUp.js';
import Cover from './routes/get/cover.js';
import LogOut from './routes/get/logOut.js';
import CreatePost from './routes/post/createPost.js';
import LoginPost from './routes/post/logIn.js';
import SignUpPost from './routes/post/signUp.js';
import Verifycation from './routes/post/verifycation.js';
import { SessionOptions, isAuth, isLoged } from './middleware/tinyMids.js';
import DB from './database/database.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        const fileName = Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    }
});
const upload = multer({ storage: storage });

const app = express();
dotenv.config({path:'./.env'});
const port = process.env.PORT || 20000;

app.use(cookieParser());
app.use(express.json());
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(session(SessionOptions));

app.get('/',isAuth, Home);
app.get('/cover', Cover);
app.get('/sign',isLoged, SignUp);
app.get('/log',isLoged, LogIn);
app.get('/profile',isAuth, Profile);
app.get('/log_out', LogOut);
app.get('/resetPass', ResetPassword);

app.get('/uploads/:filename', (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, 'uploads', filename);
    res.sendFile(imagePath);
});
app.get('/images', (req, res) => {
    const sql = 'SELECT path FROM image';
    DB.query(sql, (err, results) => {
        if (err) throw err;
        const imagePaths = results.map((row) => row.path);
        res.json(imagePaths);
    });
});
app.post('/upload',upload.single('profileImage'),(req,res)=>{
    if (!req.file||!req.file.path){return res.render('profile',{title:'Profile',errMsg:'First select image to upload.'})}
    const filepath = req.file.path;
    const path = [filepath];
    const sql = `INSERT INTO image SET ?`;
    DB.query(sql, {path:path}, (error) => {
        if (error) throw error;
        res.redirect('/profile');
    });
})
app.post('/logIn', LoginPost);
app.post('/signUp', SignUpPost);
app.post('/createPost', CreatePost);;
app.post('/identityVeryfication',isAuth, Verifycation);

app.use((req,res)=>res.status(404).render('404',{title:'Page not found!!'}));
app.listen(port,()=>console.log(`http://localhost:${port}`));