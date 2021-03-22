import { ComponentCustomProperties, State } from "vue";
import { Store } from "vuex";
import { ProjectInfo } from "@/store/types";

declare module "@vue/runtime-core" {
  // Declare your own store states.
  interface State {
    id: string;
    isError: boolean;
    projectInfo: ProjectInfo;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
