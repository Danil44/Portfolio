import tableTpl from '../templates/table.hbs';
import EventEmitter from '../services/event-emitter';
import { ColorPicker } from 'codemirror-colorpicker';
import introJs from 'intro.js';

export default class View extends EventEmitter {
  constructor() {
    super();
    this.saveBtn = document.querySelector('.interface__save-btn');
    this.chartsList = document.querySelector('.charts-list');
    this.paletteOpener = document.querySelector('[data-action="palette"');
    this.chart = document.querySelector('#chart');
    this.chartType = 'pie';
    this.colorpicker = null;
    this.choosedColor = null;
    this.savePDFbtn = document.querySelector('.interface__pdf-btn');
    this.clearBtn = document.querySelector('.interface__clear-btn');
    this.palette = document.querySelector('.interface__color-palette');
  }

  addEventListeners() {
    this.savePDFbtn.addEventListener('click', this.handleSavePDF.bind(this));

    this.chartsList.addEventListener(
      'click',
      this.handleChooseChart.bind(this),
    );

    this.saveBtn.addEventListener('click', this.handleSaveChart.bind(this));

    this.paletteOpener.addEventListener(
      'click',
      this.handleOpenPalette.bind(this),
    );

    this.clearBtn.addEventListener('click', this.handleClear.bind(this));
  }

  handleChooseChart(evt) {
    evt.preventDefault();
    if (evt.target.nodeName === 'LI') {
      this.chartType = evt.target.type;
      setActive(evt.target);
    }
    if (evt.target.nodeName === 'svg' || evt.target.nodeName === 'SPAN') {
      this.chartType = evt.target.parentNode.type;
      setActive(evt.target.parentNode);
    }

    function setActive(target) {
      const currentTarget = document.querySelector('.chart__item--selected');
      if (currentTarget)
        currentTarget.classList.remove('chart__item--selected');
      target.classList.add('chart__item--selected');
    }
  }

  handleSaveChart(evt) {
    evt.preventDefault();

    const labels = Array.from(document.querySelectorAll('[t="s"]'));
    const numbers = Array.from(document.querySelectorAll('[t="n"]'));

    this.emit('add', this.chartType, labels, numbers, this.choosedColor);
  }

  handleOpenPalette(evt) {
    evt.preventDefault();
    this.palette.classList.toggle('color-palette--hide');
  }

  handleClear(evt) {
    evt.preventDefault();
    this.showTable();
    this.emit('clear');
  }

  createColorPalette() {
    this.colorpicker = new ColorPicker({
      position: 'inline',
      container: document.querySelector('.interface__color-palette'),
      type: 'palette',
    });

    this.setPaletteColors(this.colorpicker);

    const colorPalette = document.querySelector('.current-color-sets');

    colorPalette.addEventListener('click', this.handleChooseColor.bind(this));

    const colorChooserBtn = document.querySelector('.menu'); // Default button
    colorChooserBtn.remove(); // Remove default palette button
  }

  handleChooseColor(evt) {
    evt.preventDefault();
    if (evt.target.className !== 'color-item') return;

    this.choosedColor = evt.target.dataset.color;
    this.palette.classList.add('color-palette--hide');

    if (this.choosedColor === null) return;
    this.emit('edit', this.choosedColor);
  }

  setPaletteColors(palette) {
    palette.setColorsInPalette([
      'rgba(237, 28, 36, 1)',
      'rgba(255, 242, 0, 1)',
      'rgba(0, 166, 81, 1)',
      'rgba(0, 174, 239, 1)',
      'rgba(158, 31, 99, 1)',
      'rgba(236, 0, 140, 1)',
      'rgba(190, 30, 45, 1)',
      'rgba(241, 90, 41, 1)',
      'rgba(247, 148, 29, 1)',
      'rgba(251, 176, 64, 1)',
      'rgba(215, 223, 35, 1)',
      'rgba(141, 198, 63, 1)',
      'rgba(57, 181, 74, 1)',
      'rgba(0, 104, 56, 1)',
      'rgba(43, 182, 115, 1)',
      'rgba(0, 167, 157, 1)',
      'rgba(39, 170, 225, 1)',
      'rgba(27, 117, 188, 1)',
      'rgba(43, 57, 144, 1)',
      'rgba(38, 34, 98, 1)',
      'rgba(102, 45, 145, 1)',
      'rgba(146, 39, 143, 1)',
    ]);
  }

  handleSavePDF(evt) {
    evt.preventDefault();
    const chartImg = this.chart.toDataURL('image/png', 1.0);
    this.emit('save', chartImg);
  }

  openPalette() {
    this.palette.classList.toggle('color-palette--hide');
  }

  showTable() {
    const table = tableTpl();
    const tableContainer = document.querySelector('.interface__user-table');
    tableContainer.innerHTML = table;
  }

  startIntro() {
    introJs().start();
  }
}
