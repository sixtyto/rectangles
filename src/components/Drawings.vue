<template>
  <rect
    :height="rectangleHeight"
    :style="rectangleStyles"
    :width="rectangleWidth"
    @mouseleave="setDrop"
    @touchcancel="setDrop"
    @touchend="setDrop"
    @touchmove="dragTouch"
    @touchstart="setTouchDrag"
    @mousedown.stop="setMouseDrag"
    @mouseup.stop="setDrop"
    @mousemove.stop="dragMouse"
  />
  <rect
    :height="boundingBoxHeight"
    :style="boundingBoxStyles"
    :width="boundingBoxWidth"
  />
  <circle :cx="rectangleX" :cy="rectangleY" fill="red" r="4" />
  <text :fill="textColor" :x="rectangleX + 10" :y="rectangleY - 5">
    {{ rectangleRotation }}°
  </text>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, ref } from "vue";
import { useStore } from "@/store/store";
import { Rectangle } from "@/store/types";
import { SET_ERROR } from "@/store/mutationsTypes";
import useValidatedSize from "@/hooks/useValidatedSize";
import useContrastTextColor from "@/hooks/useContrastTextColor";

export default defineComponent({
  setup(props) {
    const { rectangle } = reactive(props);
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
    const board = reactive({
      width: computed(() => store.getters.boardWidth),
      height: computed(() => store.getters.boardHeight)
    });

    const rectangleHeight = computed(() =>
      useValidatedSize(rectangle.height, board.height)
    );
    const rectangleWidth = computed(() =>
      useValidatedSize(rectangle.width, board.width)
    );

    const rectangleX = computed(
      () => useValidatedSize(rectangle.x, board.width) + offset.x
    );
    const rectangleY = computed(
      () => useValidatedSize(rectangle.y, board.height) + offset.y
    );

    if (
      rectangleHeight.value === 0 ||
      rectangleWidth.value === 0 ||
      rectangleX.value === 0 ||
      rectangleY.value === 0
    )
      setError();

    const rectangleRotation = computed(() => {
      if (typeof rectangle.rotation === "number") return rectangle.rotation;
      setError();
      return 0;
    });

    const rectangleColor = computed(() => {
      if (typeof rectangle.color === "string") return rectangle.color;
      return "#000000";
    });

    const rectangleRotationInRad = computed(() => {
      return (rectangleRotation.value * Math.PI) / 180;
    });

    const rectangleStyles = computed(() => {
      return {
        transform: `translate(${rectangleX.value}px, ${rectangleY.value}px)
        rotate(${rectangleRotation.value}deg)
        translate(-${rectangleWidth.value / 2}px,
                -${rectangleHeight.value / 2}px)`,
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

    const textColor = useContrastTextColor(rectangle.color);

    const boardScale = computed(() => {
      const svgHeight = document
        .querySelector(".board>svg>rect")
        ?.getBoundingClientRect().height;
      if (svgHeight) return board.height / svgHeight;
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
