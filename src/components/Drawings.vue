<template>
  <rect
    :width="rectangleWidth"
    :height="rectangleHeight"
    :style="rectangleStyles"
  />
  <rect
    :width="widthOfBoundingBox"
    :height="heightOfBoundingBox"
    :style="stylesOfBoundingBox"
  />
  <circle r="4" fill="rgb(255, 0, 0)" :cx="rectangleX" :cy="rectangleY" />
  <text fill="rgb(255, 255, 255)" :x="rectangleX + 10" :y="rectangleY - 5">
    {{ rectangleRotation }}°
  </text>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["rectangle"],
  computed: {
    rectangleHeight(): number {
      return this.rectangle.height;
    },
    rectangleWidth(): number {
      return this.rectangle.width;
    },
    rectangleX(): string {
      return this.rectangle.x;
    },
    rectangleY(): string {
      return this.rectangle.y;
    },
    rectangleRotation(): number {
      return this.rectangle.rotation;
    },
    rectangleColor(): string {
      return this.rectangle.color;
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
    heightOfBoundingBox(): number {
      return (
        this.rectangleWidth * Math.abs(Math.sin(this.rectangleRotationInRad)) +
        this.rectangleHeight * Math.abs(Math.cos(this.rectangleRotationInRad))
      );
    },
    widthOfBoundingBox(): number {
      return (
        this.rectangleWidth * Math.abs(Math.cos(this.rectangleRotationInRad)) +
        this.rectangleHeight * Math.abs(Math.sin(this.rectangleRotationInRad))
      );
    },
    stylesOfBoundingBox(): object {
      return {
        transform: `translate(${this.rectangle.x}px, ${this.rectangleY}px)
          translate(-${this.widthOfBoundingBox / 2}px, -${+this
          .heightOfBoundingBox / 2}px)`,
        stroke: `rgb(255, 0, 255)`,
        strokeWidth: 3,
        fill: "none",
        fillOpacity: 0,
        strokeOpacity: 0.5
      };
    }
  }
});
</script>

<style></style>
