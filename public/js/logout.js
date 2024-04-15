
const btnLogOut = document.querySelector(".logout-icon");

btnLogOut.addEventListener('click',()=>{
  setTimeout(()=> {
    window.open("about:blank", "_self").close();
  }, 2);
})
