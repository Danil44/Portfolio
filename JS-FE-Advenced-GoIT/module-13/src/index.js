// import Model from "./js/model";
// import View from "./js/view";
// import Controller from "./js/controller";

// const model = new Model();
// const view = new View();
// new Controller(model, view);

import "./reset.css";
import "./scss/basics.scss";
import "./scss/variables.scss";
import "./scss/components/container.scss";
import Chart from "chart.js";
import { ColorPicker } from "codemirror-colorpicker";
import * as jsPDF from "jspdf";
import html2canvas from "html2canvas";
window.html2canvas = html2canvas;

const form = document.querySelector("form");
const nameInput = form.querySelector("input[name='name']");
const numberInput = form.querySelector("input[name='number']");

const CHART = document.getElementById("pie-chart");
let pieChart = new Chart(CHART, {
  type: "pie",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [20, 5, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
          "rgba(255, 159, 64)"
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        borderWidth: 1
      }
    ]
  },
  options: {
    responsive: true,
    legend: {
      position: "right",
      labels: {
        fontSize: 14,
        usePointStyle: true,
        pointStyle: "cross"
      }
    }
  }
});

const colorpicker = new ColorPicker({
  position: "inline",
  container: document.getElementById("color-container"),
  type: "palette"
});

const saveBtn = document.querySelector(".save-pdf");

const doc = new jsPDF("a4");

saveBtn.addEventListener("click", savePdf);

function savePdf(evt) {
  evt.preventDefault();
  const newCanvas = document.querySelector("#pie-chart");
  const newCanvasImg = newCanvas.toDataURL("image/png", 1.0);
  doc.addImage(newCanvasImg, "PNG", 10, 10);
  doc.save("new-canvas.pdf");
}

const colorChooserBtn = document.querySelector(".menu"); // Default button
colorChooserBtn.remove(); // Remove default palette button

let choosedColor;

const palette = document.querySelector(".palette");
palette.addEventListener("click", handleGetColor);
function handleGetColor(evt) {
  evt.preventDefault();
  choosedColor = evt.target.title;
}

form.addEventListener("submit", evt => {
  evt.preventDefault();
  addNewItem(nameInput.value, +numberInput.value);
  form.reset();
});

function addNewItem(name, value) {
  if (choosedColor === null) return;
  pieChart.data.datasets[0].backgroundColor.push(choosedColor);
  pieChart.data.labels.push(name);
  pieChart.data.datasets[0].data.push(value);
  pieChart.update();
}
