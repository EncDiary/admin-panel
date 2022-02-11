import store from "../store";

export const clearStore = () => {
  store.user.unsetAccount();
  store.demo.clearNotes();
  store.crypto.clearAesKeys();
};
