console.log(location.pathname); 
const coockieArray = document.cookie.split(';');

coockieArray.forEach((ele) => {
  const [name, value] = ele.split('=');
  if (name !== 'authUser' || isNaN(value)) {
    if(location.pathname.replace(/\//g, '')==="posts.html"){
        location.href = 'index.html';
    }else if(location.pathname.replace(/\//g, '')==="index.html"){
        location.href="posts.html"
    }
  }
});