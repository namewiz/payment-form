import { countries } from './countries.js'
import { computeCartTotals, renderCartHTML, renderCartTotalsHTML } from './cart.js'

export class PaymentForm {
  constructor (rootElement = document, options = {}) {
    this.root = rootElement
    this.pipeline = ['cart', 'customer', 'payment', 'processing']
    this.currentStep = 'cart'
    this.formData = {}
    this.config = {
      // domain, currency are required, do not render form without them.
      domain: (typeof options.domain === 'string' && options.domain.trim()) ? options.domain.trim() : undefined,
      currency: (typeof options.currency === 'string' && options.currency.trim()) ? options.currency.toUpperCase().trim() : undefined,
      basePrice: typeof options.basePrice === 'number' ? options.basePrice : 12.0,
      taxesRate: typeof options.taxesRate === 'number' ? options.taxesRate : 0.075,
      feeAmount: typeof options.feeAmount === 'number' ? options.feeAmount : 1.5,
      customer: options.customer || {},
      items: options.items || [],
      paymentStyle: options.paymentStyle || 'inline',
      transactionType: options.transactionType || 'registration',
      // theme: 'light' | 'dark' | 'system' (default)
      theme: (() => {
        const t = typeof options.theme === 'string' ? options.theme.trim().toLowerCase() : undefined
        if (t === 'light' || t === 'dark') return t
        return 'system'
      })()
    }
    // If required config is missing, do not render the form UI
    if (!this.config.domain || !this.config.currency) {
      throw new Error('PaymentForm: domain and currency are required configuration options')
    }

    this.currencySymbol = this.getCurrencySymbol(this.config.currency)
    this.skipCustomerStep = false

    this.initTheme()
    this.initEventListeners()
    this.populateCountries()

    // Initialize UI state
    this.renderProgressBar()
    this.prefillCustomerInfo()
    this.renderCart()
    this.computeAndRenderOrderSummary()
    // Analytics: mark form viewed if gtag is available
    this.trackEvent && this.trackEvent('payment_form_viewed', {
      domain: this.config.domain,
      currency: this.config.currency
    })
  }

  getElement(selector) {
    return this.root?.querySelector(selector)
  }

  initTheme() {
    const themeTarget = this.root?.host || document.documentElement
    const systemDefault = (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ? 'dark'
      : 'light'
    const desired = (this.config.theme === 'light' || this.config.theme === 'dark')
      ? this.config.theme
      : systemDefault
    themeTarget.setAttribute('data-theme', desired)
  }

  initEventListeners() {
    const nextCart = this.getElement('#next-step-cart')
    if (nextCart) nextCart.addEventListener('click', () => this.nextStep())

    const nextCustomer = this.getElement('#next-step-customer')
    if (nextCustomer) nextCustomer.addEventListener('click', () => this.validateAndNextStep('customer'))

    const prevCustomer = this.getElement('#prev-step-customer')
    if (prevCustomer) prevCustomer.addEventListener('click', () => this.prevStep())

    const prevPayment = this.getElement('#prev-step-payment')
    if (prevPayment) prevPayment.addEventListener('click', () => this.prevStep())

    const formEl = this.getElement('#payment-form')
    if (formEl) formEl.addEventListener('submit', (e) => this.handleSubmit(e))

    const separateBilling = this.getElement('#separate-billing')
    if (separateBilling) separateBilling.addEventListener('change', (e) => {
      const billingFields = this.getElement('#billing-address-fields')
      if (e.target.checked) {
        billingFields.classList.add('show')
        this.setBillingFieldsRequired(true)
      } else {
        billingFields.classList.remove('show')
        this.setBillingFieldsRequired(false)
        this.clearBillingErrors()
      }
    })

    this.setupCardFormatting()
  }

  populateCountries() {
    const countrySelect = this.getElement('#country')
    const billingCountrySelect = this.getElement('#billing-country')
    if (!countrySelect && !billingCountrySelect) return

    const buildOptions = () => {
      const base = [{ code: '', name: 'Select Country' }, ...countries]
      return base.map(c => `<option value="${c.code}">${c.name}</option>`).join('')
    }

    const optionsHtml = buildOptions()
    if (countrySelect && countrySelect.options.length === 0) {
      countrySelect.innerHTML = optionsHtml
    }
    if (billingCountrySelect && billingCountrySelect.options.length === 0) {
      billingCountrySelect.innerHTML = optionsHtml
    }
  }

  // ---------- Analytics helpers ----------
  gtagAvailable() {
    return (typeof window !== 'undefined' && typeof window.gtag === 'function')
  }

  trackEvent(eventName, params = {}) {
    if (!this.gtagAvailable()) return false
    try {
      window.gtag('event', eventName, params)
      return true
    } catch (e) {
      return false
    }
  }

  getCurrencySymbol(code) {
    const map = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      NGN: '₦',
      GHS: '₵',
      KES: 'KSh',
      ZAR: 'R'
    }
    return map[code] || code + ' '
  }

