import { makeAutoObservable } from "mobx";
import { RootStore } from ".";

class UserStore {
  token?: string;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  setToken(token: string) {
    this.token = token;
  }

  unsetToken() {
    this.token = undefined;
  }
}

export default UserStore;
