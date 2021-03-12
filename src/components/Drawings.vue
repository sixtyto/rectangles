<template>
  <rect
    :width="rectangleWidth"
    :height="rectangleHeight"
    :style="rectangleStyles"
  />
  <rect
    :width="boundingBoxWidth"
    :height="boundingBoxHeight"
    :style="boundingBoxStyles"
  />
  <circle r="4" fill="red" :cx="rectangleX" :cy="rectangleY" />
  <text fill="white" :x="rectangleX + 10" :y="rectangleY - 5">
    {{ rectangleRotation }}°
  </text>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { mapState } from "vuex";

type Rectangle = {
  id: string;
  color: string;
  rotation: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export default defineComponent({
  props: {
    rectangle: {
      type: Object as PropType<Rectangle>,
      required: true
    }
  },
  computed: {
    rectangleHeight(): number {
      if (
        typeof this.rectangle.height === "number" &&
        this.rectangle.height > 0 &&
        this.rectangle.height < this.projectInfo.height
      )
        return this.rectangle.height;
      this.setError();
      return 0;
    },
    rectangleWidth(): number {
      if (
        typeof this.rectangle.width === "number" &&
        this.rectangle.width > 0 &&
        this.rectangle.width < this.projectInfo.width
      )
        return this.rectangle.width;
      this.setError();
      return 0;
    },
    rectangleX(): number {
      if (
        typeof this.rectangle.x === "number" &&
        this.rectangle.x > 0 &&
        this.rectangle.x < this.projectInfo.width
      )
        return this.rectangle.x;
      this.setError();
      return 0;
    },
    rectangleY(): number {
      if (
        typeof this.rectangle.y === "number" &&
        this.rectangle.y > 0 &&
        this.rectangle.y < this.projectInfo.height
      )
        return this.rectangle.y;
      this.setError();
      return 0;
    },
    rectangleRotation(): number {
      if (typeof this.rectangle.rotation === "number")
        return this.rectangle.rotation;
      this.setError();
      return 0;
    },
    rectangleColor(): string {
      if (typeof this.rectangle.color === "string") return this.rectangle.color;
      return "black";
    },
    rectangleRotationInRad(): number {
      return (this.rectangleRotation * Math.PI) / 180;
    },
    rectangleStyles(): object {
      return {
        transform: `translate(${this.rectangleX}px, ${
          this.rectangleY
        }px) rotate(${this.rectangleRotation}deg) translate(-${this
          .rectangleWidth / 2}px, -${this.rectangleHeight / 2}px)`,
        transformOrigin: `${this.rectangleX}, ${this.rectangleY}`,
        fill: this.rectangleColor
      };
    },
    boundingBoxHeight(): number {
      return (
        this.rectangleWidth * Math.abs(Math.sin(this.rectangleRotationInRad)) +
        this.rectangleHeight * Math.abs(Math.cos(this.rectangleRotationInRad))
      );
    },
    boundingBoxWidth(): number {
      return (
        this.rectangleWidth * Math.abs(Math.cos(this.rectangleRotationInRad)) +
        this.rectangleHeight * Math.abs(Math.sin(this.rectangleRotationInRad))
      );
    },
    boundingBoxStyles(): object {
      return {
        transform: `translate(${this.rectangle.x}px, ${this.rectangleY}px)
          translate(-${this.boundingBoxWidth / 2}px, -${+this
          .boundingBoxHeight / 2}px)`,
        stroke: `rgb(255, 0, 255)`,
        strokeWidth: 3,
        fill: "none",
        fillOpacity: 0,
        strokeOpacity: 0.5
      };
    },
    ...mapState(["projectInfo"])
  },
  methods: {
    setError() {
      this.$store.commit("setError", true);
    }
  }
});
</script>

<style></style>
