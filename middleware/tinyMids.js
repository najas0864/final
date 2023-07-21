import jwt from "jsonwebtoken";
import DB from "../database/database.js";

const SessionOptions = {
    name:'sessionToken',
    resave:false,
    secret:"ahdfrr4%gg+k822m_dd$dd&ffTjYYkmlop",
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
    jwt.verify(token, "ahdfrr4%gg+k822m_dd$dd&ffTjYYkmlop", (err, decoded)=>{
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
        jwt.verify(token,"ahdfrr4%gg+k822m_dd$dd&ffTjYYkmlop",(err, verifyed)=>{
            if(err) throw err;
            console.log(verifyed);
            if (verifyed) return res.redirect('/');
        });
    };
    next();
};
export {SessionOptions, isAuth, isLoged};