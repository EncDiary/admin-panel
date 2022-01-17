import JSEncrypt from "jsencrypt";

export interface IAccount {
  username: string;
  privKey: JSEncrypt;
  token: string;
  tokenExp: number;
}
