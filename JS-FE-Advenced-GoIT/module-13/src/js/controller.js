import EventEmitter from "../services/event-emitter";

export default class Controller extends EventEmitter {
  constructor(model, view) {
    super();

    this.model = model;
    this.view = view;

    view.on("add", this.addNote.bind(this));
    view.on("remove", this.removeNote.bind(this));

    return this.showLocalNotes();
  }

  addNote(note) {
    if (this.model.checkOnSameNote(note)) {
      this.view.showError("You already noted this URL");
      return;
    }

    this.model.addItem(note).then(item => {
      if (item === undefined) {
        this.view.showError("We can't load this URL");
        return;
      }
      this.view.addNewNote(item);
    });
  }

  removeNote(id) {
    this.model.removeItem(id);
    this.view.removeNote(id);
  }

  showLocalNotes() {
    const notes = this.model.getLocalNotes();
    this.view.showLocalNotes(notes);
  }
}
