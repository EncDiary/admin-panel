import { lib } from "crypto-js";
import JSEncrypt from "jsencrypt";
import { makeAutoObservable } from "mobx";
import { RootStore } from ".";
import { IAccount } from "../types/user";

class UserStore {
  rootStore: RootStore;
  account?: IAccount;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  setAccount(
    username: string,
    privKey: JSEncrypt,
    token: string,
    tokenExp: number,
    salt: lib.WordArray
  ) {
    this.account = { username, privKey, token, tokenExp, salt };
  }

  updateToken(token: string, tokenExp: number) {
    if (this.account) {
      this.account.token = token;
      this.account.tokenExp = tokenExp;
    }
  }

  unsetAccount() {
    this.account = undefined;
  }
}

export default UserStore;
