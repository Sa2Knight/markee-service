<template>
  <h1>Hello, Fabric!!</h1>
  <button @click="add">Add</button>
  <button @click="save">Save</button>
  <button @click="load">Load</button>
  <div class="wrapper">
    <canvas id="canvas" width="600" height="600" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { fabric } from "fabric";

export default defineComponent({
  setup() {
    const canvas = computed<fabric.Canvas>(() => new fabric.Canvas("canvas"));

    const add = () => {
      canvas.value.add(
        new fabric.Rect({
          top: 100,
          left: 100,
          width: 60,
          height: 60,
          fill: "red",
        })
      );
    };

    const save = () => {
      const canvasState = JSON.stringify(canvas.value);
      localStorage.setItem("state", canvasState);
    };

    const load = () => {
      const canvasState = localStorage.getItem("state");
      canvas.value.loadFromJSON(canvasState, () => console.log("loaded!!"));
    };

    return { add, save, load };
  },
});
</script>

<style scoped>
.wrapper {
  width: 600px;
  height: 600px;
  border: 1px solid;
}
</style>
