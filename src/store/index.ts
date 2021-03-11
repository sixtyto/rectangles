import { createStore } from "vuex";
import axios from "axios";

export type State = {
  projectInfo: object;
  rectangles: object[];
  id: string;
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
        } catch {
          this.dispatch("getRandomSeed");
        }
      } else {
        this.dispatch("getRandomSeed");
      }
    }
  },
  modules: {}
});
