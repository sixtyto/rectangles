<template>
  <div class="container">
    <div class="row">
      <board-controls />

      <div class="row" v-if="isReady">
        <div class=" col-sm-10 offset-sm-1 text_wrapper">
          <p>Name: {{ projectName }}</p>
          <p>Id: {{ projectId }}</p>
        </div>
      </div>

      <hr />

      <the-board />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";
import TheBoard from "./components/TheBoard.vue";
import BoardControls from "./components/BoardControls.vue";

export default defineComponent({
  components: {
    TheBoard,
    BoardControls
  },
  computed: {
    id: {
      get(): string {
        return this.$store.state.id;
      },
      set(value: string) {
        this.$store.commit("setId", value);
      }
    },
    projectName(): string {
      return this.projectInfo.name;
    },
    projectId(): string {
      return this.projectInfo.id;
    },
    isReady(): boolean {
      return this.projectInfo.items?.length !== 0;
    },
    ...mapState(["projectInfo"])
  }
});
</script>

<style></style>
