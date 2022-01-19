import axios, { AxiosError } from "axios";
import { getErrorMessage } from ".";
import { IAccount } from "../../types/user";
import { updateJwtToken } from "../jwt";
import { errorAlert } from "../sweetalert";

const serverUrl = process.env.REACT_APP_SERVER_URL;

export const getStatsMonthRequest = async (
  account: IAccount,
  year: number,
  month: number
) => {
  await updateJwtToken(account);

  return axios({
    method: "get",
    baseURL: serverUrl,
    url: "/admin/stats/month",
    headers: { Authorization: `Bearer ${account.token}` },
    params: { year, month },
  }).catch((error: AxiosError) => {
    errorAlert(getErrorMessage(error));
  });
};

export const getStatsYearRequest = async (account: IAccount, year: number) => {
  await updateJwtToken(account);

  return axios({
    method: "get",
    baseURL: serverUrl,
    url: "/admin/stats/year",
    headers: { Authorization: `Bearer ${account.token}` },
    params: { year },
  }).catch((error: AxiosError) => {
    errorAlert(getErrorMessage(error));
  });
};
