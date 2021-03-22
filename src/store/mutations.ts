import { MutationTree } from "vuex";
import { State } from "vue";
import { SET_ERROR, SET_ID, SET_PROJECT_INFO } from "./mutationsTypes";

const mutations: MutationTree<State> = {
  [SET_PROJECT_INFO]: (state, payload) => {
    state.projectInfo = payload;
  },
  [SET_ID]: (state, payload) => {
    state.id = payload;
  },
  [SET_ERROR]: (state, payload) => {
    state.isError = payload;
  }
};

export default mutations;
