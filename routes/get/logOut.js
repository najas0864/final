const LogOut = (req, res)=>{
    req.session.destroy((err)=>console.log(err))
    res.clearCookie('sessionToken')
    res.clearCookie('userToken')
    res.redirect('/cover')
}
export default LogOut;