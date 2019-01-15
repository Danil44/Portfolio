import "./reset.css";
import "./scss/basics.scss";
import "./scss/variables.scss";
import "./scss/components/input-form.scss";
import "./scss/components/background.scss";
import "./scss/components/note__item.scss";
import "./scss/components/modal-window.scss";
import "./scss/components/spinner.scss";
import "./scss/components/modal-question.scss";
import "./scss/components/container.scss";
import * as storage from "./services/storage";
import { fetchURLPreview } from "./services/api";
import noteTpl from "./templates/notes.hbs";
import { ETIME } from "constants";

const inputForm = document.querySelector(".input-form");
const input = inputForm.querySelector("input");
const notesList = document.querySelector(".notes__list");
const spinner = document.querySelector(".spinner-wrapper");
const errorModalWindow = document.querySelector(".modal");
const errorTitle = errorModalWindow.querySelector(".modal__title");

const persistedNotes = storage.get();
let userNotes = persistedNotes ? persistedNotes : [];
if (persistedNotes) {
  hydrateNotesGrid(persistedNotes);
}

function hydrateNotesGrid(data) {
  updateNoteView(createLocalNotesGrid(data));
  addNoteEventListeners();
}
// ====================================================

inputForm.addEventListener("submit", showNote);

function showNote(evt) {
  evt.preventDefault();
  handleFetch();
  console.log("adding: ", userNotes);
  this.reset();
}

function addNoteEventListeners() {
  const openerQuestionModal = notesList.querySelectorAll(".note__delete-btn");
  openerQuestionModal.forEach(note =>
    note.addEventListener("click", deleteNote)
  );
  const questionModals = notesList.querySelectorAll(".modal-question");
  questionModals.forEach(button =>
    button.addEventListener("click", deleteNote)
  );
}

function toggleSpinner() {
  spinner.classList.toggle("spinner--hidden");
}

function handleFetch() {
  toggleSpinner();

  fetchURLPreview(input.value).then(noteData => {
    if (noteData === undefined) {
      errorTitle.textContent = "Sorry, we can't load this URL";
      showErrorModal();
      return;
    }
    if (checkOnSameURL(noteData)) return;

    userNotes.unshift(noteData);
    storage.set(userNotes);
    updateNoteView(createNewNote(noteData));
    addNoteEventListeners();
    toggleSpinner();
  });
}

function checkOnSameURL(newNote) {
  const sameURL = userNotes.find(note => note.url === newNote.url);
  if (sameURL === undefined) {
    return false;
  }
  errorTitle.textContent = "You already noted this URL";
  showErrorModal();
  return true;
}

function updateNoteView(note) {
  notesList.insertAdjacentHTML("afterbegin", note);
}

function createNewNote(inputNote) {
  return noteTpl({
    img: inputNote.image,
    url: inputNote.url,
    title: inputNote.title,
    desc: inputNote.description
  });
}

function createLocalNotesGrid(localNotes) {
  return localNotes.reduce(
    (acc, item) =>
      acc +
      noteTpl({
        img: item.image,
        url: item.url,
        title: item.title,
        desc: item.description
      }),
    ""
  );
}

function deleteNote(evt) {
  evt.preventDefault();
  if (evt.target === this || evt.target === this.firstElementChild) {
    const quesitonModal = this.parentElement.firstElementChild;
    showQuestionModal(quesitonModal, this);
  }
  if (evt.target.type === "reset") {
    const rotateBtn = this.parentElement.querySelector(".note__delete-btn");
    showQuestionModal(this.parentElement.firstElementChild, rotateBtn);
  }
  if (evt.target.type == "submit") {
    const noteURL = this.parentElement.querySelector(".note__link");
    const noteToDelete = noteURL.parentElement.parentElement;
    userNotes = userNotes.filter(item => item.url !== noteURL.href);
    storage.set(userNotes);
    noteToDelete.remove();
  }
  return;
}

function showQuestionModal(modal, rotate) {
  rotate.classList.toggle("btn-rotate");
  modal.classList.toggle("modal--hidden-display");
  setTimeout(() => {
    modal.classList.toggle("modal--hidden-opacity");
  }, 0);
}

function showErrorModal() {
  toggleSpinner();
  errorModalWindow.classList.remove("modal--hidden-display");
  setTimeout(() => {
    errorModalWindow.classList.remove("modal--hidden-opacity");
  }, 10);
  setTimeout(() => {
    errorModalWindow.classList.add("modal--hidden-opacity");
  }, 2000);
  setTimeout(() => {
    errorModalWindow.classList.add("modal--hidden-display");
  }, 2500);
}
