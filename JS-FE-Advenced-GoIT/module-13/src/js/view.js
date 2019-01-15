import noteTpl from "../templates/notes.hbs";
import EventEmitter from "../services/event-emitter";
export default class View extends EventEmitter {
  constructor() {
    super();

    this.inputForm = document.querySelector(".input-form");
    this.input = document.querySelector("input");
    this.notesList = document.querySelector(".notes__list");
    this.spinner = document.querySelector(".spinner-wrapper");

    this.inputForm.addEventListener("submit", this.handleAdd.bind(this));

    this.openerBtns = this.notesList.querySelectorAll(".note__delete-btn");

    // this.view.on("add", this.addNote.bind(this));
  }

  handleAdd(evt) {
    evt.preventDefault();
    this.toggleSpinner();

    const { value } = this.input;
    if (value === "") return;

    this.inputForm.reset();

    this.emit("add", value);
  }

  appendEventListeners() {
    const removeBtns = Array.from(
      this.notesList.querySelectorAll('[data-action="open"]')
    );
    removeBtns.forEach(btn =>
      btn.addEventListener("click", this.handleRemoveNote.bind(this))
    );
  }

  addNewNote(inputNote) {
    const note = noteTpl({
      id: inputNote.id,
      img: inputNote.image,
      url: inputNote.url,
      title: inputNote.title,
      desc: inputNote.description
    });

    this.notesList.insertAdjacentHTML("afterbegin", note);
    this.toggleSpinner();

    this.appendEventListeners();
  }

  showLocalNotes(localNotes) {
    const notes = localNotes.reduce(
      (acc, item) =>
        acc +
        noteTpl({
          id: item.id,
          img: item.image,
          url: item.url,
          title: item.title,
          desc: item.description
        }),
      ""
    );
    this.notesList.insertAdjacentHTML("afterbegin", notes);
    if (localNotes.length > 0) this.appendEventListeners();
  }

  handleRemoveNote({ target }) {
    const parent = target.closest(".notes__item");
    this.emit("remove", parent.dataset.id);
  }

  showError(error) {
    this.toggleSpinner();
    const errorTitle = document.querySelector(".modal__title");
    const errorModalWindow = document.querySelector(".modal");

    errorTitle.textContent = error;

    errorModalWindow.classList.remove("modal--hidden-display");
    setTimeout(() => {
      errorModalWindow.classList.remove("modal--hidden-opacity");
    }, 10);
    setTimeout(() => {
      errorModalWindow.classList.add("modal--hidden-opacity");
    }, 1500);
    setTimeout(() => {
      errorModalWindow.classList.add("modal--hidden-display");
    }, 2000);
  }

  removeNote(id) {
    const item = this.notesList.querySelector(`[data-id="${id}"]`);
    this.notesList.removeChild(item);
  }

  toggleSpinner() {
    this.spinner.classList.toggle("spinner--hidden");
  }
}
