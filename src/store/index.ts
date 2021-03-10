import { createStore } from "vuex";
import axios from "axios";

export type State = {
  projectInfo: object;
  rectangles: object[];
  id: string;
};

export default createStore<State>({
  state: {
    projectInfo: {},
    rectangles: [],
    id: ""
  },
  mutations: {
    setProjectInfo(state, payload) {
      console.log("payload", payload);
      state.projectInfo = payload;
      state.rectangles = payload.items;
    },
    setId(state, payload) {
      console.log("payload", payload);
      state.id = payload;
    }
  },
  actions: {
    async getRandomSeed({ commit, dispatch }) {
      console.log("get link");
      const data = await axios.get("http://recruitment01.vercel.app/api/init");
      commit("setId", data.data.id);
      dispatch("getRectangles");
    },
    async getRectangles({ commit, state }) {
      const { id } = state;
      if (id) {
        console.log("get get");
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
