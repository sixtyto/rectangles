import { createStore, Store } from "vuex";
import { InjectionKey, State } from "vue";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
import state from "./state";

export const key: InjectionKey<Store<State>> = Symbol("store");

export const store = createStore<State>({
  state,
  mutations,
  getters,
  actions
});
