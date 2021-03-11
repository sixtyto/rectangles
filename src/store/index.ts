import { createStore } from "vuex";
import axios from "axios";

export type State = {
  id: string;
  isError: boolean;
  projectInfo: object;
  rectangles: object[];
};

export default createStore<State>({
  state: {
    projectInfo: {
      id: "",
      height: 0,
      items: [],
      name: "",
      width: 0
    },
    isError: false,
    rectangles: [],
    id: ""
  },
  mutations: {
    setProjectInfo(state, payload) {
      state.projectInfo = payload;
      state.rectangles = payload.items;
    },
    setId(state, payload) {
      state.id = payload;
    },
    setError(state, payload) {
      state.isError = payload;
    }
  },
  actions: {
    async getRandomSeed({ commit, dispatch }) {
      const data = await axios.get("http://recruitment01.vercel.app/api/init");
      commit("setId", data.data.id);
      dispatch("getRectangles");
    },
    async getRectangles({ commit, state }) {
      const { id } = state;
      if (id) {
        try {
          const data = await axios.get(
            `http://recruitment01.vercel.app/api/project/${id}`
          );
          commit("setProjectInfo", data.data.project);
          commit("setId", "");
          this.commit("setError", false);
        } catch {
          this.commit("setError", true);
        }
      } else {
        this.dispatch("getRandomSeed");
      }
    }
  },
  modules: {}
});
