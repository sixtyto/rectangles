<template>
  <figure class="board">
    <svg
      v-if="rectangles.length != 0"
      :width="projectInfo.width"
      :height="projectInfo.height"
    >
      <svg v-for="rectangle in rectangles" :key="rectangle.id">
        <rect
          :width="rectangle.width"
          :height="rectangle.height"
          :style="{
            transform: `translate(${rectangle.x}px, ${rectangle.y}px) rotate(${
              rectangle.rotation
            }deg) translate(-${+rectangle.width / 2}px, -${+rectangle.height /
              2}px)`,
            transformOrigin: `${rectangle.x}, ${rectangle.y}`,
            fill: rectangle.color
          }"
        />
        <rect
          :width="
            calculateWidthOfBoundingBox(
              rectangle.width,
              rectangle.height,
              rectangle.rotation
            )
          "
          :height="
            calculateHeightOfBoundingBox(
              rectangle.width,
              rectangle.height,
              rectangle.rotation
            )
          "
          :style="{
            transform: `translate(${rectangle.x}px, ${
              rectangle.y
            }px) translate(-${+calculateWidthOfBoundingBox(
              rectangle.width,
              rectangle.height,
              rectangle.rotation
            ) / 2}px, -${+calculateHeightOfBoundingBox(
              rectangle.width,
              rectangle.height,
              rectangle.rotation
            ) / 2}px)`,
            stroke: `rgb(255, 0, 255)`,
            strokeWidth: 5,
            fill: none,
            fillOpacity: 0,
            strokeOpacity: 0.5
          }"
        />
        <circle
          r="4"
          fill="rgb(255, 0, 0)"
          :cx="rectangle.x"
          :cy="rectangle.y"
        />
        <text
          fill="rgb(255, 255, 255)"
          :x="rectangle.x + 10"
          :y="rectangle.y - 5"
        >
          {{ rectangle.rotation }}°
        </text>
      </svg>
    </svg>
  </figure>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  computed: {
    ...mapState(["projectInfo", "rectangles"])
  },
  methods: {
    calculateHeightOfBoundingBox(
      width: number,
      height: number,
      rotation: number
    ) {
      const rad = (rotation * Math.PI) / 180;
      return width * Math.abs(Math.sin(rad)) + height * Math.abs(Math.cos(rad));
    },
    calculateWidthOfBoundingBox(
      width: number,
      height: number,
      rotation: number
    ) {
      const rad = (rotation * Math.PI) / 180;
      return width * Math.abs(Math.cos(rad)) + height * Math.abs(Math.sin(rad));
    },
    ...mapActions(["getRectangles"])
  }
});
</script>

<style>
.board {
  background-color: pink;
  display: grid;
  place-items: center;
}
.board > svg {
  background-color: white;
}
</style>
