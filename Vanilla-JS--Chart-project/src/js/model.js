import * as storage from "../services/storage";
import EventEmitter from "../services/event-emitter";
import * as jsPDF from "jspdf";
import XLSX from "xlsx";
import Chart from "chart.js";
import ChartDataLabels from "../../node_modules/chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels.js";

export default class Model extends EventEmitter {
  constructor() {
    super();

    this.chartContainer = document.getElementById("chart");
    this.inputExcelBtn = document.getElementById("input-excel");
    this.tableContainer = document.querySelector(".interface__user-table");
    this.configs = []; // for a localStorage
    this.colors = [];
    this.chartElement = null;

    this.inputExcelBtn.addEventListener(
      "change",
      this.handleAddExcelFile.bind(this)
    );
    this.chartContainer.addEventListener(
      "click",
      this.handleOpenPalette.bind(this)
    );
  }

  createChart(type = "pie", color) {
    if (this.chart !== undefined) {
      this.chart.destroy();
    }
    Chart.defaults.global.plugins.datalabels.font.size = 20;

    this.chart = new Chart(this.chartContainer, {
      type: `${type}`,
      data: {
        labels: [],
        datasets: [
          {
            label: "# of Votes",
            backgroundColor: [
              "rgba(237, 28, 36, 1)",
              "rgba(255, 242, 0, 1)",
              "rgba(0, 166, 81, 1)"
            ],
            hoverBackgroundColor: [],
            hoverBorderColor: [],
            borderColor: "#ffffff",
            data: [10, 15, 35],
            borderWidth: 1,
            fill: false
          }
        ]
      },
      plugins: [ChartDataLabels],
      options: {
        legend: {
          position: "right",
          labels: {
            fontSize: 14
          }
        },
        plugins: {
          datalabels: {
            color: "#ffffff",
            fontSize: 40
          }
        },
        scales: {}
      }
    });
  }

  applyUserConfigs(labels, numbers, color) {
    numbers.forEach(num => {
      if (num.textContent === "" || num.textContent === undefined) return;
      this.chart.data.datasets[0].data.push(+num.textContent);
    });

    labels.forEach(str => {
      if (str.textContent === "" || str.textContent === undefined) return;
      this.chart.data.labels.push(str.textContent);
    });

    if (this.chart.data.labels.length === 0) {
      return alert("Fill the first field!");
    }

    if (this.chart.data.datasets[0].data.length === 0) {
      return alert("Fill the second field!");
    }

    this.colors.push(color);
    this.colors.forEach(color => {
      this.chart.data.datasets[0].backgroundColor.push(color);

      this.chart.data.datasets[0].hoverBackgroundColor.push(color);
    });

    if (
      this.chart.config.type !== "pie" &&
      this.chart.config.type !== "doughnut"
    ) {
      this.chart.options.scales = {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              callback: function(value) {
                return value + "%";
              }
            }
          }
        ]
      };
    }
    // this.setConfigsToStorage(
    //   this.chart.config.type,
    //   this.chart.data.labels,
    //   this.chart.data.datasets[0].data,
    //   this.chart.data.datasets[0].backgroundColor
    // );

    this.chart.update();
  }

  handleAddExcelFile(e) {
    const rABS = true; // true: readAsBinaryString ; false: readAsArrayBuffer
    const files = e.target.files,
      f = files[0];

    const reader = new FileReader();

    reader.onload = function(e) {
      const data = reader.result;
      if (!rABS) data = new Uint8Array(data);
      const workbook = XLSX.read(data, { type: rABS ? "binary" : "array" });

      const htmlstr = XLSX.write(workbook, {
        sheetName: "sheet1",
        type: "binary",
        bookType: "html",
        editable: true
      });
      const tableContainer = document.querySelector(".interface__user-table");
      tableContainer.innerHTML = htmlstr;
    };
    if (rABS) reader.readAsBinaryString(f);
    else reader.readAsArrayBuffer(f);

    const filesName = document.querySelector(".file-name");
    filesName.textContent = files[0].name;
    console.log(files[0].name);
  }

  savePDF(chartImg) {
    const doc = new jsPDF("a4");
    doc.addImage(chartImg, "PNG", 10, 10);
    doc.save("chart.pdf");
  }

  getChartElement(evt) {
    return this.chart.getElementAtEvent(evt);
  }

  handleOpenPalette(evt) {
    evt.preventDefault();
    this.emit("open");
    this.chartElement = this.chart.getElementAtEvent(evt);
  }

  changeColor(color) {
    if (this.chartElement === null) return;
    const selectedElement = this.chartElement[0];
    const index = selectedElement._index;

    //Changing color
    this.colors[index] = color;
    this.chart.data.datasets[0].backgroundColor[index] = color;
    this.chart.data.datasets[0].hoverBackgroundColor[index] = color;

    this.chart.update();

    // //  setting new color to storage
    // const colorInStorage = this.configs[3];
    // colorInStorage[index] = color;
    // storage.set(this.configs);
  }

  destroyChart() {
    this.chart.destroy();
  }

  // showTableFromStorage(labels, numbers) {
  //   const labelsCell = Array.from(document.querySelectorAll('[t="s"]'));
  //   const numbersCell = Array.from(document.querySelectorAll('[t="n"]'));
  //   labels.forEach(label => {
  //     labelsCell.forEach(cell => cell.textContent = label)
  //   })
  // }

  // setConfigsToStorage(type, labels, numbers, colors) {
  //   this.configs[0] = type;
  //   this.configs[1] = labels;
  //   this.configs[2] = numbers;
  //   this.configs[3] = colors;

  //   storage.set(this.configs);
  // }

  // applyConfigsFromStorage() {
  //   storage.get() ? (this.configs = storage.get()) : [];
  //   const type = this.configs[0];
  //   const labels = this.configs[1];
  //   const numbers = this.configs[2];
  //   const colors = this.configs[3];

  //   this.createChart(type, labels, numbers, colors);

  //   if (this.configs.length === 0) return;

  //   this.chart.config.type = type;
  //   labels.forEach(label => this.chart.data.labels.push(label));
  //   numbers.forEach(number => this.chart.data.datasets[0].data.push(number));
  //   colors.forEach(color => {
  //     this.chart.data.datasets[0].backgroundColor.push(color);
  //     this.chart.data.datasets[0].hoverBackgroundColor.push(color);
  //   });

  //   // this.showTableFromStorage(labels, numbers);
  //   this.chart.update();
  // }
}
