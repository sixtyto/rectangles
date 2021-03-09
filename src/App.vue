<template>
  <the-board />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheBoard from "./components/TheBoard.vue";

export default defineComponent({
  name: "App",
  components: {
    TheBoard
  }
});
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
