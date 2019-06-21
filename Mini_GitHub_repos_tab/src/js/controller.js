import EventEmitter from "./services/event-emmiter";
import "babel-polyfill";

export default class Controller extends EventEmitter {
  constructor(model, view) {
    super();

    this.model = model;
    this.view = view;

    view.on("fetch", this.fetchRepos.bind(this));
    view.on("paginate", this.paginateRepos.bind(this));
    view.on("type-filter", this.filterWithType.bind(this));
    view.on("sort", this.sortReposList.bind(this));
    view.on("reverse", this.reverseReposList.bind(this));
  }

  fetchRepos(name) {
    if (name) {
      this.model.fetchRepos(name).then(data => this.view.showFoundRepos(data));
    }
  }

  paginateRepos() {
    this.model.paginateRepos().then(data => this.view.showFoundRepos(data));
  }

  filterWithType(type) {
    this.model
      .filterWithType(type)
      .then(data => this.view.showFoundRepos(data));
  }

  sortReposList(option) {
    const sortedList = this.model.sortReposList(option);
    this.view.showFoundRepos(sortedList);
  }

  reverseReposList() {
    const reversedData = this.model.reverseReposList();
    if (reversedData.length) this.view.showFoundRepos(reversedData);
  }
}
