import { createStore, Store, useStore as baseUseStore } from "vuex";
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

export function useStore() {
  return baseUseStore(key);
}
