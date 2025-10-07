const url = location.pathname.replace(/\//g,""); 
const coockieArray = document.cookie.split(';');

coockieArray.forEach((element) => {
  const [name, value] = element.split('=');
  if (name !== 'authUser' || isNaN(value)) {
    if(location.pathname.replace(/\//g, '')==="posts.html"){
        location.href = 'index.html';
    }else if(name === "authUser"&& !isNaN(value)&&url==="index.html"){
        location.href="posts.html"
    }
  }
});