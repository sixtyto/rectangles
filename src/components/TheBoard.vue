<template>
  <svg
    v-if="rectangles.length != 0"
    :width="projectInfo.width"
    :height="projectInfo.height"
  >
    <drawings
      v-for="rectangle in rectangles"
      :key="rectangle.id"
      :rectangle="rectangle"
    />
  </svg>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import Drawings from "./Drawings.vue";

export default defineComponent({
  components: { Drawings },
  computed: {
    ...mapState(["projectInfo", "rectangles"])
  },
  methods: {
    ...mapActions(["getRectangles"])
  }
});
</script>

<style>
.board {
  background-color: pink;
  display: grid;
  place-items: center;
}
.board > svg {
  background-color: white;
}
</style>
