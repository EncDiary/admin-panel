import { makeAutoObservable } from "mobx";
import { RootStore } from ".";
import { INote } from "../types/demo";

class DemoStore {
  notes: INote[] = [
    {
      id: "123",
      datetime: 123,
      text: "Hello world",
    },
    {
      id: "124",
      datetime: 124,
      text: "Hello world2",
    },
  ];
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  delete(id: string) {
    this.notes = this.notes.filter((item) => {
      return item.id !== id;
    });
  }
}

export default DemoStore;
