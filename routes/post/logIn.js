import bcrypt from 'bcryptjs';
import DB from '../../database/database.js';
import jwt from 'jsonwebtoken';

const LoginPost = (req, res) => {
    const { email, password } = req.body;
    if(!email||!password){return res.render('log',{title:'Log-In',message:'All field required !'})}

    let sql = 'SELECT * FROM user_info WHERE email = ?';
    DB.query(sql, [email],(err, results)=>{
        if (err) throw err;
        if(results.length === 0){ return(res.render('log',{title:'Log-In',message:'Incorrect email addresh !'}))
        }else{
            bcrypt.compare(password,results[0].pass, (err,result)=>{
                if(err) throw err;
                if(result){
                    const token = jwt.sign({userID:results[0].id},'ahdfrr4%gg+k822m_dd$dd&ffTjYYkmlop');
                    res.cookie('userToken',token,{httpOnly:true});
                    req.session.user = { //for session-cokie.
                        id: result.id,
                        email:email,
                        pass:results[0].pass
                    };
                    console.log(req.session.id);
                    res.redirect('/');
                }else{
                    res.render('log',{title:'Log-In',message:'Incorrect Password !'});
                }
            })
        }
    })
}
export default LoginPost;