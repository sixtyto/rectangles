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
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import Drawings from "./Drawings.vue";

export default defineComponent({
  data: () => ({
    boardColor: "#F9F9F9"
  }),
  components: { Drawings },
  computed: {
    boardWidth(): number {
      return this.projectInfo.width;
    },
    boardHeight(): number {
      return this.projectInfo.height;
    },
    viewBoxSize(): string {
      return `0 0 ${this.boardWidth} ${this.boardHeight}`;
    },
    isReady(): boolean {
      return !!this.rectangles.length;
    },
    ...mapState(["projectInfo", "rectangles"])
  },
  methods: mapActions(["getRectangles"])
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
