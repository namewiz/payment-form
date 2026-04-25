import { countries } from './countries.js'
import { computeCartTotals, renderCartHTML, renderCartTotalsHTML } from './cart.js'
import { getNextSteps, renderIntentQuestion, getUpsellOffers, renderUpsellCards } from './post-checkout.js'

export class PaymentForm {
  constructor (rootElement = document, options = {}) {
    this.root = rootElement
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
      checkoutApi: options.checkoutApi || undefined,
      postCheckout: !!options.postCheckout,
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

    // Set pipeline based on payment style
    if (this.config.paymentStyle === 'external') {
      this.pipeline = ['cart', 'customer', 'redirect', 'processing']
    } else {
      this.pipeline = ['cart', 'customer', 'payment', 'processing']
    }

    // Append post-checkout steps if enabled
    if (this.config.postCheckout) {
      this.pipeline.push('next-steps', 'intent', 'upsell')
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
    this.applyWording()
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

    const prevRedirect = this.getElement('#prev-step-redirect')
    if (prevRedirect) prevRedirect.addEventListener('click', () => this.prevStep())

    const redirectPayBtn = this.getElement('#redirect-pay-btn')
    if (redirectPayBtn) redirectPayBtn.addEventListener('click', () => this.handleRedirect())

    // Post-checkout step buttons
    const nextStepsBtn = this.getElement('#next-step-nextsteps')
    if (nextStepsBtn) nextStepsBtn.addEventListener('click', () => this.nextStep())

    const skipIntent = this.getElement('#skip-intent')
    if (skipIntent) skipIntent.addEventListener('click', () => this.nextStep())

    const submitIntent = this.getElement('#submit-intent')
    if (submitIntent) submitIntent.addEventListener('click', () => this.handleIntentSubmit())

    const skipUpsell = this.getElement('#skip-upsell')
    if (skipUpsell) skipUpsell.addEventListener('click', () => this.closeForm())

    const doneUpsell = this.getElement('#done-upsell')
    if (doneUpsell) doneUpsell.addEventListener('click', () => this.closeForm())

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

  getPrimaryAction() {
    const actions = new Set(this.config.items.map((i) => i.action || 'registration'))
    if (actions.size > 1) return 'mixed'
    if (actions.size === 1) return [...actions][0]
    return this.config.transactionType || 'registration'
  }

  getWording() {
    const action = this.getPrimaryAction()
    const hasMultipleTypes = new Set(this.config.items.map((i) => i.type)).size > 1
    const primaryType = this.config.items.length > 0 ? this.config.items[0].type : 'domain'

    const actionLabels = {
      registration: { submit: 'Register Now', processing: 'Processing registration', successHeading: 'Registration complete', successMessage: 'Your registration was successful.' },
      renewal: { submit: 'Renew Now', processing: 'Processing renewal', successHeading: 'Renewal complete', successMessage: 'Your renewal was successful.' },
      transfer: { submit: 'Transfer Now', processing: 'Processing transfer', successHeading: 'Transfer initiated', successMessage: 'Your transfer has been initiated.' },
      mixed: { submit: 'Pay Now', processing: 'Processing your order', successHeading: 'Order complete', successMessage: 'Your order was successful.' }
    }

    const processingSteps = {
      registration: ['Verifying payment', 'Setting up user account', 'Acquiring domain', 'Sending confirmation email', 'Setting up DNS records', 'Putting the finishing touches'],
      renewal: ['Verifying payment', 'Extending registration', 'Updating DNS records', 'Sending confirmation email', 'Putting the finishing touches'],
      transfer: ['Verifying payment', 'Initiating domain transfer', 'Verifying transfer eligibility', 'Sending transfer confirmation', 'Putting the finishing touches'],
      mixed: ['Verifying payment', 'Processing items', 'Sending confirmation email', 'Putting the finishing touches']
    }

    const label = actionLabels[action] || actionLabels.registration
    const steps = processingSteps[action] || processingSteps.registration

    // If cart has mixed types, use generic wording
    const itemDescription = hasMultipleTypes ? 'items' : primaryType

    return { ...label, processingSteps: steps, itemDescription }
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

  applyWording() {
    const wording = this.getWording()

    const submitText = this.getElement('#submit-text')
    if (submitText) submitText.textContent = wording.submit

    const processingHeading = this.getElement('#processing-heading')
    if (processingHeading) processingHeading.textContent = wording.processing
  }

  renderRedirectSummary() {
    const container = this.getElement('#redirect-summary')
    if (!container) return

    const fmt = (n) => `${this.currencySymbol}${n.toFixed(2)}`
    const itemsList = this.config.items
      .map((item) => `<div class="summary-item"><span class="summary-label">${item.name}</span><span class="summary-value">${fmt(item.unitPrice * item.years)}</span></div>`)
      .join('')

    container.innerHTML = `
      ${itemsList}
      <div class="summary-item" style="border-top: 1px solid var(--border-color); margin-top: 0.25rem; padding-top: 0.5rem; font-weight: 600;">
        <span class="summary-label">Total</span>
        <span class="summary-value">${fmt(this.orderTotals.total)}</span>
      </div>`
  }

  async handleRedirect() {
    this.collectFormData()

    const btn = this.getElement('#redirect-pay-btn')
    const btnText = this.getElement('#redirect-pay-text')
    if (btn) { btn.disabled = true; btn.classList.add('loading') }
    if (btnText) btnText.textContent = 'Redirecting...'

    if (!this.config.checkoutApi) {
      // No API endpoint — fire event as fallback
      const host = this.root.host
      if (host) {
        host.dispatchEvent(new CustomEvent('payment-redirect', {
          bubbles: true,
          detail: this.formData
        }))
      }
      return
    }

    // Call checkout API to get redirect URL
    try {
      const payload = {
        product: {
          domainName: this.config.domain,
          domainTransaction: this.config.items[0]?.action === 'transfer' ? 'transfer' : 'create',
          addons: {},
          nameservers: []
        },
        customer: {
          email: this.formData.userInfo?.email || '',
          firstName: (this.formData.userInfo?.fullName || '').split(' ')[0] || '',
          lastName: (this.formData.userInfo?.fullName || '').split(' ').slice(1).join(' ') || '',
          phone: this.formData.userInfo?.phone || '',
          address: {
            street: this.formData.userInfo?.address?.line1 || '',
            city: '',
            zipcode: this.formData.userInfo?.address?.zip || '',
            country: this.formData.userInfo?.address?.country || '',
            state: this.formData.userInfo?.address?.state || ''
          }
        },
        currency: this.config.currency,
        discounts: this.formData.order?.discountCode ? [{ code: this.formData.order.discountCode }] : []
      }

      const response = await fetch(this.config.checkoutApi, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!response.ok) throw new Error('Payment API returned ' + response.status)

      const data = await response.json()

      if (data.authorizationUrl) {
        window.location.href = data.authorizationUrl
      } else {
        throw new Error('No redirect URL returned from payment API')
      }
    } catch (err) {
      // Show error, re-enable button
      if (btn) { btn.disabled = false; btn.classList.remove('loading') }
      if (btnText) btnText.textContent = 'Proceed to Payment'
      const container = this.getElement('#redirect-summary')
      if (container) {
        container.insertAdjacentHTML('beforeend',
          `<p class="redirect-error">Something went wrong. Please try again.</p>`)
      }
    }
  }

  completePayment(result) {
    if (result && result.success) {
      const wording = this.getWording()
      const txnId = result.transactionId || ''
      const years = this.config.items.length > 0 ? this.config.items[0].years : 1
      const statusContainer = this.getElement('#status-content')
      if (statusContainer) {
        statusContainer.innerHTML = `
          <div class="confirmation-icon" aria-hidden="true">✓</div>
          <h2>${wording.successHeading}</h2>
          <p>${wording.successMessage}</p>
          <div class="summary-section">
            <div class="summary-item">
              <span class="summary-label">${wording.itemDescription === 'items' ? 'Items' : wording.itemDescription.charAt(0).toUpperCase() + wording.itemDescription.slice(1)}</span>
              <span class="summary-value">${this.config.items.map((i) => i.name).join(', ')}</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">Transaction</span>
              <span class="summary-value">${txnId}</span>
            </div>
          </div>
          ${this.config.postCheckout
            ? '<button type="button" class="btn-primary" id="continue-post-checkout">Continue</button>'
            : '<button type="button" class="btn-primary" id="close-payment-form">Close</button>'}`
      }

      if (this.config.postCheckout) {
        const continueBtn = this.getElement('#continue-post-checkout')
        if (continueBtn) continueBtn.addEventListener('click', () => this.nextStep())
      } else {
        const closeBtn = this.getElement('#close-payment-form')
        if (closeBtn) closeBtn.addEventListener('click', () => this.closeForm())
      }

      this.goToStep('processing')
    }
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

    // Render redirect summary when entering redirect step
    if (step === 'redirect') {
      this.renderRedirectSummary()
    }

    // Render post-checkout content when entering those steps
    if (step === 'next-steps') {
      this.renderNextSteps()
    } else if (step === 'intent') {
      this.renderIntent()
    } else if (step === 'upsell') {
      this.renderUpsell()
    }

    // When payment/redirect step is shown, mark begin_checkout (GA4 recommendation)
    if (step === 'payment' || step === 'redirect') {
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

    // 4) Finalize order (~15s) with rolling statuses
    const wording = this.getWording()
    const steps = wording.processingSteps
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
        <h2>${wording.successHeading}</h2>
        <p>${wording.successMessage}</p>
        <div class="summary-section">
          <div class="summary-item">
            <span class="summary-label">${wording.itemDescription === 'items' ? 'Items' : wording.itemDescription.charAt(0).toUpperCase() + wording.itemDescription.slice(1)}</span>
            <span class="summary-value">${this.config.items.map((i) => i.name).join(', ')}</span>
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
        ${this.config.postCheckout
          ? '<button type="button" class="btn-primary" id="continue-post-checkout">Continue</button>'
          : '<p>We\'ll email you next steps and credentials. You can now close this window.</p><button type="button" class="btn-primary" id="close-payment-form">Close</button>'}
      `

      if (this.config.postCheckout) {
        const continueBtn = this.getElement('#continue-post-checkout')
        if (continueBtn) continueBtn.addEventListener('click', () => this.nextStep())
      } else {
        const closeBtn = this.getElement('#close-payment-form')
        if (closeBtn) closeBtn.addEventListener('click', () => this.closeForm())
      }
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

  renderNextSteps() {
    const container = this.getElement('#next-steps-content')
    if (!container) return
    container.innerHTML = getNextSteps(this.config.items)
  }

  renderIntent() {
    const container = this.getElement('#intent-content')
    if (!container) return
    container.innerHTML = renderIntentQuestion()
  }

  renderUpsell() {
    const container = this.getElement('#upsell-content')
    if (!container) return

    const offers = getUpsellOffers(this.config.items)
    this.upsellOffers = offers
    container.innerHTML = renderUpsellCards(offers, this.currencySymbol)

    // Wire up add buttons
    container.querySelectorAll('.upsell-add-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index)
        const offer = this.upsellOffers[index]
        if (!offer) return

        // Dispatch event for host page
        const host = this.root.host
        if (host) {
          host.dispatchEvent(new CustomEvent('upsell-selected', {
            bubbles: true,
            detail: offer
          }))
        }

        // Visual feedback
        e.target.textContent = 'Added'
        e.target.disabled = true

        this.trackEvent('upsell_selected', {
          item_name: offer.name,
          item_type: offer.type,
          discount_percent: offer.discountPercent,
          price: offer.discountPrice
        })
      })
    })

    this.trackEvent('upsell_viewed', {
      offers_count: offers.length,
      offer_names: offers.map((o) => o.name).join(', ')
    })
  }

  handleIntentSubmit() {
    const purpose = this.root.querySelector('input[name="intent-purpose"]:checked')
    const technical = this.root.querySelector('input[name="intent-technical"]:checked')

    const intentData = {
      purpose: purpose ? purpose.value : null,
      technical: technical ? technical.value : null
    }

    // Dispatch event for host page
    const host = this.root.host
    if (host) {
      host.dispatchEvent(new CustomEvent('intent-submitted', {
        bubbles: true,
        detail: intentData
      }))
    }

    this.trackEvent('intent_submitted', intentData)
    this.nextStep()
  }
}
