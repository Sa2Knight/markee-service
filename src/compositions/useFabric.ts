import { fabric } from 'fabric'
import { ICircleOptions, ILineOptions, IObjectOptions, IRectOptions, ITextOptions } from 'fabric/fabric-impl'
import { computed, reactive } from 'vue'

export const THEME_COLOR = {
  WHITE: '#ffffff',
  ORANGE: '#f6aa00'
} as const

export default function useFabric(canvasId: string) {
  const canvas = computed<fabric.Canvas>(() => new fabric.Canvas(canvasId))
  const state = reactive({
    selectedObject: null as fabric.Object | null
  })

  const defaultObjectOption = computed<IObjectOptions>(() => ({
    width: canvas.value.getWidth() / 2,
    height: canvas.value.getHeight() / 2,
    radius: canvas.value.getWidth() / 4,
    fill: THEME_COLOR.ORANGE,
    stroke: THEME_COLOR.WHITE,
    strokeWidth: 5
  }))

  const init = (backGroundUrl: string) => {
    fabric.Image.fromURL(backGroundUrl, image => {
      image.scaleToWidth(canvas.value.getWidth())
      canvas.value.setBackgroundImage(image, canvas.value.renderAll.bind(canvas.value))
    })

    canvas.value.on('selection:created', () => updateSelectedObject())
    canvas.value.on('selection:updated', () => updateSelectedObject())
    canvas.value.on('selection:cleared', () => clearSelectedObject())
  }

  const updateSelectedObject = () => {
    state.selectedObject = canvas.value.getActiveObject()
  }

  const clearSelectedObject = () => {
    state.selectedObject = null
  }

  const addObject = (object: fabric.Object) => {
    canvas.value.add(object)
  }

  const removeObject = (object: fabric.Object) => {
    canvas.value.remove(object)
  }

  const removeSelectedObject = () => {
    removeObject(canvas.value.getActiveObject())
    clearSelectedObject()
  }

  const addLine = (options: ILineOptions = {}) => {
    const line = new fabric.Line([100, 200, 400, 600], {
      ...defaultObjectOption.value,
      ...options
    })
    addObject(line)
  }

  const addRect = (options: IRectOptions = {}) => {
    const rect = new fabric.Rect({
      ...defaultObjectOption.value,
      ...options
    })
    addObject(rect)
  }

  const addCircle = (options: ICircleOptions = {}) => {
    const circle = new fabric.Circle({
      ...defaultObjectOption.value,
      ...options
    })
    addObject(circle)
  }

  const addTextBox = (options: ITextOptions = {}) => {
    const textBox = new fabric.Textbox('new text', {
      ...defaultObjectOption.value,
      strokeWidth: 1,
      ...options
    })
    addObject(textBox)
  }

  const fromJSON = (json: string | null) => {
    canvas.value.loadFromJSON(json, () => {})
  }

  const toJSON = () => {
    return JSON.stringify(canvas.value)
  }

  return {
    state,
    canvas,
    init,
    addLine,
    addRect,
    addCircle,
    addTextBox,
    removeSelectedObject,
    fromJSON,
    toJSON
  }
}
