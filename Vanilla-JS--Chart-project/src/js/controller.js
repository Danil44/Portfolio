import EventEmitter from "../services/event-emitter";

export default class Controller extends EventEmitter {
  constructor(model, view) {
    super();

    this.model = model;
    this.view = view;

    view.on("add", this.addChart.bind(this));
    view.on("save", this.savePDF.bind(this));
    view.on("edit", this.changeColor.bind(this));
    model.on("open", this.openPalette.bind(this));
    view.createColorPalette();
    view.addEventListeners();
    view.startIntro();
    // model.applyConfigsFromStorage();
  }

  addChart(type, labels, numbers, color) {
    this.model.createChart(type);
    this.model.applyUserConfigs(labels, numbers, color);
  }

  savePDF(chartImg) {
    this.model.savePDF(chartImg);
  }

  openPalette() {
    this.view.openPalette();
  }

  changeColor(color) {
    this.model.changeColor(color);
  }
}
