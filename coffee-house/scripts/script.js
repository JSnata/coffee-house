// Burger menu

const menuToggle = document.querySelector(".nav-toggle-block");
const buttonToggle = document.querySelector(".nav-toggle-button");
const navMenu = document.querySelector(".nav-container");
const links = document.querySelectorAll(".main-nav a");

buttonToggle.addEventListener("click", () => {
  buttonToggle.classList.toggle("close");
  navMenu.classList.toggle("active");
  document.body.classList.toggle("popup-opened");
});

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    navMenu.classList.remove("active");
    buttonToggle.classList.remove("close");
    document.body.classList.remove("popup-opened");
    setTimeout(() => {
      window.location.href = link.href;
    }, 300);
  });
});

// Menu modal window

const modalOpenButton = document.getElementById("modalOpenButton");
const modal = document.getElementById("menuModal");
const modalCloseButton = document.getElementById("modalCloseButton");

modalOpenButton.addEventListener("click", () => {
  modal.style.display = "flex";
  document.body.classList.add("popup-opened");
});

modalCloseButton.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.classList.remove("popup-opened");
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
    document.body.classList.remove("popup-opened");
  }
});
