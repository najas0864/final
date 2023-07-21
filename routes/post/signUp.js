import bcrypt from 'bcryptjs';
import DB from '../../database/database.js';
import jwt from 'jsonwebtoken';

const SignUpPost = async (req, res) => {
    const {fullname, gender, phone, dob, relation, email, pass  } = req.body;
    const bpass = await bcrypt.hash(pass, 8);
    if(!fullname||!phone||!email||!pass){return res.render('sign',{title:'Sign-Up',message:'All field required !'})}
    let emailsql = `SELECT * FROM user_info WHERE email = ?`;
    DB.query(emailsql,[email],(err,results)=>{
        if (err) throw err;
        if (results.length>0){ return res.render('sign',{title:'Sign-Up',message:'',error:'Email has already in use.'})
        }else{
            let sql = `INSERT INTO user_info SET ?`;
            DB.query(sql,{name:fullname,dob:dob,gender:gender,status:relation,phone:phone,email:email,pass:bpass},(err,result)=>{
                if(err) throw err;
                if (result) {
                    const id = result.insertId
                    const token = jwt.sign(id,"ahdfrr4%gg+k822m_dd$dd&ffTjYYkmlop")
                    res.cookie('userToken',token,{httpOnly:true});
                    req.session.user = { //for session-cokie.
                        id: result.id,
                        email:email,
                        pass:bpass
                    }
                    console.log(req.session.id);
                    res.redirect('/');
                }
            })
        }
    })
}
export default SignUpPost;