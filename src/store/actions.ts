import { ActionTree } from "vuex";
import axios from "axios";
import { State } from "vue";
import { SET_ERROR, SET_ID, SET_PROJECT_INFO } from "@/store/mutationsTypes";
import { GET_RANDOM_SEED, GET_RECTANGLES } from "./actionTypes";

const actions: ActionTree<State, State> = {
  [GET_RANDOM_SEED]: async ({ commit, dispatch }) => {
    const data = await axios.get("https://recruitment01.vercel.app/api/init");
    commit("setId", data.data.id);
    await dispatch("getRectangles");
  },
  [GET_RECTANGLES]: async ({ commit, state, dispatch }) => {
    const { id } = state;
    if (id) {
      try {
        const data = await axios.get(
          `https://recruitment01.vercel.app/api/project/${id}`
        );
        commit(SET_PROJECT_INFO, data.data.project);
        commit(SET_ID, "");
        commit(SET_ERROR, false);
      } catch {
        commit(SET_ERROR, true);
      }
    } else {
      await dispatch("getRandomSeed");
    }
  }
};

export default actions;
