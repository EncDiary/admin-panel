import DemoStore from "./demoStore";

export class RootStore {
  demo = new DemoStore(this);
}

export default new RootStore();
