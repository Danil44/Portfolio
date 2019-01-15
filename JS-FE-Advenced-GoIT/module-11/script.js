"use strict";
const laptops = [
  {
    size: 13,
    color: "white",
    price: 28000,
    release_date: 2015,
    name: 'Macbook Air White 13"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 13,
    color: "gray",
    price: 32000,
    release_date: 2016,
    name: 'Macbook Air Gray 13"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 13,
    color: "black",
    price: 35000,
    release_date: 2017,
    name: 'Macbook Air Black 13"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 15,
    color: "white",
    price: 45000,
    release_date: 2015,
    name: 'Macbook Air White 15"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 15,
    color: "gray",
    price: 55000,
    release_date: 2016,
    name: 'Macbook Pro Gray 15"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 15,
    color: "black",
    price: 45000,
    release_date: 2017,
    name: 'Macbook Pro Black 15"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 17,
    color: "white",
    price: 65000,
    release_date: 2015,
    name: 'Macbook Air White 17"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 17,
    color: "gray",
    price: 75000,
    release_date: 2016,
    name: 'Macbook Pro Gray 17"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 17,
    color: "black",
    price: 80000,
    release_date: 2017,
    name: 'Macbook Pro Black 17"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  }
];
const filter = {
  size: [],
  color: [],
  release_date: []
};
const filterForm = document.querySelector(".js-form");
const checkBoxes = Array.from(filterForm.querySelectorAll("input"));
const UNDEFINED_QUERY = `<p class="product__not-found">Sorry, no matches were found for your query.</p>`;
const productCardSource = document
  .querySelector("#product-item")
  .innerHTML.trim();
const template = Handlebars.compile(productCardSource);
const productsList = document.querySelector(".products__list");
const defaultMarkup = template(laptops);
productsList.insertAdjacentHTML("afterbegin", defaultMarkup);

filterForm.addEventListener("submit", handleFilterBtn);
filterForm.addEventListener("reset", handleFilterBtn);

function handleFilterBtn(evt) {
  evt.preventDefault();
  filter.size = [];
  filter.color = [];
  filter.release_date = [];
  if (evt.type === "submit") {
    pushCheckboxes();
    filterProducts();
    showProducts();
  }
  if (evt.type === "reset") return clearCheckboxes();
}

function pushCheckboxes() {
  return checkBoxes.filter(box => {
    if (box.checked) filter[box.name].push(box.value);
  });
}

function applyCheckedFields(laptopParam, filterParam) {
  return filterParam.length === 0
    ? true
    : filterParam.includes(String(laptopParam));
}

function filterProducts() {
  return laptops
    .filter(laptop => applyCheckedFields(laptop.size, filter.size))
    .filter(laptop => applyCheckedFields(laptop.color, filter.color))
    .filter(laptop =>
      applyCheckedFields(laptop.release_date, filter.release_date)
    );
}

function showProducts() {
  const filteredMarkup = template(filterProducts);
  if (filteredMarkup === "") {
    productsList.innerHTML = UNDEFINED_QUERY;
  } else {
    productsList.innerHTML = filteredMarkup;
  }
}

function clearCheckboxes() {
  filter.size = [];
  filter.color = [];
  filter.release_date = [];
  checkBoxes.forEach(box => (box.checked ? (box.checked = false) : null));
  productsList.innerHTML = defaultMarkup;
}
