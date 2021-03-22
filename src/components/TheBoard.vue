<template>
  <div class="board" v-if="isReady">
    <svg :viewBox="viewBoxSize">
      <rect :width="boardWidth" :height="boardHeight" :fill="boardColor" />
      <drawings
        v-for="rectangle in rectangles"
        :key="rectangle.id"
        :rectangle="rectangle"
      />
    </svg>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "@/store/store";
import Drawings from "./Drawings.vue";

export default defineComponent({
  setup() {
    const store = useStore();
    const boardColor = ref("#F9F9F9");
    return {
      boardColor,
      boardWidth: computed(() => store.getters.boardWidth),
      boardHeight: computed(() => store.getters.boardHeight),
      viewBoxSize: computed(() => store.getters.viewBoxSize),
      rectangles: computed(() => store.getters.rectangles),
      isReady: computed(() => store.getters.isReady)
    };
  },
  components: { Drawings }
});
</script>

<style scoped>
.board {
  width: calc(100vw - 10px);
  background-color: pink;
  display: grid;
  place-items: center;
  padding: 5px;
  position: absolute;
  bottom: 5px;
  left: 5px;
  right: 5px;
  top: 160px;
  touch-action: none;
}

.board > svg {
  height: 100%;
  width: 100%;
}
</style>
