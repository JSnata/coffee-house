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
const loadButtonWrapper = document.querySelector(".load-button-wrapper");

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

// Menu tabs

const insertTabData = (category, flag) => {
  fetch("../coffee-house/data/products.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const filteredData = data.filter((item) => item.category === category);
      const productList = document.querySelector(".products-list");
      productList.innerHTML = "";

      filteredData.forEach((product, index) => {
        const productCard = document.createElement("li");
        productCard.classList.add("product-card");
        if (window.innerWidth <= 768 && index >= 4) {
          productCard.classList.add("hidden");
        }
        productCard.innerHTML = `
          <div class="img-container">
                  <img src="./assets/img/${product.category}-${
          index + 1
        }.jpg" alt="" >
                </div>
                <div class="content">
                  <h3 class="product-title">${product.name}</h3>
                  <p class="product-description">
                    ${product.description}
                  </p>
                  <p class="product-price">${product.price}</p>
          </div>
          `;
        productList.appendChild(productCard);
      });

      if (window.innerWidth <= 768 && filteredData.length > 4) {
        const loadButtonWrapper = document.querySelector(
          ".load-button-wrapper"
        );
        loadButtonWrapper.innerHTML = `<button type="button" class="load-button">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="refresh">
            <path id="Ellipse" d="M21.8883 13.5C21.1645 18.3113 17.013 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C16.1006 2 19.6248 4.46819 21.1679 8" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
            <path id="Ellipse_2" d="M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
        </svg>  
        </button>`;

        const loadButton = document.querySelector(".load-button");
        loadButton.addEventListener("click", () => {
          productList.querySelectorAll("li:nth-child(n+5)").forEach((item) => {
            item.style.display = "block";
          });
          loadButton.style.display = "none";
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

function handleTabClick(event) {
  const category = event.target.dataset.category;

  const tabButtons = document.querySelectorAll(".menu-tabs .tab-item");
  tabButtons.forEach((button) => {
    button.classList.remove("active");
  });

  event.target.parentNode.classList.add("active");
  
  insertTabData(category, window.innerWidth <= 768);
}

document.addEventListener("DOMContentLoaded", () => {
  insertTabData("coffee", window.innerWidth <= 768);
});
