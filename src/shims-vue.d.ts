import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";

declare module "@vue/runtime-core" {
  // Declare your own store states.
  interface State {
    id: string;
    isError: boolean;
    projectInfo: ProjectInfo;
    rectangles: Rectangle[];
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
