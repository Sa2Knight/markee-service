import { fabric } from 'fabric'
import { IRectOptions } from 'fabric/fabric-impl'
import { computed } from 'vue'

export default function useFabric(canvasId: string) {
  const canvas = computed<fabric.Canvas>(() => new fabric.Canvas(canvasId))

  const addObject = (object: fabric.Object) => {
    canvas.value.add(object)
  }

  const addRect = (options: IRectOptions) => {
    const rect = new fabric.Rect(options)
    addObject(rect)
  }

  const setBackgroundImageFromUrl = (url: string) => {
    fabric.Image.fromURL(url, image => {
      image.scaleToWidth(canvas.value.getWidth())
      canvas.value.setBackgroundImage(image, canvas.value.renderAll.bind(canvas.value))
    })
  }

  const fromJSON = (json: string | null) => {
    canvas.value.loadFromJSON(json, () => {})
  }

  const toJSON = () => {
    return JSON.stringify(canvas.value)
  }

  return { addRect, setBackgroundImageFromUrl, fromJSON, toJSON }
}
