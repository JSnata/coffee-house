// Menu tabs

const loadButtonWrapper = document.querySelector(".load-button-wrapper");
const productList = document.querySelector(".products-list");

const createProductCard = (product, index) => {
  const productCard = document.createElement("li");
  productCard.classList.add("product-card");
  productCard.id = `${product.id}`;

  productCard.addEventListener("click", (event) => {
    id = event.target.closest(".product-card").id;
    renderModal(id);
    modalOpenHandler();
  });

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

  return productCard;
};

const loadButtonClickHandler = (e) => {
  productList.querySelectorAll("li:nth-child(n+5)").forEach((item) => {
    item.style.display = "block";
  });
  e.target.style.display = "none";
}

const showLoadButton = () => {
  loadButtonWrapper.innerHTML = `<button type="button" class="load-button" onclick="loadButtonClickHandler(event)">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="refresh">
      <path id="Ellipse" d="M21.8883 13.5C21.1645 18.3113 17.013 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C16.1006 2 19.6248 4.46819 21.1679 8" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
      <path id="Ellipse_2" d="M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </svg>  
  </button>`;
}

const hideLoadButton = () => {
  loadButtonWrapper.innerHTML = "";
}

const insertTabData = (category) => {
  const filteredData = data.filter((item) => item.category === category);
  productList.innerHTML = "";

  filteredData.forEach((product, index) => {
    const productCard = createProductCard(product, index);
    productList.appendChild(productCard);
  });

  if (window.innerWidth > 768) {
    hideLoadButton();
  }

  if (window.innerWidth <= 768 && filteredData.length > 4) {
    showLoadButton();
  }
};

function handleTabClick(event) {
  const category = event.target.dataset.category;

  const tabButtons = document.querySelectorAll(".menu-tabs .tab-item");
  tabButtons.forEach((button) => {
    button.classList.remove("active");
  });

  const container = event.target.closest(".tab-item");
  container.classList.add("active");
  hideLoadButton();
  insertTabData(category);
}

document.addEventListener("DOMContentLoaded", async () => {
  await fetchData();
  insertTabData("coffee");
});

window.addEventListener("resize", () => {
  const activeButton = document.querySelector(
    ".menu-tabs .tab-item.active button"
  );
  insertTabData(activeButton.dataset.category);
});