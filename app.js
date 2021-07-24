const galleryItems = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

const gallery = document.querySelector(".gallery");
const lightBox = document.querySelector(".js-lightbox");
const lightOverlay = document.querySelector(".lightbox__overlay");
const lightImage = document.querySelector(".lightbox__image");
const closeBtn = document.querySelector(
  '.js-lightbox button[data-action="close-lightbox"]'
);
let currentItem;

// Подзадача_1
// Создание и рендер разметки по массиву данных galleryItems из app.js
// и предоставленному шаблону.
const galleryCollections = galleryItems.reduce(
  (add, { preview, original, description }) => {
    return (
      add +
      `<li class="gallery__item"><a class="gallery__link" href=${original}><img class="gallery__image"
      src=${preview}
      data-source=${original}
      alt='${description}'/></a></li>`
    );
  },
  ""
);
gallery.insertAdjacentHTML("afterbegin", galleryCollections);

// Подзадача_2
// Реализация делегирования на галерее ul.js - gallery и получение url
// большого изображения.
gallery.addEventListener("click", pushClick);

function pushClick(event) {
  event.preventDefault();
  const galleryTarget = event.target;
  console.log("event target:", galleryTarget);
  if (galleryTarget.nodeName !== "IMG") {
    return;
  }

  // Подзадача_3
  // Открытие модального окна по клику на элементе галереи.
  lightBox.classList.add("is-open");

  // Подзадача_4
  // Подмена значения атрибута src элемента img.lightbox__image
  lightImage.src = galleryTarget.dataset.source;
  //   currentItem = +galleryTarget.dataset.index;
  //   window.addEventListener("keydown", onArrowLeft);
  //   window.addEventListener("keydown", onArrowRight);
}

// Подзадача_5
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
closeBtn.addEventListener("click", closeModal);

function closeModal() {
  lightBox.classList.remove("is-open");
  // Подзадача_6
  // Очистка значения атрибута src элемента img.lightbox__image. Это необходимо
  // для того, чтобы при следующем открытии модального окна, пока грузится
  // изображение, мы не видели предыдущее.
  lightImage.src = "";
  lightImage.alt = "";
  window.removeEventListener("keydown", keyPress);
  //   window.removeEventListener('keydown', onArrowLeft);
  //   window.removeEventListener('keydown', onArrowRight);
}

// Доп_1
// Закрытие модального окна по клику на div.lightbox__overlay.
lightOverlay.addEventListener("click", overlayClick);
function overlayClick() {
  closeModal();
}

// Доп_2
// Закрытие модального окна по нажатию клавиши ESC.
const esc = document.querySelector("body");
esc.addEventListener("keydown", keyPress);
function keyPress(event) {
  const ESC_KEY_CODE = "Escape";
  const escKey = event.code === ESC_KEY_CODE;

  if (escKey) {
    closeModal();
  }
}

// Доп_3
// Пролистывание изображений галереи в открытом модальном окне
// клавишами "влево" и "вправо"
function onArrowRight(event) {
  if (event.code === "ArrowRight") {
    if (currentItem + 1 > galleryItems.length - 1) {
      currentItem = 0;
    } else {
      currentItem += 1;
    }
    lightImage.src = galleryItems[currentItem].original;
    lightImage.alt = galleryItems[currentItem].description;
  }
}
