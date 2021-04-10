import { createApp } from 'vue'
import App from './App.vue'

class AppElement extends HTMLElement {
  private rootDiv?: HTMLDivElement
  private url: string

  constructor() {
    super()
    this.url = this.getAttribute('url') as string
  }

  connectedCallback() {
    if (!this.rootDiv) {
      this.rootDiv = document.createElement('div')
      // this.attachShadow({ mode: 'open' })
      // this.shadowRoot?.append(this.div)
      this.append(this.rootDiv)
      createApp(App, {
        url: this.url,
        onSave: (data: string) => {
          this.dispatchEvent(new CustomEvent('onSave', { detail: data }))
        }
      }).mount(this.rootDiv)
    }
  }
}

customElements.define('markee-service', AppElement)
