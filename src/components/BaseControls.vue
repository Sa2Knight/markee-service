<template>
  <form class="rect-controls">
    <div v-if="props.useFontSizeOption" class="control">
      <label>fontSize</label>
      <input type="number" v-model="state.fontSize" min="80" max="120" />
    </div>
    <div v-if="props.useFillOption" class="control">
      <label>fill</label>
      <input type="checkbox" v-model="state.hasFill" />
      <input v-show="state.hasFill" type="color" v-model="state.fillColor" />
    </div>
    <div class="control">
      <label>stroke</label>
      <input type="number" v-model="state.strokeSize" min="0" />
    </div>
    <div class="control">
      <label>strokeColor</label>
      <input type="color" v-model="state.strokeColor" />
    </div>
  </form>
</template>

<script lang="ts">
import { watch, reactive, defineComponent, onUpdated, computed } from '@vue/runtime-core'
import { THEME_COLOR } from '../compositions/useFabric'

type ControlOption = {
  fontSize: number
  hasFill: boolean
  fillColor: string
  strokeSize: number
  strokeColor: string
}

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    useFontSizeOption: {
      type: Boolean,
      default: false
    },
    useFillOption: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const state = reactive<ControlOption>({
      fontSize: 8,
      hasFill: true,
      fillColor: THEME_COLOR.ORANGE,
      strokeSize: 1,
      strokeColor: THEME_COLOR.WHITE
    })

    watch(
      () => props.modelValue,
      () => {
        state.fontSize = props.modelValue.fontSize || 80
        state.hasFill = props.modelValue.hasFill || false
        state.fillColor = props.modelValue.fillColor || THEME_COLOR.ORANGE
        state.strokeSize = props.modelValue.strokeSize || 0
        state.strokeColor = props.modelValue.strokeColor || THEME_COLOR.WHITE
      },
      { immediate: true }
    )

    onUpdated(() => {
      context.emit('update:modelValue', state)
    })

    return { props, state }
  }
})
</script>

<style lang="scss">
.rect-controls {
  display: flex;
  flex-direction: column;
  .control {
    display: flex;
  }
}
</style>
