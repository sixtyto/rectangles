<template>
  <div>elko</div>
  <svg width="1400" height="800">
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
      <circle r="4" fill="rgb(255, 0, 0)" :cx="rectangle.x" :cy="rectangle.y" />
      <text
        fill="rgb(255, 255, 255)"
        :x="rectangle.x + 10"
        :y="rectangle.y - 5"
      >
        {{ rectangle.rotation }}°
      </text>
    </svg>
  </svg>
</template>
<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return { rectangles: [] };
  },
  mounted() {
    axios
      // .get(
      //   "http://recruitment01.vercel.app/api/project/ckm2dp4r5000z08mjg35m62w4-6375048905180414"
      // )
      .get(
        "http://recruitment01.vercel.app/api/project/ckm2i81n3001g08mjgm1lc3oa-1699952138819183"
      )
      .then(response => (this.rectangles = response.data.project.items))
      .then(res => console.log(res));
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
    }
  }
});
</script>

<style></style>
