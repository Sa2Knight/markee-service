import { createApp } from 'vue'
import App from './App.vue'

class AppElement extends HTMLElement {
  private div: HTMLDivElement

  constructor() {
    super()
    this.div = document.createElement('div')
    // this.attachShadow({ mode: 'open' })
    // this.shadowRoot?.append(this.div)
    this.append(this.div)
  }

  connectedCallback() {
    createApp(App).mount(this.div)
  }
}

customElements.define('markee-service', AppElement)
