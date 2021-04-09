<template>
  <h1>Hello, Fabric!!</h1>
  <button @click="addLine">AddLine</button>
  <button @click="addRect">AddRect</button>
  <button @click="addCircle">AddCircle</button>
  <button @click="addTextBox">addTextBox</button>
  <button @click="save">Save</button>
  <button @click="load">Load</button>
  <button @click="remove">remove</button>
  <div class="wrapper">
    <canvas id="canvas" width="600" height="600" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import useFabric from './compositions/useFabric'

export default defineComponent({
  setup() {
    const fabric = useFabric('canvas')

    onMounted(() => {
      const imageUrl = 'https://storage.googleapis.com/zenn-user-upload/avatar/845fa75ba8.jpeg'
      fabric.setBackgroundImageFromUrl(imageUrl)
    })

    const addLine = () => {
      fabric.addLine()
    }

    const addRect = () => {
      fabric.addRect()
    }

    const addCircle = () => {
      fabric.addCircle()
    }

    const addTextBox = () => {
      fabric.addTextBox()
    }

    const remove = () => {
      fabric.removeSelectedObject()
    }

    const save = () => {
      localStorage.setItem('state', fabric.toJSON())
    }

    const load = () => {
      fabric.fromJSON(localStorage.getItem('state'))
    }

    return { addLine, addTextBox, addRect, addCircle, remove, save, load }
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
