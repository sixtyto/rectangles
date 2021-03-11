<template>
  <div class="row" v-if="isReady">
    <div class=" col-sm-10 offset-sm-1 text_wrapper">
      <p>Name: {{ projectName }}</p>
      <p>Id: {{ projectId }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  computed: {
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
