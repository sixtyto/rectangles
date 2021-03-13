<template>
  <rect
    :width="rectangleWidth"
    :height="rectangleHeight"
    :style="rectangleStyles"
    @mousedown.stop="setDrag"
    @mouseleave="setDrop"
    @mouseup.stop="setDrop"
    @mousemove.stop="drag"
  />
  <rect
    :width="boundingBoxWidth"
    :height="boundingBoxHeight"
    :style="boundingBoxStyles"
  />
  <circle r="4" fill="red" :cx="rectangleX" :cy="rectangleY" />
  <text :fill="textColor" :x="rectangleX + 10" :y="rectangleY - 5">
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
  data: () => ({
    draggable: false,
    offsetX: 0,
    offsetY: 0,
    mouseX: 0,
    mouseY: 0
  }),
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
        return this.rectangle.x + this.offsetX;
      this.setError();
      return 0;
    },
    rectangleY(): number {
      if (
        typeof this.rectangle.y === "number" &&
        this.rectangle.y > 0 &&
        this.rectangle.y < this.projectInfo.height
      )
        return this.rectangle.y + this.offsetY;
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
      return "#000000";
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
        transform: `translate(${this.rectangleX}px, ${this.rectangleY}px)
          translate(-${this.boundingBoxWidth / 2}px, -${+this
          .boundingBoxHeight / 2}px)`,
        stroke: `rgb(255, 0, 255)`,
        strokeWidth: 3,
        fill: "none",
        fillOpacity: 0,
        strokeOpacity: 0.5
      };
    },
    textColor(): string {
      const red = parseInt(this.rectangle.color.slice(1, 3), 16) / 255;
      const green = parseInt(this.rectangle.color.slice(3, 5), 16) / 255;
      const blue = parseInt(this.rectangle.color.slice(5, 7), 16) / 255;
      const cmin = Math.min(red, green, blue);
      const cmax = Math.max(red, green, blue);
      const l = (cmax + cmin) / 2;
      return l < 0.6 ? "white" : "black";
    },
    boardScale(): number {
      if (this.projectInfo.width > this.projectInfo.height) {
        return this.projectInfo.width / (window.innerWidth - 20);
      }
      return this.projectInfo.height / (window.innerHeight - 180);
    },
    ...mapState(["projectInfo"])
  },
  methods: {
    setError() {
      this.$store.commit("setError", true);
    },
    setDrag(e: any) {
      this.draggable = true;
      this.mouseX = e.layerX;
      this.mouseY = e.layerY;
    },
    setDrop() {
      this.draggable = false;
    },
    drag(e: any) {
      if (this.draggable) {
        const dx = e.layerX - this.mouseX;
        const dy = e.layerY - this.mouseY;
        this.offsetX += dx * this.boardScale;
        this.offsetY += dy * this.boardScale;
        this.mouseX = e.layerX;
        this.mouseY = e.layerY;
      }
    }
  }
});
</script>

<style scoped>
text {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
