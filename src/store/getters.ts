import { Rectangle } from "@/store/types";
import { State } from "vue";
import { GetterTree } from "vuex";

const getters: GetterTree<State, State> = {
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
};

export default getters;
