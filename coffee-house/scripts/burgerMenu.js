// Burger menu

const menuToggle = document.querySelector(".nav-toggle-block");
const buttonToggle = document.querySelector(".nav-toggle-button");
const navMenu = document.querySelector(".nav-container");
const links = document.querySelectorAll(".main-nav a");

buttonToggle.addEventListener("click", () => {
  buttonToggle.classList.toggle("close");
  navMenu.classList.toggle("active");
  document.body.classList.toggle("burger-menu-opened");
});

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    navMenu.classList.remove("active");
    buttonToggle.classList.remove("close");
    document.body.classList.remove("burger-menu-opened");
    setTimeout(() => {
      window.location.href = link.href;
    }, 300);
  });
});

window.addEventListener("resize", () => {
  if(window.innerWidth > 768) {
    navMenu.classList.remove("active");
    buttonToggle.classList.remove("close");
    document.body.classList.remove("burger-menu-opened");
  }
});