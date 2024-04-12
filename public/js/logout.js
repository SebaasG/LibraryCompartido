const btnLogOut = document.querySelector(".logout-icon");

btnLogOut.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.replace("../index.html");
  setTimeout(() => {
    window.location.reload();
  }, 1000);
});
