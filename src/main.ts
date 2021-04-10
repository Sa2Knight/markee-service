import { createApp } from 'vue'
import App from './App.vue'

class AppElement extends HTMLElement {
  private div?: HTMLDivElement

  constructor() {
    super()
  }

  connectedCallback() {
    if (!this.div) {
      this.div = document.createElement('div')
      // this.attachShadow({ mode: 'open' })
      // this.shadowRoot?.append(this.div)
      this.append(this.div)
      createApp(App).mount(this.div)
    }
  }
}

customElements.define('markee-service', AppElement)
