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
import { computed, defineComponent } from "vue";
import { useStore } from "@/store/store";
import { GET_RECTANGLES } from "@/store/actionTypes";
import { SET_ID } from "@/store/mutationsTypes";

export default defineComponent({
  setup() {
    const store = useStore();
    return {
      id: computed({
        get: () => store.state.id,
        set: value => store.commit(SET_ID, value)
      }),
      getRectangles: () => store.dispatch(GET_RECTANGLES)
    };
  }
});
</script>

<style></style>
