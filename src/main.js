import './style.css'
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
  }

  connectedCallback() {
    if (this.isInitialized) {
      return
    }

    this.render()
    this.isInitialized = true
  }

  render() {
    this.innerHTML = ''
    const content = TEMPLATE.content.cloneNode(true)
    this.appendChild(content)
    this.populateCountries()
    this.paymentForm = new PaymentForm(this)
  }

  populateCountries() {
    const countrySelect = this.querySelector('#country')
    const billingCountrySelect = this.querySelector('#billing-country')

    if (!countrySelect || !billingCountrySelect) {
      return
    }

    const countryOptions = '<option value="">Select Country</option>' +
      countries.map(c => `<option value="${c.code}">${c.name}</option>`).join('')

    countrySelect.innerHTML = countryOptions
    billingCountrySelect.innerHTML = countryOptions
  }
}

export function registerPaymentForm({ selector = '#app' } = {}) {
  if (!customElements.get('payment-form')) {
    customElements.define('payment-form', PaymentFormElement)
  }

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

registerPaymentForm()
