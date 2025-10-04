import { countries } from './countries.js'
import formTemplate from './payment-form.html'
import { PaymentForm } from './payment-form.js'
import styles from './style.css'

const TEMPLATE = document.createElement('template')
TEMPLATE.innerHTML = formTemplate

export class PaymentFormElement extends HTMLElement {
  constructor () {
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

    // Initialize PaymentForm with the shadow root as context
    const options = this.readOptionsFromAttributes()

    const hasDomain = typeof options.domain === 'string' && options.domain.trim().length > 0
    const hasCurrency = typeof options.currency === 'string' && options.currency.trim().length > 0

    if (!hasDomain || !hasCurrency) {
      // eslint-disable-next-line no-console
      console.warn('[PaymentFormElement] Missing required attributes: domain and currency. Not initializing form.')
      return
    }

    const styleEl = document.createElement('style')
    styleEl.textContent = styles

    const content = TEMPLATE.content.cloneNode(true)
    this.shadow.appendChild(styleEl)
    this.shadow.appendChild(content)

    this.populateCountries()
    this.paymentForm = new PaymentForm(this.shadow, options)
  }

  readOptionsFromAttributes() {
    const attr = (name) => this.getAttribute(name)
    const dataAttr = (name) => this.getAttribute(`data-${name}`)

    // Support both data-* and plain attributes
    const domainRaw = dataAttr('domain') || attr('domain') || undefined
    const currencyRaw = dataAttr('currency') || attr('currency') || undefined

    const domain = typeof domainRaw === 'string' ? domainRaw.trim() : undefined
    const currency = typeof currencyRaw === 'string' ? currencyRaw.trim().toUpperCase() : undefined

    const customer = {
      name: dataAttr('name') || attr('name') || undefined,
      email: dataAttr('email') || attr('email') || undefined,
      phone: dataAttr('phone') || attr('phone') || undefined,
    }

    const basePrice = attr('base-price') ? Number(attr('base-price')) : undefined
    const taxesRate = attr('taxes-rate') ? Number(attr('taxes-rate')) : undefined
    const feeAmount = attr('fee-amount') ? Number(attr('fee-amount')) : undefined

    return { domain, currency, customer, basePrice, taxesRate, feeAmount }
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
