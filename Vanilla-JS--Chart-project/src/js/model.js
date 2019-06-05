import * as storage from '../services/storage';
import EventEmitter from '../services/event-emitter';
import * as jsPDF from 'jspdf';
import XLSX from 'xlsx';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.plugins.unregister(ChartDataLabels);

export default class Model extends EventEmitter {
  constructor() {
    super();

    this.chartContainer = document.getElementById('chart');
    this.inputExcelBtn = document.getElementById('input-excel');
    this.tableContainer = document.querySelector('.interface__user-table');
    this.data = [];
    this.configs = []; // for a localStorage
    this.colors = [];
    this.chartElement = null;

    this.inputExcelBtn.addEventListener(
      'change',
      this.handleAddExcelFile.bind(this),
    );
    this.chartContainer.addEventListener(
      'click',
      this.handleOpenPalette.bind(this),
    );
  }

  createChart(type = 'pie') {
    if (this.chart !== undefined) {
      this.chart.destroy();
    }
    Chart.defaults.global.plugins.datalabels.font.size = 12;
    const colors = this.colors;

    this.chart = new Chart(this.chartContainer, {
      type: `${type}`,
      data: {
        labels: [],
        datasets: [
          {
            label: '# of Votes',
            backgroundColor: colors,
            hoverBackgroundColor: colors,
            hoverBorderColor: colors,
            borderColor: colors,
            data: this.data,
            fill: false,
            showLine: true,
          },
        ],
      },
      plugins: [ChartDataLabels],
      options: {
        responsive: true,
        legend: {
          display: true,
          position: 'right',
        },
        plugins: {
          datalabels: {
            backgroundColor: function (context) {
              return context.dataset.backgroundColor;
            },
            borderColor: 'white',
            borderRadius: 5,
            align: 'center',
            borderWidth: 2,
            color: 'white',
            display: function (context) {
              var dataset = context.dataset;
              var count = dataset.data.length;
              var value = dataset.data[context.dataIndex];
              return value > count * 1.5;
            },
            font: {
              weight: 'normal',
            },
            formatter: Math.round,
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                max: Math.max.apply(null, this.data) + 1,
              },
            },
          ],
        },
      },
    });
  }

  applyUserConfigs(labels, numbers, color) {
    numbers.forEach(num => {
      if (num.textContent.trim()) {
        this.data.push(+num.textContent);
      }
    });

    labels.forEach(str => {
      if (str.textContent === '' || str.textContent === undefined) return;
      this.chart.data.labels.push(str.textContent);
    });

    if (this.chart.data.labels.length === 0) {
      return alert('Fill the first field!');
    }

    if (this.chart.data.datasets[0].data.length === 0) {
      return alert('Fill the second field!');
    }

    this.colors.push(color);

    if (
      this.chart.config.type !== 'pie' &&
      this.chart.config.type !== 'doughnut'
    ) {
      this.chart.options.scales = {
        yAxes: [
          {
            ticks: {
              callback: function (value) {
                return value + '%';
              },
            },
          },
        ],
      };
    }
    this.chart.update();
    this.data = [];
  }

  handleAddExcelFile(e) {
    const rABS = true; // true: readAsBinaryString ; false: readAsArrayBuffer
    const files = e.target.files,
      f = files[0];

    const reader = new FileReader();

    reader.onload = function (e) {
      const data = reader.result;
      if (!rABS) data = new Uint8Array(data);
      const workbook = XLSX.read(data, { type: rABS ? 'binary' : 'array' });

      const htmlstr = XLSX.write(workbook, {
        sheetName: 'sheet1',
        type: 'binary',
        bookType: 'html',
        editable: true,
      });
      const tableContainer = document.querySelector('.interface__user-table');
      tableContainer.innerHTML = htmlstr;
    };
    if (rABS) reader.readAsBinaryString(f);
    else reader.readAsArrayBuffer(f);

    const filesName = document.querySelector('.file-name');
    filesName.textContent = files[0].name;
    console.log(files[0].name);
  }

  savePDF(chartImg) {
    const doc = new jsPDF('a4');
    doc.addImage(chartImg, 'PNG', 10, 10);
    doc.save('chart.pdf');
  }

  handleOpenPalette(evt) {
    evt.preventDefault();
    this.emit('open');
    this.chartElement = this.chart.getElementAtEvent(evt);
  }

  changeColor(color) {
    if (this.chartElement === null) return;
    const selectedElement = this.chartElement[0];
    const index = selectedElement._index;

    //Changing color
    this.colors[index] = color;

    this.chartElement = null; // Reseting choosed chart part to null

    this.chart.update();
  }

  destroyChart() {
    this.chart.destroy();
  }

  clearChart() {
    this.colors = [];
    this.data = [];
    this.destroyChart()
  }

  showChartExemple() {
    this.createChart();
    this.colors = [
      'rgba(237, 28, 36, 1)',
      'rgba(255, 242, 0, 1)',
      'rgba(0, 166, 81, 1)',
    ];
    this.data = [10, 15, 35];
    this.chart.update();
  }
}
