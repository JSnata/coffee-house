//fetch data
let data = null;

function fetchData() {
  return fetch("../coffee-house/data/products.json")
    .then((response) => response.json())
    .then((jsonData) => {
      data = jsonData;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

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

// Slider

  const slider = document.querySelector('.slider-block');
  const sliderList = slider.querySelector('.list');
  const slides = slider.querySelectorAll('.slide');
  const buttonNextNode = slider.querySelector('.arrow.--next');
  const buttonPrevNode = slider.querySelector('.arrow.--prev');
  const progressBar = slider.querySelector('.progress-bar');
  const bullets = progressBar.querySelectorAll('.progress-control');


  let currentSlide = 0;

  let slidesLength = slides.length - 1;

// Bullets

  const setBullet = () => {
      bullets.forEach((bullet, index) => {
          if (currentSlide === index) {
              bullet.classList.add('current');
          } else {
              bullet.classList.remove('current');
              bullet.firstElementChild.style.width = '0%';
          }
      });
  }

  const prepareSlider = () => {
  
      slides.forEach((slide, index) => {
          slide.style.transform = `translateX(${index * 100}%)`;
      });

      setBullet();
  }

  const toNextSlide = () => {
      if (currentSlide === slidesLength) {
          currentSlide = 0;
      } else {
          currentSlide++;
      }

      slides.forEach((slide, index) => {
          slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
      });

      progressTime = 0;
      setBullet();
  }

  const toPrevSlide = () => {
      if (currentSlide === 0) {
          currentSlide = slidesLength;
      } else {
          currentSlide--;
      }

      slides.forEach((slide, index) => {
          slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
      });

      progressTime = 0;
      setBullet();
  }

  buttonNextNode.addEventListener('click', () => {
      toNextSlide();
  });
  buttonPrevNode.addEventListener('click', () => {
      toPrevSlide();
  });

  
  //Swipe
  const swipeDistance = 100; // Min swipe distance
  let startSwipe = null;

  const calculateSwipeDirection = (direction) => {
      let difference = startSwipe - direction;

      if (Math.abs(difference) > swipeDistance) {
          difference > 0 ? toNextSlide() : toPrevSlide();

          startSwipe = null;
      }
  }

  sliderList.addEventListener('touchstart', (e) => {
      startSwipe = e.touches[0].clientX;
  });
  sliderList.addEventListener('mousedown', (e) => {
      startSwipe = e.clientX;
  });

  sliderList.addEventListener('touchmove', (e) => {
      if (!startSwipe) {
          return;
      }

      calculateSwipeDirection(e.touches[0].clientX);
  });

  sliderList.addEventListener('mousemove', (e) => {
      if (!startSwipe) {
          return;
      }

      calculateSwipeDirection(e.clientX);
  });

  sliderList.addEventListener('mouseup', () => {
      startSwipe = null;
  });

  // image slider autoplay
  const AUTOPLAY_SPEED = 5000;
  let autoplayInterval;
  let progressPaused = false;
  let progressTime = 0;

  const runAutoPlay = () => {
      autoplayInterval = setInterval(() => {
          if(!progressPaused) {
              progressTime++;

              bullets[currentSlide].firstElementChild.style.width = `${Math.round(progressTime * 2)}%`;

              if (progressTime === AUTOPLAY_SPEED / 100) {
                  bullets[currentSlide].firstElementChild.style.width = `0%`;
                  toNextSlide();
                  progressTime = 0;
              }
          }

      }, 100);
  }


  //stop the image slider autoplay 
  sliderList.addEventListener('mouseover', () => {
      progressPaused = true;
  });

  sliderList.addEventListener('touchstart', () => {
      progressPaused = true;
  });

  //start the image slider autoplay again
  sliderList.addEventListener('mouseout', () => {
      progressPaused = false;
  });

  sliderList.addEventListener('touchend', () => {
      progressPaused = false;
  });


  // Init slider
  prepareSlider();
  runAutoPlay();



