import * as storage from "../services/storage";
import { fetchURLPreview } from "../services/api";

export default class Model {
  constructor() {
    this.items = [];
    storage.get() ? (this.items = storage.get()) : [];
  }

  addItem(url) {
    return fetchURLPreview(url).then(noteData => {
      if (noteData === undefined) return;
      if (this.checkOnSameNote(noteData.url)) return;

      this.items.unshift(noteData);
      storage.set(this.items);

      return noteData;
    });
  }

  removeItem(id) {
    this.items = this.items.filter(item => item.id !== id);
    storage.set(this.items);
  }

  checkOnSameNote(url) {
    const sameURL = this.items.find(note => note.url === url);
    if (sameURL === undefined) {
      return false;
    }
    return true;
  }

  getLocalNotes() {
    return this.items;
  }
}
