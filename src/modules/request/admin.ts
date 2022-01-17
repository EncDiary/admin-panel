import axios, { AxiosError } from "axios";
import qs from "qs";
import { getErrorMessage } from ".";
import { errorAlert } from "../sweetalert";

const serverUrl = process.env.REACT_APP_SERVER_URL;

export const getAuthMessageRequest = (username: string) => {
  return axios({
    method: "post",
    baseURL: serverUrl,
    url: "/request",
    data: qs.stringify({
      username,
      is_admin: 1,
    }),
  }).catch((error: AxiosError) => {
    errorAlert(getErrorMessage(error));
  });
};

export const authRequest = (username: string, signature: string) => {
  return axios({
    method: "post",
    baseURL: serverUrl,
    url: "/auth",
    data: qs.stringify({
      username,
      signature,
      is_admin: 1,
    }),
  }).catch((error: AxiosError) => {
    errorAlert(getErrorMessage(error));
  });
};
