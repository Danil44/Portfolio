"use strict";

const galleryItems = [
  {
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

class Gallery {
  constructor({ items, parentNode, defaultActiveItem }) {
    (this._items = items),
      (this._parentNode = parentNode),
      (this._defaulActiveItem = defaultActiveItem);
  }
  createGallery() {
    const defaulFullview = this.createFullviewPicture();
    const previewList = this.createPreviewList();
    this._parentNode.append(defaulFullview, previewList);
  }

  createFullviewPicture() {
    const fullviewContainer = document.createElement("div");
    fullviewContainer.classList.add("fullview");

    const fullviewImg = document.createElement("img");
    fullviewImg.src = this._items[this._defaulActiveItem].fullview;
    fullviewImg.alt = this._items[this._defaulActiveItem].alt;
    return fullviewContainer.appendChild(fullviewImg);
  }

  createPreviewList() {
    // PICTURES===========================================================
    const picturesList = document.createElement("ul");
    picturesList.classList.add("preview");

    this._items.map(item => {
      const listItem = document.createElement("li");
      listItem.classList.add("not-selected");

      const picture = document.createElement("img");
      picture.src = item.preview;
      picture.alt = item.alt;
      picture.dataset.fullview = item.fullview;

      listItem.appendChild(picture);
      picturesList.appendChild(listItem);
    });
    // CLICK EVENTS===========================================================
    picturesList.addEventListener("click", handlePreviewPicture.bind(this));
    function handlePreviewPicture(event) {
      event.preventDefault();
      const fullviewPicture = this._parentNode.firstElementChild;

      const target = event.target;
      if (target.nodeName !== "IMG") return;
      fullviewPicture.src = target.dataset.fullview;
      fullviewPicture.alt = target.alt;

      setActiveLink(target);

      function setActiveLink(nextPicture) {
        const currentPicture = document.querySelector(".selected");
        if (currentPicture) {
          currentPicture.classList.remove("selected");
        }
        nextPicture.classList.add("selected");
      }
    }
    return picturesList;
  }
}
const gallery = new Gallery({
  items: galleryItems,
  parentNode: document.querySelector(".js-image-gallery"),
  defaultActiveItem: 1
});

const secondGallery = new Gallery({
  items: galleryItems,
  parentNode: document.querySelector(".js-second-image-gallery"),
  defaultActiveItem: 3
});
gallery.createGallery();
secondGallery.createGallery();

// const fullviewImg = document.createElement("img");
// fullviewImg.src = galleryItems[0].fullview;
// fullviewImg.alt = galleryItems[0].alt;

// function createFullviewPicture() {
//   const fullviewContainer = document.createElement("div");
//   fullviewContainer.classList.add("fullview");

//   return fullviewContainer.appendChild(fullviewImg);
// }

// const picturesList = document.createElement("ul");
// picturesList.classList.add("preview");

// function createPicture({ preview, fullview, alt }) {
//   const previewImg = document.createElement("img");
//   previewImg.src = preview;
//   previewImg.dataset.fullview = fullview;
//   previewImg.alt = alt;

//   const listItem = document.createElement("li");
//   listItem.classList.add("not-selected");
//   listItem.appendChild(previewImg);
//   picturesList.appendChild(listItem);

//   return picturesList;
// }

// function createGallery(picture) {
//   return picture.map(element => createPicture(element));
// }

// const galleryContainer = document.querySelector(".js-image-gallery");
// const gallery = createGallery(galleryItems);
// galleryContainer.append(createFullviewPicture());
// galleryContainer.append(...gallery);

// // CLICK EVENTS==================================================

// const firstItem = picturesList.firstElementChild;
// const firstPicture = firstItem.querySelector("img");
// firstPicture.classList.add("selected");

// picturesList.addEventListener("click", handlePictureClick);

// function handlePictureClick(event) {
//   event.preventDefault();
//   const target = event.target;
//   if (target.nodeName !== "IMG") return;

//   fullviewImg.src = target.getAttribute("data-fullview");
//   fullviewImg.alt = target.alt;

//   setSelectedPicture(target);
// }
// function setSelectedPicture(nextPicture) {
//   const currentPicture = document.querySelector(".selected");
//   if (currentPicture) {
//     currentPicture.classList.remove("selected");
//   }
//   nextPicture.classList.add("selected");
// }

// <div class="image-gallery js-image-gallery">
//   <div class="fullview">
//     <!-- Если выбран первый элемент из preview -->
//     <img src="img/fullview-1.jpeg" alt="alt text 1">
//   </div>
//   <!-- li будет столько, сколько объектов в массиве картинок. Эти 3 для примера -->
//   <ul class="preview">
//     <li><img src="img/preview-1.jpeg" data-fullview="img/fullview-1.jpeg" alt="alt text 1"></li>
//     <li><img src="img/preview-2.jpeg" data-fullview="img/fullview-2.jpeg" alt="alt text 2"></li>
//     <li><img src="img/preview-3.jpeg" data-fullview="img/fullview-3.jpeg" alt="alt text 3"></li>
//   </ul>
// </div>
