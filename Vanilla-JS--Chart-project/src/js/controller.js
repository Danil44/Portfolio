import EventEmitter from '../services/event-emitter';
import introJs from 'intro.js';

export default class Controller extends EventEmitter {
  constructor(model, view) {
    super();

    this.model = model;
    this.view = view;

    view.on('add', this.addChart.bind(this));
    view.on('save', this.savePDF.bind(this));
    view.on('edit', this.changeColor.bind(this));
    model.on('open', this.openPalette.bind(this));
    view.on('clear', this.clearChart.bind(this));

    view.createColorPalette();
    view.addEventListeners();
    this.startIntro(view, model);

    // model.applyConfigsFromStorage();
  }

  addChart(type, labels, numbers, color) {
    this.model.createChart(type);
    this.model.applyUserConfigs(labels, numbers, color);
  }

  savePDF(chartImg) {
    this.model.savePDF(chartImg);
  }

  clearChart() {
    this.model.clearChart();
  }

  changeColor(color) {
    this.model.changeColor(color);
  }

  openPalette() {
    this.view.openPalette();
  }

  startIntro(view, model) {
    const doneTour = localStorage.getItem('doneTour');
    if (doneTour) return;

    const myIntro = introJs();
    myIntro
      .onchange(function(targetElement) {
        switch (targetElement.dataset.step) {
          case '6':
            view.openPalette();
            break;
          case '9':
            model.showChartExemple();
            break;
        }
      })
      .start();
    myIntro.oncomplete(function() {
      view.openPalette();
      model.clearChart();
      model.destroyChart();
      localStorage.setItem('doneTour', 'doneTour');
    });
    myIntro.onexit(function() {
      localStorage.setItem('doneTour', 'doneTour');
    });
  }
}
