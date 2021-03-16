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
import { mapGetters } from "vuex";

export default defineComponent({
  computed: {
    ...mapGetters(["projectName", "projectId", "isReady"])
  }
});
</script>

<style></style>
