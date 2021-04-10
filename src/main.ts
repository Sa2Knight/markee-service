import { createApp } from 'vue'
import App from './App.vue'

class AppElement extends HTMLElement {
  private rootDiv?: HTMLDivElement
  constructor() {
    super()
  }

  connectedCallback() {
    if (!this.rootDiv) {
      this.rootDiv = document.createElement('div')
      this.rootDiv.style.width = '100%'
      this.rootDiv.style.height = '100%'
      // this.attachShadow({ mode: 'open' })
      // this.shadowRoot?.append(this.div)
      this.append(this.rootDiv)
      createApp(App, {
        url: this.getAttribute('url') as string,
        onSave: (data: string) => {
          this.dispatchEvent(new CustomEvent('onSave', { detail: data }))
        }
      }).mount(this.rootDiv)
    }
  }
}

customElements.define('markee-service', AppElement)
