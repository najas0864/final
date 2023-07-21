import jwt from "jsonwebtoken";
import DB from "../database/database.js";
import dotenv from "dotenv";

dotenv.config({path:'./.env'});

const SessionOptions = {
    name:process.env.SESSION_COOKIE_NAME,
    resave:false,
    secret:process.env.SECRET_WORD,
    saveUninitialized:false,
    resave:false,
    cookie:{
        secure:false,
        httpOnly:true,
    },
}

const isAuth = (req, res, next) => {
    const token = req.cookies.userToken;
    if(!token) return res.redirect('/log');
    jwt.verify(token, process.env.SECRET_WORD, (err, decoded)=>{
        if(err) return res.redirect('/log');
        let sql = `SELECT * FROM user_info WHERE id = ?`;
        DB.query(sql,[decoded.userId],(err, data)=>{
            if(err) throw err;
            if(data){
                next();
            }
        });
    });
};
const isLoged = (req, res, next) => {
    const token = req.cookies.userToken;
    if(token){
        jwt.verify(token,process.env.SECRET_WORD,(err, verifyed)=>{
            if(err) throw err;
            console.log(verifyed);
            if (verifyed) return res.redirect('/');
        });
    };
    next();
};
export {SessionOptions, isAuth, isLoged};