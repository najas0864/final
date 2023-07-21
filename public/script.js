const favicon = () =>{
    link = document.createElement('link');
    link.rel = 'icon';
    link.href = 'http://localhost:10000/favicon.ico';
    document.head.appendChild(link);
}
favicon();

if (document.title==='All | Profile'||document.title==='All | Home') {
    let file = document.getElementById('inTag');
    let img = document.getElementById('image');
    file.addEventListener('change',async e=>{img.src=URL.createObjectURL(e.target.files[0])})
}

if (document.title==='All | Profile'){
    const profileImage = document.getElementById('image');
    fetch('/images').then((response) => response.json())
    .then((data) => {
        const latestImagePath = data[data.length-1];
        latestImagePath ? profileImage.src = latestImagePath : profileImage.src = 'me.png';
    }).catch(err=>console.log(err));
}