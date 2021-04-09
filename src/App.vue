<template>
  <button @click="fabric.addLine">Line</button>
  <button @click="() => fabric.addRect({ fill: state.color })">Rect</button>
  <button @click="fabric.addCircle">Circle</button>
  <button @click="fabric.addTextBox">TextBox</button>
  <button @click="save">Save</button>
  <button @click="load">Load</button>
  <button @click="remove">remove</button>
  <input type="color" v-model="state.color" />
  <div class="wrapper">
    <canvas id="canvas" width="600" height="600" />
  </div>
</template>

<script lang="ts">
import { reactive, watch, defineComponent, onMounted } from 'vue'
import useFabric from './compositions/useFabric'
import { THEME_COLOR } from './compositions/useFabric'

export default defineComponent({
  setup() {
    const fabric = useFabric('canvas')
    const state = reactive({
      color: THEME_COLOR.ORANGE as string
    })

    onMounted(() => {
      fabric.init('https://storage.googleapis.com/zenn-user-upload/avatar/845fa75ba8.jpeg')
    })

    watch(
      () => state.color,
      newColor => {
        if (fabric.state.selectedObject) {
          fabric.state.selectedObject.setOptions({ fill: newColor })
          fabric.canvas.value.renderAndReset()
        }
      }
    )

    watch(
      () => fabric.state.selectedObject,
      newObject => {
        if (typeof newObject?.fill === 'string') {
          state.color = newObject.fill
        }
      }
    )

    const save = () => {
      localStorage.setItem('state', fabric.toJSON())
    }

    const load = () => {
      fabric.fromJSON(localStorage.getItem('state'))
    }

    const remove = () => {
      fabric.removeSelectedObject()
    }

    return { state, fabric, save, load, remove }
  }
})
</script>

<style scoped>
.wrapper {
  width: 600px;
  height: 600px;
  border: 1px solid;
}
</style>
