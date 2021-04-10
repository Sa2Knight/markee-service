<template>
  <div class="wrapper">
    <div class="menu">
      <div class="controls">
        <button class="control" @click="fabric.addLine">Line</button>
        <button class="control" @click="() => fabric.addRect({ fill: state.color })">Rect</button>
        <button class="control" @click="fabric.addCircle">Circle</button>
        <button class="control" @click="fabric.addTextBox">TextBox</button>
        <button class="control" @click="remove">Remove</button>
      </div>
      <div class="options">
        <input type="color" v-model="state.color" />
      </div>
    </div>
    <div class="content" ref="elContent">
      <canvas id="canvas" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, reactive, watch, defineComponent, onMounted } from 'vue'
import useFabric from './compositions/useFabric'
import { THEME_COLOR } from './compositions/useFabric'

export default defineComponent({
  props: {
    url: {
      type: String,
      required: true
    },
    onSave: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const fabric = useFabric('canvas')
    const elContent = ref<HTMLDivElement | null>(null)
    const state = reactive({
      color: THEME_COLOR.ORANGE as string
    })

    onMounted(() => {
      console.log(elContent.value?.clientHeight)
      fabric.canvas.value.setWidth(elContent.value?.clientWidth || 300)
      fabric.canvas.value.setHeight(elContent.value?.clientHeight || 300)
      fabric.init(props.url)
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
      props.onSave(fabric.toBase64())
    }

    const remove = () => {
      fabric.removeSelectedObject()
    }

    return { elContent, state, fabric, save, remove }
  }
})
</script>

<style lang="scss">
.wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  .menu {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 20%;
    height: 100%;
    .controls {
      .control {
        width: 100%;
      }
    }
  }
  .content {
    width: 80%;
    height: 100%;
  }
}
</style>
