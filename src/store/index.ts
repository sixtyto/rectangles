import { createStore } from "vuex";
import axios from "axios";

export type Rectangle = {
  id: string;
  color: string;
  rotation: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

type ProjectInfo = {
  id: string;
  height: number;
  items: Rectangle[];
  name: string;
  width: number;
};

export default createStore({
  state: {
    projectInfo: {
      id: "",
      height: 0,
      items: [],
      name: "",
      width: 0
    } as ProjectInfo,
    isError: false,
    id: ""
  },
  mutations: {
    setProjectInfo(state, payload) {
      state.projectInfo = payload;
    },
    setId(state, payload) {
      state.id = payload;
    },
    setError(state, payload) {
      state.isError = payload;
    }
  },
  getters: {
    rectangles(state): Rectangle[] {
      return state.projectInfo.items;
    },
    projectName(state): string {
      return state.projectInfo.name;
    },
    projectId(state): string {
      return state.projectInfo.id;
    },
    isReady(state): boolean {
      return state.projectInfo.items?.length !== 0;
    },
    boardWidth(state): number {
      return state.projectInfo.width;
    },
    boardHeight(state): number {
      return state.projectInfo.height;
    },
    viewBoxSize(state): string {
      return `0 0 ${state.projectInfo.width} ${state.projectInfo.height}`;
    }
  },
  actions: {
    async getRandomSeed({ commit, dispatch }) {
      const data = await axios.get("https://recruitment01.vercel.app/api/init");
      commit("setId", data.data.id);
      dispatch("getRectangles");
    },
    async getRectangles({ commit, state }) {
      const { id } = state;
      if (id) {
        try {
          const data = await axios.get(
            `https://recruitment01.vercel.app/api/project/${id}`
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
