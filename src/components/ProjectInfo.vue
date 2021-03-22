<template>
  <div class="row" v-if="isReady">
    <div class=" col-sm-10 offset-sm-1 text_wrapper">
      <p>Name: {{ projectName }}</p>
      <p>Id: {{ projectId }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store/store";

export default defineComponent({
  setup() {
    const store = useStore();
    return {
      projectName: computed(() => store.getters.projectName),
      projectId: computed(() => store.getters.projectId),
      isReady: computed(() => store.getters.isReady)
    };
  }
});
</script>

<style></style>
