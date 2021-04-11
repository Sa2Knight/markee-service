<template>
  <div class="wrapper">
    <div class="menu">
      <div class="controls">
        <button class="control" @click="fabric.addLine">Line</button>
        <button class="control" @click="() => fabric.addRect()">Rect</button>
        <button class="control" @click="fabric.addCircle">Circle</button>
        <button class="control" @click="fabric.addTextBox">TextBox</button>
        <button class="control" @click="remove">Remove</button>
      </div>
      <div class="options">
        <RectControls v-model="state.controlOptions" />
      </div>
    </div>
    <div class="content" ref="elContent">
      <canvas id="canvas" />
    </div>
    {{ state.controlOptions }}
  </div>
</template>

<script lang="ts">
import { ref, reactive, watch, defineComponent, onMounted, onUpdated } from 'vue'
import useFabric from './compositions/useFabric'
import RectControls from './components/RectControls.vue'

export default defineComponent({
  components: { RectControls },
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
      controlOptions: {} as any
    })

    onMounted(() => {
      console.log(elContent.value?.clientHeight)
      fabric.canvas.value.setWidth(elContent.value?.clientWidth || 300)
      fabric.canvas.value.setHeight(elContent.value?.clientHeight || 300)
      fabric.init(props.url)
    })

    /**
     * コントロールUIからオブジェクト変更反映
     */
    watch(
      () => state.controlOptions,
      option => {
        if (fabric.state.selectedObject) {
          fabric.state.selectedObject.setOptions({
            fill: option.hasFill && option.fillColor,
            strokeWidth: Number(option.strokeSize),
            stroke: option.strokeColor
          })
          fabric.canvas.value.renderAndReset()
        }
      },
      { deep: true }
    )

    /**
     * オブジェクトからコントロールUIへの変更反映
     */
    watch(
      () => fabric.state.selectedObject,
      newObject => {
        if (newObject) {
          state.controlOptions = {
            hasFill: !!newObject.fill,
            fillColor: newObject.fill,
            strokeColor: newObject.stroke,
            strokeSize: newObject.strokeWidth
          }
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
