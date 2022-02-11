import CryptoStore from "./crypto";
import DemoStore from "./demo";
import UserStore from "./user";

export class RootStore {
  demo = new DemoStore(this);
  user = new UserStore(this);
  crypto = new CryptoStore(this);
}

export default new RootStore();
