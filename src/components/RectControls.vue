<template>
  <form class="rect-controls">
    <div class="control">
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
    }
  },
  setup(props, context) {
    const state = reactive<ControlOption>({
      hasFill: true,
      fillColor: THEME_COLOR.ORANGE,
      strokeSize: 1,
      strokeColor: THEME_COLOR.WHITE
    })

    watch(
      () => props.modelValue,
      () => {
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

    return { state }
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
