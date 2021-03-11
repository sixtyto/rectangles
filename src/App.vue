<template>
  <div class="container">
    <div class="row">
      <board-controls />
      <project-info />
      <hr />
      <the-error />
      <the-board />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheBoard from "./components/TheBoard.vue";
import BoardControls from "./components/BoardControls.vue";
import ProjectInfo from "./components/ProjectInfo.vue";
import TheError from "./components/TheError.vue";

export default defineComponent({
  components: {
    TheBoard,
    BoardControls,
    ProjectInfo,
    TheError
  }
});
</script>

<style></style>
