import { types } from "mobx-state-tree";
import { CommonStore } from "./commonStore";
import SampleStore from "./sample/sampleStore";

const RootStore = types.model("RootStore", {
  common: types.optional(CommonStore, {
    
  }),

  sample: types.optional(SampleStore, {}),
  
});

export default RootStore;