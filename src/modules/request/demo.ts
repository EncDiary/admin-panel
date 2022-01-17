import axios, { AxiosError } from "axios";
import qs from "qs";
import { getErrorMessage } from ".";
import { ICipherNote } from "../../types/demo";
import { IAccount } from "../../types/user";
import { updateJwtToken } from "../jwt";
import { errorAlert } from "../sweetalert";

const serverUrl = process.env.REACT_APP_SERVER_URL;

export const createNoteRequest = async (
  cipherNote: ICipherNote,
  account: IAccount
) => {
  await updateJwtToken(account);

  return axios({
    method: "post",
    baseURL: serverUrl,
    url: "/admin/demo/note",
    headers: { Authorization: `Bearer ${account.token}` },
    data: qs.stringify(cipherNote),
  }).catch((error: AxiosError) => {
    errorAlert(getErrorMessage(error));
  });
};

export const editNoteRequest = async (
  noteId: string,
  cipherNote: ICipherNote,
  account: IAccount
) => {
  await updateJwtToken(account);

  return axios({
    method: "put",
    baseURL: serverUrl,
    url: `/admin/demo/note/${noteId}`,
    headers: { Authorization: `Bearer ${account.token}` },
    data: qs.stringify(cipherNote),
  }).catch((error: AxiosError) => {
    errorAlert(getErrorMessage(error));
  });
};

export const deleteNoteRequest = async (noteId: string, account: IAccount) => {
  await updateJwtToken(account);

  return axios({
    method: "delete",
    baseURL: serverUrl,
    url: `/admin/demo/note/${noteId}`,
    headers: { Authorization: `Bearer ${account.token}` },
  }).catch((error: AxiosError) => {
    errorAlert(getErrorMessage(error));
  });
};

export const getNotesRequest = async (account: IAccount) => {
  await updateJwtToken(account);

  return axios({
    method: "get",
    baseURL: serverUrl,
    url: "/admin/demo/notes",
    headers: { Authorization: `Bearer ${account.token}` },
  }).catch((error: AxiosError) => {
    errorAlert(getErrorMessage(error));
  });
};
