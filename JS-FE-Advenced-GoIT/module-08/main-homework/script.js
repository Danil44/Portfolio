"use strict";

const galleryItems = [{
    preview: "img/preview-1.jpeg",
    fullview: "img/fullview-1.jpeg",
    alt: "alt text 1"
  },
  {
    preview: "img/preview-2.jpeg",
    fullview: "img/fullview-2.jpeg",
    alt: "alt text 2"
  },
  {
    preview: "img/preview-3.jpeg",
    fullview: "img/fullview-3.jpeg",
    alt: "alt text 3"
  },
  {
    preview: "img/preview-4.jpeg",
    fullview: "img/fullview-4.jpeg",
    alt: "alt text 4"
  },
  {
    preview: "img/preview-5.jpeg",
    fullview: "img/fullview-5.jpeg",
    alt: "alt text 5"
  },
  {
    preview: "img/preview-6.jpeg",
    fullview: "img/fullview-6.jpeg",
    alt: "alt text 6"
  }
];



const fullviewImg = document.createElement("img");
fullviewImg.src = galleryItems[0].fullview;
fullviewImg.alt = galleryItems[0].alt;

function createFullviewPicture() {
  const fullviewContainer = document.createElement("div");
  fullviewContainer.classList.add("fullview");

  return fullviewContainer.appendChild(fullviewImg);
}

const picturesList = document.createElement("ul");
picturesList.classList.add("preview");

function createPicture({
  preview,
  fullview,
  alt
}) {
  const previewImg = document.createElement("img");
  previewImg.src = preview;
  previewImg.dataset.fullview = fullview;
  previewImg.alt = alt;

  const listItem = document.createElement("li");
  listItem.classList.add("not-selected");
  listItem.appendChild(previewImg);
  picturesList.appendChild(listItem);

  return picturesList;
}

function createGallery(picture) {
  return picture.map(element => createPicture(element));
}

const galleryContainer = document.querySelector(".js-image-gallery");
const gallery = createGallery(galleryItems);
galleryContainer.append(createFullviewPicture());
galleryContainer.append(...gallery);

// CLICK EVENTS==================================================

const firstItem = picturesList.firstElementChild;
const firstPicture = firstItem.querySelector("img");
firstPicture.classList.add("selected");

picturesList.addEventListener("click", handlePictureClick);

function handlePictureClick(event) {
  event.preventDefault();
  const target = event.target;
  if (target.nodeName !== "IMG") return;

  fullviewImg.src = target.getAttribute("data-fullview");
  fullviewImg.alt = target.alt;

  setSelectedPicture(target);
}

function setSelectedPicture(nextPicture) {
  const currentPicture = document.querySelector(".selected");
  if (currentPicture) {
    currentPicture.classList.remove("selected");
  }
  nextPicture.classList.add("selected");
}