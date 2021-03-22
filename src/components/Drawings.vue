<template>
  <rect
    :width="rectangleWidth"
    :height="rectangleHeight"
    :style="rectangleStyles"
    @mousedown.stop="setMouseDrag"
    @mouseleave="setDrop"
    @mouseup.stop="setDrop"
    @mousemove.stop="dragMouse"
    @touchstart="setTouchDrag"
    @touchcancel="setDrop"
    @touchend="setDrop"
    @touchmove="dragTouch"
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
import { computed, defineComponent, PropType, reactive, ref } from "vue";
import { useStore } from "@/store/store";
import { Rectangle } from "@/store/types";
import { SET_ERROR } from "@/store/mutationsTypes";

export default defineComponent({
  setup(props) {
    const store = useStore();
    const setError = () => store.commit(SET_ERROR, true);
    const draggable = ref(false);
    const offset = reactive({
      x: 0,
      y: 0
    });
    const mouse = reactive({
      x: 0,
      y: 0
    });
    const boardWidth = computed(() => store.getters.boardWidth);
    const boardHeight = computed(() => store.getters.boardHeight);

    const rectangleHeight = computed(() => {
      if (
        typeof props.rectangle.height === "number" &&
        props.rectangle.height > 0 &&
        props.rectangle.height < boardHeight.value
      )
        return props.rectangle.height;
      setError();
      return 0;
    });

    const rectangleWidth = computed(() => {
      if (
        typeof props.rectangle.width === "number" &&
        props.rectangle.width > 0 &&
        props.rectangle.width < boardWidth.value
      )
        return props.rectangle.width;
      setError();
      return 0;
    });

    const rectangleX = computed(() => {
      if (
        typeof props.rectangle.x === "number" &&
        props.rectangle.x > 0 &&
        props.rectangle.x < boardWidth.value
      )
        return props.rectangle.x + offset.x;
      setError();
      return 0;
    });

    const rectangleY = computed(() => {
      if (
        typeof props.rectangle.y === "number" &&
        props.rectangle.y > 0 &&
        props.rectangle.y < boardHeight.value
      )
        return props.rectangle.y + offset.y;
      setError();
      return 0;
    });

    const rectangleRotation = computed(() => {
      if (typeof props.rectangle.rotation === "number")
        return props.rectangle.rotation;
      setError();
      return 0;
    });

    const rectangleColor = computed(() => {
      if (typeof props.rectangle.color === "string")
        return props.rectangle.color;
      return "#000000";
    });

    const rectangleRotationInRad = computed(() => {
      return (rectangleRotation.value * Math.PI) / 180;
    });

    const rectangleStyles = computed(() => {
      return {
        transform: `translate(${rectangleX.value}px, ${
          rectangleY.value
        }px) rotate(${
          rectangleRotation.value
        }deg) translate(-${rectangleWidth.value /
          2}px, -${rectangleHeight.value / 2}px)`,
        transformOrigin: `${rectangleX.value}, ${rectangleY.value}`,
        fill: rectangleColor.value
      };
    });

    const boundingBoxHeight = computed(() => {
      return (
        rectangleWidth.value *
          Math.abs(Math.sin(rectangleRotationInRad.value)) +
        rectangleHeight.value * Math.abs(Math.cos(rectangleRotationInRad.value))
      );
    });

    const boundingBoxWidth = computed(() => {
      return (
        rectangleWidth.value *
          Math.abs(Math.cos(rectangleRotationInRad.value)) +
        rectangleHeight.value * Math.abs(Math.sin(rectangleRotationInRad.value))
      );
    });

    const boundingBoxStyles = computed(() => {
      return {
        transform: `
          translate(${rectangleX.value - boundingBoxWidth.value / 2}px,
          ${rectangleY.value - boundingBoxHeight.value / 2}px)`,
        stroke: `rgb(255, 0, 255)`,
        strokeWidth: 3,
        fill: "none",
        fillOpacity: 0,
        strokeOpacity: 0.5
      };
    });

    const textColor = computed(() => {
      const red = parseInt(props.rectangle.color.slice(1, 3), 16) / 255;
      const green = parseInt(props.rectangle.color.slice(3, 5), 16) / 255;
      const blue = parseInt(props.rectangle.color.slice(5, 7), 16) / 255;
      const cmin = Math.min(red, green, blue);
      const cmax = Math.max(red, green, blue);
      const l = (cmax + cmin) / 2;
      return l < 0.6 ? "white" : "black";
    });

    const boardScale = computed(() => {
      const svgHeight = document
        .querySelector(".board>svg>rect")
        ?.getBoundingClientRect().height;
      if (svgHeight) return boardHeight.value / svgHeight;
      return 1;
    });

    const setMouseDrag = (e: MouseEvent) => {
      draggable.value = true;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const setTouchDrag = (e: TouchEvent) => {
      draggable.value = true;
      mouse.x = e.changedTouches[0].clientX;
      mouse.y = e.changedTouches[0].clientY;
    };

    const setDrop = () => {
      draggable.value = false;
    };

    const dragMouse = (e: MouseEvent) => {
      if (draggable.value) {
        const dx = e.clientX - mouse.x;
        const dy = e.clientY - mouse.y;
        offset.x += dx * boardScale.value;
        offset.y += dy * boardScale.value;
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }
    };

    const dragTouch = (e: TouchEvent) => {
      if (draggable.value) {
        const dx = e.changedTouches[0].clientX - mouse.x;
        const dy = e.changedTouches[0].clientY - mouse.y;
        offset.x += dx * boardScale.value;
        offset.y += dy * boardScale.value;
        mouse.x = e.changedTouches[0].clientX;
        mouse.y = e.changedTouches[0].clientY;
      }
    };

    return {
      rectangleHeight,
      rectangleWidth,
      rectangleRotation,
      rectangleStyles,
      rectangleX,
      rectangleY,
      textColor,
      boundingBoxHeight,
      boundingBoxWidth,
      boundingBoxStyles,
      setError,
      setMouseDrag,
      setTouchDrag,
      setDrop,
      dragMouse,
      dragTouch
    };
  },
  props: {
    rectangle: {
      type: Object as PropType<Rectangle>,
      required: true
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
