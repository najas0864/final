const CreatePost = (req, res) => {
    const {title, files, status} = req.body;
    res.json(title+'\n'+files+'\n'+status);
    res.redirect('/')
}
export default CreatePost;