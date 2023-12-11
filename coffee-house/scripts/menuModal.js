// Menu modal window

let popupPrice = 0;
let sizeCounter = 0;
let additivesCounter = 0;

const modal = document.getElementById("menuModal");

const modalOpenHandler = () => {
  modal.style.display = "flex";
  document.body.classList.add("popup-opened");
};

const modalCloseHandler = () => {
  modal.style.display = "none";
  document.body.classList.remove("popup-opened");
  popupPrice = 0;
  sizeCounter = 0;
  additivesCounter = 0;
};

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modalCloseHandler();
  }
});

const renderModal = async (id) => {
  const popupData = await data.filter((item) => item.id === +id);
  popupPrice = Number(popupData[0].price);

  modal.innerHTML = `
  <div class="menu-modal-container">
  <div class="img-container">
    <img src="./assets/img/${popupData[0].image}.jpg" alt="" >
  </div>
  <div class="content">
    <h3 class="product-title">${popupData[0].name}</h3>
    <p class="product-description">
    ${popupData[0].description}
    </p>
    <div class="tabs size-tabs">
      <p class="tab-title">Size</p>
      <ul class="tabs-list">
        <li class="tab-item active"><button type="button" data-value="${popupData[0].sizes.s["add-price"]}" onclick="handleProductSizeClick(event)"><span>S</span>${popupData[0].sizes.s.size}</button></li>
        <li class="tab-item"><button type="button" data-value="${popupData[0].sizes.m["add-price"]}" onclick="handleProductSizeClick(event)"><span>M</span>${popupData[0].sizes.m.size}</button></li>
        <li class="tab-item"><button type="button" data-value="${popupData[0].sizes.l["add-price"]}" onclick="handleProductSizeClick(event)"><span>L</span>${popupData[0].sizes.l.size}</button></li>
      </ul>
    </div>
    <div class="tabs additives-tabs">
      <p class="tab-title">Additives</p>
      <ul class="tabs-list">
        <li class="tab-item"><button type="button" data-value="${popupData[0].additives[0]["add-price"]}" onclick="handleProductAdditivesClick(event)"><span>1</span>${popupData[0].additives[0].name}</button></li>
        <li class="tab-item"><button type="button" data-value="${popupData[0].additives[1]["add-price"]}" onclick="handleProductAdditivesClick(event)"><span>2</span>${popupData[0].additives[1].name}</button></li>
        <li class="tab-item"><button type="button" data-value="${popupData[0].additives[2]["add-price"]}" onclick="handleProductAdditivesClick(event)"><span>3</span>${popupData[0].additives[2].name}</button></li>
      </ul>
    </div>
    <p class="product-price"><span>Total:</span><span>${popupData[0].price}</span></p>
    <div class="alert">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <g clip-path="url(#clip0_268_12877)">
          <path d="M8 7.66663V11" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8 5.00667L8.00667 4.99926" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7.99967 14.6667C11.6816 14.6667 14.6663 11.6819 14.6663 8.00004C14.6663 4.31814 11.6816 1.33337 7.99967 1.33337C4.31778 1.33337 1.33301 4.31814 1.33301 8.00004C1.33301 11.6819 4.31778 14.6667 7.99967 14.6667Z" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <defs>
          <clipPath id="clip0_268_12877">
            <rect width="16" height="16" fill="white"/>
          </clipPath>
        </defs>
      </svg>
        <p>
          The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.
        </p>            
      </div>
    <button class="button-secondary" id="modalCloseButton" onClick="modalCloseHandler()">Close</button>
  </div>
</div>
  `;
};

const handleProductSizeClick = (e) => {
  if (e.target.closest(".tab-item").classList.contains("active")){
    return;
  }

  const sizeButtons = document.querySelectorAll(".size-tabs .tab-item");
  const currentPrice = document.querySelector('.menu-modal .product-price span:nth-child(2)');

  sizeButtons.forEach((button) => {
    button.classList.remove("active");
  });

  const container = e.target.closest(".tab-item");
  container.classList.add("active");

  const currentValue = sizeCounter = Number(e.target.dataset.value);

  currentPrice.innerHTML = `${(popupPrice + currentValue + additivesCounter).toFixed(2)}`;

}

const handleProductAdditivesClick = (e) => {
  const currentPrice = document.querySelector('.menu-modal .product-price span:nth-child(2)');

  e.target.closest(".tab-item").classList.toggle("active");

  const currentValue = Number(e.target.dataset.value);

  if (e.target.closest(".tab-item").classList.contains("active")){
    additivesCounter += currentValue; 
  } else {
    additivesCounter -= currentValue;
  };

  currentPrice.innerHTML = `${(popupPrice + additivesCounter + sizeCounter).toFixed(2)}`;
}