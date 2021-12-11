import axios, { AxiosError } from "axios";
import qs from "qs";
import { getErrorMessage } from ".";
import { errorAlert } from "../sweetalert";

const serverUrl = process.env.REACT_APP_SERVER_URL;

export const authRequest = (username: string, password: string) => {
  return axios({
    method: "post",
    baseURL: serverUrl,
    url: "/admin/auth",
    data: qs.stringify({ username, password }),
  }).catch((error: AxiosError) => {
    errorAlert(getErrorMessage(error));
  });
};
