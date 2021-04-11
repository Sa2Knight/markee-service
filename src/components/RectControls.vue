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
import { reactive, defineComponent, onUpdated, computed } from '@vue/runtime-core'
import { THEME_COLOR } from '../compositions/useFabric'

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },
  setup(props, context) {
    const state = reactive({
      hasFill: props.modelValue.hasFill || false,
      fillColor: props.modelValue.fillColor || THEME_COLOR.ORANGE,
      strokeSize: props.modelValue.strokeSize || 0,
      strokeColor: props.modelValue.strokeColor || THEME_COLOR.ORANGE
    })

    const strokeSizeNumber = computed(() => Number(state.strokeSize))

    onUpdated(() => context.emit('update:modelValue', state))

    return { state, strokeSizeNumber }
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
