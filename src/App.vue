<template>
  <div class="container-fluid">
    <div class="row">
      <form class="col-6 my-2 offset-3" @submit.prevent="getRectangles">
        <label for="seed" class="form-label">enter seed:</label>
        <input
          class="form-control"
          type="text"
          id="seed"
          placeholder="leave me empty for random seed"
          v-model="id"
        />
      </form>
      <div class="row">
        <div class="col-6 offset-3">
          <h3>Name: {{ projectInfo.name }}</h3>
          <h3>Id: {{ projectInfo.id }}</h3>
        </div>
      </div>
      <button class="btn btn-primary my-2" @click.prevent="getRectangles">
        Get seed
      </button>
      <the-board />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import TheBoard from "./components/TheBoard.vue";

export default defineComponent({
  name: "App",
  components: {
    TheBoard
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
    ...mapState(["projectInfo"])
  },
  methods: {
    ...mapActions(["getRectangles"])
  }
});
</script>

<style></style>
