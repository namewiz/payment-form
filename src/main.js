import formTemplate from './payment-form.html'
import { PaymentForm } from './payment-form.js'
import { normalizeItems } from './cart.js'
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

  // JS property setter: el.items = [{ type: 'domain', ... }]
  set items(value) {
    this._items = Array.isArray(value) ? value : undefined
    if (this.isInitialized && this.paymentForm) {
      this.render()
    }
  }

  get items() {
    return this._items
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

    this.paymentForm = new PaymentForm(this.shadow, options)
  }

  readOptionsFromAttributes() {
    const attr = (name) => this.getAttribute(name)
    const dataAttr = (name) => this.getAttribute(`data-${name}`)

    // Support both data-* and plain attributes
    const domainRaw = dataAttr('domain') || attr('domain') || undefined
    const currencyRaw = dataAttr('currency') || attr('currency') || undefined
    const themeRaw = dataAttr('theme') || attr('theme') || undefined

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

    // New attributes for Phase 1
    const paymentStyleRaw = dataAttr('payment-style') || attr('payment-style') || undefined
    const transactionTypeRaw = dataAttr('transaction-type') || attr('transaction-type') || undefined

    let paymentStyle
    if (typeof paymentStyleRaw === 'string') {
      const ps = paymentStyleRaw.trim().toLowerCase()
      if (ps === 'inline' || ps === 'external') paymentStyle = ps
    }

    let transactionType
    if (typeof transactionTypeRaw === 'string') {
      const tt = transactionTypeRaw.trim().toLowerCase()
      if (tt === 'registration' || tt === 'renewal' || tt === 'transfer') transactionType = tt
    }

    // Parse items from JSON attribute or JS property
    let items
    const itemsRaw = dataAttr('items') || attr('items')
    if (itemsRaw) {
      try {
        items = JSON.parse(itemsRaw)
      } catch {
        // eslint-disable-next-line no-console
        console.warn('[PaymentFormElement] Invalid JSON in items attribute.')
      }
    }
    // JS property takes priority over HTML attribute
    if (this._items) {
      items = this._items
    }

    // Checkout API endpoint for external payment
    const checkoutApi = dataAttr('checkout-api') || attr('checkout-api') || undefined

    // Post-checkout flow (boolean attribute)
    const postCheckout = this.hasAttribute('post-checkout') || this.hasAttribute('data-post-checkout')

    let theme
    if (typeof themeRaw === 'string') {
      const t = themeRaw.trim().toLowerCase()
      if (t === 'light' || t === 'dark') theme = t
      else if (t === 'system' || t === 'system-default') theme = 'system'
    }

    // Normalize into items array (backward compat)
    const normalizedItems = normalizeItems({ items, domain, basePrice, taxesRate, feeAmount, transactionType })

    return { domain, currency, customer, basePrice, taxesRate, feeAmount, theme, items: normalizedItems, paymentStyle, transactionType, checkoutApi, postCheckout }
  }

  completePayment(result) {
    if (this.paymentForm) {
      this.paymentForm.completePayment(result)
    }
  }

}

// Define the custom element globally without auto-initializing
if (!customElements.get('payment-form')) {
  customElements.define('payment-form', PaymentFormElement)
}