  prefillCustomerInfo() {
    const { name, email, phone } = this.config.customer || {}

    const setVal = (selector, value) => {
      const el = this.getElement(selector)
      if (!el || value == null || value === '') return false
      el.value = value
      el.setAttribute('readonly', 'readonly')
      el.setAttribute('aria-readonly', 'true')
      el.classList.add('prefilled')
      return true
    }

    const haveName = setVal('#full-name', name)
    const haveEmail = setVal('#email', email)
    const havePhone = setVal('#phone', phone)

    // If all are provided, skip user info step
    this.skipCustomerStep = !!(haveName && haveEmail && havePhone)
  }

  computeAndRenderOrderSummary() {
    this.orderTotals = computeCartTotals(this.config.items)
    const totalsEl = this.getElement('#cart-totals')
    if (totalsEl) {
      totalsEl.innerHTML = renderCartTotalsHTML(this.orderTotals, this.currencySymbol)
    }
  }

  renderCart() {
    const container = this.getElement('#cart-items')
    if (!container) return

    container.innerHTML = renderCartHTML(this.config.items, this.currencySymbol)

    // Wire up year selectors
    container.querySelectorAll('.cart-year-select').forEach((select) => {
      select.addEventListener('change', (e) => {
        const index = parseInt(e.target.dataset.index)
        this.config.items[index].years = parseInt(e.target.value)
        this.renderCart()
        this.computeAndRenderOrderSummary()
      })
    })

    // Wire up remove buttons
    container.querySelectorAll('.cart-remove-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index)
        if (this.config.items.length <= 1) return
        this.config.items.splice(index, 1)
        this.renderCart()
        this.computeAndRenderOrderSummary()
      })
    })
  }

  setItems(items) {
    this.config.items = items
    this.renderCart()
    this.computeAndRenderOrderSummary()
  }

  renderProgressBar() {
    const bar = this.getElement('.progress-bar')
    if (!bar) return
    bar.innerHTML = this.pipeline
      .map((name) => `<div class="progress-step${name === this.currentStep ? ' active' : ''}" data-step="${name}"></div>`)
      .join('')
  }

  setupCardFormatting() {
    const cardNumber = this.getElement('#card-number')
    const expiryDate = this.getElement('#expiry-date')
    const cvc = this.getElement('#cvc')

    cardNumber.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\s/g, '')
      value = value.replace(/\D/g, '')
      value = value.substring(0, 16)

      const formatted = value.match(/.{1,4}/g)?.join(' ') || value
      e.target.value = formatted
    })

    expiryDate.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '')

      if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4)
      }

      e.target.value = value
    })

    cvc.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4)
    })

    const phone = this.getElement('#phone')
    phone.addEventListener('input', (e) => {
      let value = e.target.value.replace(/[^\d+\s()-]/g, '')
      e.target.value = value
    })
  }

  setBillingFieldsRequired(required) {
    const billingFields = [
      'billing-address-line1',
      'billing-state',
      'billing-zip',
      'billing-country'
    ]

    billingFields.forEach(fieldId => {
      const field = this.getElement(`#${fieldId}`)
      if (required) {
        field.setAttribute('required', 'required')
        field.setAttribute('aria-required', 'true')
      } else {
        field.removeAttribute('required')
        field.removeAttribute('aria-required')
      }
    })
  }

  clearBillingErrors() {
    const billingFields = [
      'billing-address-line1',
      'billing-state',
      'billing-zip',
      'billing-country'
    ]

    billingFields.forEach(fieldId => {
      const field = this.getElement(`#${fieldId}`)
      const errorMsg = this.getElement(`#${fieldId}-error`)
      field.classList.remove('error')
      if (errorMsg) {
        errorMsg.classList.remove('show')
      }
    })
  }

  validateStep(step) {
    let isValid = true
    const fieldsToValidate = this.getFieldsForStep(step)

    fieldsToValidate.forEach(fieldId => {
      const field = this.getElement(`#${fieldId}`)
      const errorMsg = this.getElement(`#${fieldId}-error`)

      field.classList.remove('error')
      if (errorMsg) {
        errorMsg.classList.remove('show')
      }

      if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false
        field.classList.add('error')
        if (errorMsg) {
          errorMsg.classList.add('show')
        }
      } else if (field.type === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(field.value.trim())) {
          isValid = false
          field.classList.add('error')
          if (errorMsg) {
            errorMsg.textContent = 'Please enter a valid email address'
            errorMsg.classList.add('show')
          }
        }
      } else if (fieldId === 'card-number' && field.value.trim()) {
        const cardValue = field.value.replace(/\s/g, '')
        if (cardValue.length < 13 || cardValue.length > 19) {
          isValid = false
          field.classList.add('error')
          if (errorMsg) {
            errorMsg.classList.add('show')
          }
        }
      } else if (fieldId === 'expiry-date' && field.value.trim()) {
        const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/
        if (!expiryRegex.test(field.value)) {
          isValid = false
          field.classList.add('error')
          if (errorMsg) {
            errorMsg.textContent = 'Please enter valid expiry (MM/YY)'
            errorMsg.classList.add('show')
          }
        } else {
          const [month, year] = field.value.split('/')
          const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1)
          const today = new Date()
          today.setDate(1)

          if (expiry < today) {
            isValid = false
            field.classList.add('error')
            if (errorMsg) {
              errorMsg.textContent = 'Card has expired'
              errorMsg.classList.add('show')
            }
          }
        }
      } else if (fieldId === 'cvc' && field.value.trim()) {
        if (field.value.length < 3 || field.value.length > 4) {
          isValid = false
          field.classList.add('error')
          if (errorMsg) {
            errorMsg.classList.add('show')
          }
        }
      }
    })

    if (!isValid) {
      const firstError = this.root.querySelector('.error')
      if (firstError) {
        firstError.focus()
      }
    }

    return isValid
  }

  getFieldsForStep(step) {
    if (step === 'customer') {
      return [
        'full-name',
        'email',
        'phone',
        'address-line1',
        'state',
        'zip',
        'country'
      ]
    } else if (step === 'payment') {
      const fields = [
        'card-number',
        'expiry-date',
        'cvc'
      ]

      const separateBilling = this.getElement('#separate-billing')
      if (separateBilling && separateBilling.checked) {
        fields.push(
          'billing-address-line1',
          'billing-state',
          'billing-zip',
          'billing-country'
        )
      }
      return fields
    }
    return []
  }

  collectFormData() {
    const discountCode = this.getElement('#discount-code')?.value?.trim() || ''
    this.formData = {
      order: {
        domain: this.config.domain,
        currency: this.config.currency,
        items: this.config.items,
        discountCode,
        totals: this.orderTotals
      },
      userInfo: {
        fullName: this.getElement('#full-name').value.trim(),
        email: this.getElement('#email').value.trim(),
        phone: this.getElement('#phone').value.trim(),
        address: {
          line1: this.getElement('#address-line1').value.trim(),
          state: this.getElement('#state').value.trim(),
          zip: this.getElement('#zip').value.trim(),
          country: this.getElement('#country').value
        }
      },
      paymentInfo: {
        cardNumber: this.getElement('#card-number').value.replace(/\s/g, ''),
        expiryDate: this.getElement('#expiry-date').value,
        cvc: this.getElement('#cvc').value
      }
    }

    const separateBilling = this.getElement('#separate-billing').checked

    if (separateBilling) {
      this.formData.paymentInfo.billingAddress = {
        line1: this.getElement('#billing-address-line1').value.trim(),
        state: this.getElement('#billing-state').value.trim(),
        zip: this.getElement('#billing-zip').value.trim(),
        country: this.getElement('#billing-country').value
      }
    } else {
      this.formData.paymentInfo.billingAddress = this.formData.userInfo.address
    }

    this.formData.paymentInfo.separateBillingAddress = separateBilling
  }

  validateAndNextStep(currentStep) {
    if (this.validateStep(currentStep)) {
      this.collectFormData()
      this.nextStep()
    }
  }

  nextStep() {
    const currentIndex = this.pipeline.indexOf(this.currentStep)
    if (currentIndex < 0 || currentIndex >= this.pipeline.length - 1) return

    let nextName = this.pipeline[currentIndex + 1]

    // Skip customer step if fully prefilled
    if (nextName === 'customer' && this.skipCustomerStep) {
      const skipIndex = currentIndex + 2
      if (skipIndex < this.pipeline.length) {
        nextName = this.pipeline[skipIndex]
      }
    }

    this.collectFormData()
    this.goToStep(nextName)
  }

  prevStep() {
    const currentIndex = this.pipeline.indexOf(this.currentStep)
    if (currentIndex <= 0) return

    let prevName = this.pipeline[currentIndex - 1]

    // Skip customer step backward if fully prefilled
    if (prevName === 'customer' && this.skipCustomerStep) {
      const skipIndex = currentIndex - 2
      if (skipIndex >= 0) {
        prevName = this.pipeline[skipIndex]
      }
    }

    this.goToStep(prevName)
  }

  goToStep(step) {
    this.root.querySelectorAll('.form-step').forEach(stepEl => {
      stepEl.classList.remove('active')
    })

    const targetStep = this.root.querySelector(`.form-step[data-step="${step}"]`)
    if (targetStep) targetStep.classList.add('active')

    const stepIndex = this.pipeline.indexOf(step)
    this.root.querySelectorAll('.progress-step').forEach(progressStep => {
      const progressIndex = this.pipeline.indexOf(progressStep.getAttribute('data-step'))
      progressStep.classList.remove('active', 'completed')

      if (progressIndex === stepIndex) {
        progressStep.classList.add('active')
      } else if (progressIndex < stepIndex) {
        progressStep.classList.add('completed')
      }
    })

    this.currentStep = step

    window.scrollTo({ top: 0, behavior: 'smooth' })

    // Analytics
    this.trackEvent('payment_form_step_viewed', {
      step: stepIndex,
      step_name: step,
      domain: this.config.domain,
      currency: this.config.currency
    })

    // When payment step is shown, mark begin_checkout (GA4 recommendation)
    if (step === 'payment') {
      const value = this.orderTotals?.total || 0
      this.trackEvent('begin_checkout', {
        value,
        currency: this.config.currency,
        items: this.config.items.map((item) => ({
          item_id: item.name,
          item_name: item.type + ' ' + item.action,
          price: item.unitPrice * item.years,
          quantity: 1
        }))
      })
    }
  }

  async handleSubmit(e) {
    e.preventDefault()

    // Validate payment step fields
    if (!this.validateStep('payment')) {
      return
    }

    const submitButton = this.getElement('#submit-form')
    const submitText = this.getElement('#submit-text')
    if (submitButton) submitButton.disabled = true
    if (submitButton) submitButton.classList.add('loading')
    if (submitText) submitText.textContent = 'Processing...'

    this.collectFormData()
    // Analytics: add_payment_info (GA4 recommendation)
    const apValue = this.orderTotals?.total || 0
    const discountCode = this.formData?.order?.discountCode || ''
    this.trackEvent('add_payment_info', {
      payment_type: 'card',
      value: apValue,
      currency: this.config.currency,
      coupon: discountCode || undefined,
      items: this.config.items.map((item) => ({
        item_id: item.name,
        item_name: item.type + ' ' + item.action,
        price: item.unitPrice * item.years,
        quantity: 1
      }))
    })

    // Move to processing step and kick off simulated flow
    this.goToStep('processing')
    await this.processPaymentFlow()
  }

  async processPaymentFlow() {
    const setStatus = (text) => {
      const el = this.getElement('#status-text')
      if (el) el.textContent = text
    }

    // 1) Fetch reCAPTCHA v3 token (simulate)
    setStatus('Securing session...')
    const recaptchaToken = await new Promise((resolve) => setTimeout(() => resolve('recaptcha_dummy_token'), 1000))
    this.trackEvent('payment_milestone', { milestone: 'recaptcha_token_obtained' })

    // 2) Create payment intent (simulate ~5s)
    setStatus('Creating payment intent...')
    const paymentIntentId = await new Promise((resolve) => setTimeout(() => resolve('pi_simulated_' + Math.random().toString(36).slice(2, 8)), 5000))
    this.trackEvent('payment_milestone', {
      milestone: 'payment_intent_created',
      payment_intent_id: paymentIntentId
    })

    // 3) Charge via Stripe (simulate)
    setStatus('Charging card...')
    this.trackEvent('payment_milestone', { milestone: 'charge_attempt_started' })
    await new Promise((resolve) => setTimeout(resolve, 1200))
    this.trackEvent('payment_milestone', { milestone: 'charge_succeeded' })

    // 4) Finalize and register domain (~15s) with rolling statuses
    const steps = [
      'Verifying payment',
      'Setting up user account',
      'Acquiring domain',
      'Sending confirmation email',
      'Setting up DNS records',
      'Putting the finishing touches'
    ]
    const perStep = 15000 / steps.length
    for (const s of steps) {
      setStatus(s + '...')
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, perStep))
      this.trackEvent('payment_milestone', {
        milestone: s.toLowerCase().replace(/\s+/g, '_')
      })
    }

    // Success summary
    const txnId = 'txn_' + Math.random().toString(36).slice(2, 10)
    const years = this.config.items.length > 0 ? this.config.items[0].years : 1
    const statusContainer = this.getElement('#status-content')
    if (statusContainer) {
      statusContainer.innerHTML = `
        <div class="confirmation-icon" aria-hidden="true">✓</div>
        <h2>Payment complete</h2>
        <p>Your domain purchase was successful.</p>
        <div class="summary-section">
          <div class="summary-item">
            <span class="summary-label">Domain</span>
            <span class="summary-value">${this.config.domain}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Period</span>
            <span class="summary-value">${years === 1 ? '1 year' : years + ' years'}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Amount</span>
            <span class="summary-value">${this.getCurrencySymbol(this.config.currency)}${this.orderTotals.total.toFixed(2)}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Payment Intent</span>
            <span class="summary-value">${paymentIntentId}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Transaction</span>
            <span class="summary-value">${txnId}</span>
          </div>
        </div>
        <p>We’ll email you next steps and credentials. You can now close this window.</p>
        <button type="button" class="btn-primary" id="close-payment-form">Close</button>
      `

      const closeBtn = this.getElement('#close-payment-form')
      if (closeBtn) closeBtn.addEventListener('click', () => this.closeForm())
    }

    // Analytics: purchase (GA4 recommendation)
    const value = this.orderTotals?.total || 0
    const coupon = this.formData?.order?.discountCode || ''
    this.trackEvent('purchase', {
      transaction_id: txnId,
      value,
      currency: this.config.currency,
      coupon: coupon || undefined,
      items: this.config.items.map((item) => ({
        item_id: item.name,
        item_name: item.type + ' ' + item.action,
        price: item.unitPrice * item.years,
        quantity: 1
      }))
    })
  }

  closeForm() {
    // If running within a custom element, remove it. Otherwise hide container.
    const host = this.root.host
    if (host && typeof host.remove === 'function') {
      this.trackEvent('payment_form_closed', {
        domain: this.config.domain,
        currency: this.config.currency
      })
      host.remove()
      return
    }
    const container = this.getElement('.payment-form-container')
    if (container) {
      this.trackEvent('payment_form_closed', {
        domain: this.config.domain,
        currency: this.config.currency
      })
      container.style.display = 'none'
    }
  }
}
