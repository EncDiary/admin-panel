import jwt from "jsonwebtoken";
import store from "../store";
import { IAccount } from "../types/user";
import { createSignature } from "./crypto";
import { authRequest, getAuthMessageRequest } from "./request/admin";

export const updateJwtToken = async (account: IAccount) => {
  const isValid = !checkIsTokenExpired(account.tokenExp);
  if (isValid) return;

  const serverGetMessageResponse = await getAuthMessageRequest(
    account.username
  );
  if (!serverGetMessageResponse) return;

  const signature = createSignature(
    account.privKey,
    serverGetMessageResponse.data.message
  );

  const serverAuthResponse = await authRequest(account.username, signature);
  if (!serverAuthResponse) return;
  const tokenData = checkIsTokenValid(serverAuthResponse.data.token);
  if (!tokenData.isValid) return;

  store.user.updateToken(serverAuthResponse.data.token, tokenData.tokenExp);
};

export const checkIsTokenValid = (token?: string) => {
  if (!token) {
    return { isValid: false, tokenExp: 0 };
  }
  const decodedToken = jwt.decode(token);

  const isValid = Boolean(
    decodedToken &&
      typeof decodedToken !== "string" &&
      typeof decodedToken.exp === "number" &&
      !checkIsTokenExpired(decodedToken.exp) &&
      typeof decodedToken.is_admin === "boolean" &&
      decodedToken.is_admin
  );

  const tokenExp =
    decodedToken &&
    typeof decodedToken !== "string" &&
    typeof decodedToken.exp === "number"
      ? decodedToken.exp
      : 0;

  return { isValid, tokenExp };
};

const checkIsTokenExpired = (tokenExp: number) =>
  Date.now() > (tokenExp - 30) * 1000;
