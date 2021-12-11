import axios, { AxiosError } from "axios";
import qs from "qs";
import { getErrorMessage } from ".";
import { ICipherNote } from "../../types/demo";
import { errorAlert } from "../sweetalert";

const serverUrl = process.env.REACT_APP_SERVER_URL;

export const createNoteRequest = (cipherNote: ICipherNote, token: string) => {
  return axios({
    method: "post",
    baseURL: serverUrl,
    url: "/admin/demo/note",
    headers: { Authorization: `Bearer ${token}` },
    data: qs.stringify(cipherNote),
  }).catch((error: AxiosError) => {
    errorAlert(getErrorMessage(error));
  });
};

export const editNoteRequest = async (
  noteId: string,
  cipherNote: ICipherNote,
  token: string
) => {
  return axios({
    method: "put",
    baseURL: serverUrl,
    url: `/admin/demo/note/${noteId}`,
    headers: { Authorization: `Bearer ${token}` },
    data: qs.stringify(cipherNote),
  }).catch((error: AxiosError) => {
    errorAlert(getErrorMessage(error));
  });
};

export const deleteNoteRequest = async (noteId: string, token: string) => {
  return axios({
    method: "delete",
    baseURL: serverUrl,
    url: `/admin/demo/note/${noteId}`,
    headers: { Authorization: `Bearer ${token}` },
  }).catch((error: AxiosError) => {
    errorAlert(getErrorMessage(error));
  });
};

export const getNotesRequest = async (token: string) => {
  return axios({
    method: "get",
    baseURL: serverUrl,
    url: "/admin/demo/notes",
    headers: { Authorization: `Bearer ${token}` },
  }).catch((error: AxiosError) => {
    errorAlert(getErrorMessage(error));
  });
};
