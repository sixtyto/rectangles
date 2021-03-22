<template>
  <div class="error" v-if="isError">Something went wrong :(</div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store/store";

export default defineComponent({
  setup() {
    const store = useStore();
    return { isError: computed(() => store.state.isError) };
  }
});
</script>

<style scoped>
.error {
  z-index: 999;
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
</style>
