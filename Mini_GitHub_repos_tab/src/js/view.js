import EventEmitter from "./services/event-emmiter";
import Handlebars from "handlebars";
import "../templates/repos-card";
import { format } from "timeago.js";

export default class View extends EventEmitter {
  constructor() {
    super();

    this.reposSearchContainer = document.querySelector(
      ".js-repo-search-container"
    );
    this.searchForm = this.reposSearchContainer.querySelector(
      ".js-search-form"
    );
    this.reposPaginationBtn = this.reposSearchContainer.querySelector(
      ".js-repos-pagination"
    );

    this.filterForm = this.reposSearchContainer.querySelector(
      ".js-repo-type-filter"
    );

    this.sortForm = this.reposSearchContainer.querySelector(".js-repo-sort");
    this.handleAddEventListener();
  }

  handleAddEventListener() {
    this.searchForm.addEventListener(
      "submit",
      this.handleFetchRepos.bind(this)
    );
    this.reposPaginationBtn.addEventListener(
      "click",
      this.handlePagination.bind(this)
    );
    this.filterForm.addEventListener(
      "click",
      this.handleFilterWithType.bind(this)
    );
    this.sortForm.addEventListener(
      "click",
      this.handleSortReposList.bind(this)
    );
  }

  handleFetchRepos(evt) {
    evt.preventDefault();

    const nameSearch = this.searchForm.querySelector("input").value;

    this.emit("fetch", nameSearch);
  }

  handlePagination(evt) {
    evt.preventDefault();

    this.emit("paginate");
  }

  showFoundRepos(data) {
    const container = this.reposSearchContainer.querySelector(
      ".js-search-result"
    );
    container.innerHTML = "";

    const source = document
      .getElementById("searched-repos-item")
      .innerHTML.trim();

    const template = Handlebars.compile(source);

    const markup = data.reduce(
      (
        acc,
        {
          name,
          updatedDate,
          fork,
          stars,
          description,
          language,
          repoUrl,
          owner
        }
      ) =>
        acc +
        template({
          name,
          originalDate: updatedDate,
          updatedDate: format(updatedDate),
          fork,
          stars,
          description,
          language,
          repoUrl,
          owner: owner.login,
          ownerUrl: owner.html_url
        }),
      ""
    );

    container.insertAdjacentHTML("afterbegin", markup);

    if (data.length === 12) {
      showPaginationBtn();
    } else {
      hidePaginationBtn();
    }

    function showPaginationBtn() {
      const btn = document.querySelector(".js-repos-pagination");

      btn.classList.remove("hidden");
    }

    function hidePaginationBtn() {
      const btn = document.querySelector(".js-repos-pagination");

      btn.classList.add("hidden");
    }
  }

  handleFilterWithType(evt) {
    const { value: type } = evt.target;

    this.emit("type-filter", type);
  }

  handleSortReposList(evt) {
    const { nodeName, value: option } = evt.target;
    if (nodeName === "SELECT") {
      this.emit("sort", option);
    } else if (nodeName === "IMG") {
      this.emit("reverse");
    }
  }
}
