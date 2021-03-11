<template>
  <form class="input-group my-3" @submit.prevent="getRectangles">
    <input
      type="text"
      class="form-control"
      placeholder="Leave me empty for random seed"
      v-model="id"
    />
    <div class="input-group-append">
      <button class="btn btn-outline-secondary" type="submit">
        Get rectangles
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
  computed: {
    id: {
      get(): string {
        return this.$store.state.id;
      },
      set(value: string) {
        this.$store.commit("setId", value);
      }
    }
  },
  methods: mapActions(["getRectangles"])
});
</script>

<style></style>
