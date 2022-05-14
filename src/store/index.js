import { createStore } from "vuex";
import * as actions from "./actions";
import mutations from "./mutations";

export const state = {
  app: {
    language: "cn",
    theme: "light",
    fontSize: "normal",
  },
};
export default createStore({
  state,
  mutations,
  actions,
  modules: {},
});
