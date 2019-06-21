import { fetchRepos } from "./services/fetch";
import * as sort from "./services/sort";
export default class Model {
  constructor() {
    this.pageToPaginate = 1;
    this.searchName = "";
    this.fetchedRepos = [];
    this.reposList = [];
    this.filter = {
      type: ""
    };
    this.sortOption = "name";
  }

  fetchRepos(name) {
    this.searchName = name;
    return fetchRepos(name).then(data => {
      this.fetchedRepos = data;
      this.reposList = data;
      return data;
    });
  }

  paginateRepos() {
    return fetchRepos(this.searchName, (this.pageToPaginate += 1)).then(
      nextData => {
        this.fetchedRepos.push(...nextData);
        return this.reposList;
      }
    );
  }

  filterWithType(type = "all") {
    this.filter.type = type;
    return new Promise((res, rej) => {
      if (type === "forks") {
        res((this.reposList = this.reposList.filter(item => item.fork)));
      } else {
        this.reposList = this.fetchedRepos;
        res(this.fetchedRepos);
      }
    });
  }

  sortReposList(option) {
    if (option !== this.sortOption) {
      this.sortOption = option;
      switch (option) {
        case "name":
          return sort.sortStrings(this.reposList, "name");
        case "stars":
          sort.sortNumbers(this.reposList, "stars");
        default:
          return this.reposList;
      }
    } else {
      return this.reposList;
    }
  }

  reverseReposList() {
    return this.reposList.reverse();
  }
}
