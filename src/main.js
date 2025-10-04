import styles from './style.css'
import { PaymentForm } from './payment-form.js'
import { countries } from './countries.js'
import formTemplate from './payment-form.html'

const TEMPLATE = document.createElement('template')
TEMPLATE.innerHTML = formTemplate

export class PaymentFormElement extends HTMLElement {
  constructor() {
    super()
    this.paymentForm = null
    this.isInitialized = false
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    if (this.isInitialized) {
      return
    }

    this.render()
    this.isInitialized = true
  }

  render() {
    // Clear shadow root and render template + styles
    this.shadow.innerHTML = ''

    const styleEl = document.createElement('style')
    styleEl.textContent = styles

    const content = TEMPLATE.content.cloneNode(true)
    this.shadow.appendChild(styleEl)
    this.shadow.appendChild(content)

    this.populateCountries()
    // Initialize PaymentForm with the shadow root as context
    this.paymentForm = new PaymentForm(this.shadow)
  }

  populateCountries() {
    const countrySelect = this.shadow.querySelector('#country')
    const billingCountrySelect = this.shadow.querySelector('#billing-country')

    if (!countrySelect || !billingCountrySelect) {
      return
    }

    const countryOptions = '<option value="">Select Country</option>' +
      countries.map(c => `<option value="${c.code}">${c.name}</option>`).join('')

    countrySelect.innerHTML = countryOptions
    billingCountrySelect.innerHTML = countryOptions
  }
}

// Define the custom element globally without auto-initializing
if (!customElements.get('payment-form')) {
  customElements.define('payment-form', PaymentFormElement)
}

export function registerPaymentForm({ selector = '#app' } = {}) {

  if (!selector) {
    return null
  }

  const container = document.querySelector(selector)
  if (!container) {
    return null
  }

  let formElement = container.querySelector('payment-form')
  if (!formElement) {
    formElement = document.createElement('payment-form')
    container.appendChild(formElement)
  }

  return formElement
}
