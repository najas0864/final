const Verifycation = (req, res) => {
    const linkedInfo = req.body.emailContact;
    res.json(linkedInfo===''?'value is empty':linkedInfo)
    res.redirect('/forgetPass');
}
export default Verifycation;