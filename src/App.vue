<template>
  <div class="container">
    <div class="row">
      <board-controls />
      <project-info />
      <hr />

      <the-board />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheBoard from "./components/TheBoard.vue";
import BoardControls from "./components/BoardControls.vue";
import ProjectInfo from "./components/ProjectInfo.vue";

export default defineComponent({
  components: {
    TheBoard,
    BoardControls,
    ProjectInfo
  },
  computed: {
    id: {
      get(): string {
        return this.$store.state.id;
      },
      set(value: string) {
        this.$store.commit("setId", value);
      }
    }
  }
});
</script>

<style></style>
