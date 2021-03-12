<template>
  <div class="board" ref="board" v-if="isReady">
    <svg :viewBox="viewBoxSize">
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
  width: 100vw;
  background-color: pink;
  display: grid;
  place-items: center;
  padding: 5px;
  position: absolute;
  bottom: 0;
  left: 0;
  top: 160px;
}
.board > svg {
  background-color: white;
  height: 100%;
  width: 100%;
}
</style>
