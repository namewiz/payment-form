export class PaymentForm {
  constructor (rootElement = document, options = {}) {
    this.root = rootElement
    this.currentStep = 1
    this.formData = {}
    this.config = {
      // domain, currency are required, do not render form without them.
      domain: (typeof options.domain === 'string' && options.domain.trim()) ? options.domain.trim() : undefined,
      currency: (typeof options.currency === 'string' && options.currency.trim()) ? options.currency.toUpperCase().trim() : undefined,
      basePrice: typeof options.basePrice === 'number' ? options.basePrice : 12.0,
      taxesRate: typeof options.taxesRate === 'number' ? options.taxesRate : 0.075,
      feeAmount: typeof options.feeAmount === 'number' ? options.feeAmount : 1.5,
      customer: options.customer || {}
    }
    // If required config is missing, do not render the form UI
    if (!this.config.domain || !this.config.currency) {
      throw new Error('PaymentForm: domain and currency are required configuration options')
    }

    this.currencySymbol = this.getCurrencySymbol(this.config.currency)
    this.skipCustomerStep = false

    this.initTheme()
    this.initEventListeners()

    // Initialize UI state
    this.prefillCustomerInfo()
    this.computeAndRenderOrderSummary()
  }

  getElement(selector) {
    return this.root?.querySelector(selector)
  }

  initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light'
    const themeTarget = this.root?.host || document.documentElement
    themeTarget.setAttribute('data-theme', savedTheme)
    this.updateThemeIcon(savedTheme)
  }

  updateThemeIcon(theme) {
    const icon = this.getElement('#theme-icon')
    icon.textContent = theme === 'dark' ? '☀️' : '🌙'
  }

  initEventListeners() {
    const themeToggle = this.getElement('#theme-toggle')
    if (themeToggle) themeToggle.addEventListener('click', () => this.toggleTheme())

    const next1 = this.getElement('#next-step-1')
    if (next1) next1.addEventListener('click', () => this.validateAndNextStep(1))

    const next2 = this.getElement('#next-step-2')
    if (next2) next2.addEventListener('click', () => this.validateAndNextStep(2))

    const prev2 = this.getElement('#prev-step-2')
    if (prev2) prev2.addEventListener('click', () => this.goToStep(2))

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
    const subtotal = Number(this.config.basePrice)
    const tax = Math.round(subtotal * this.config.taxesRate * 100) / 100
    const fees = Math.round(this.config.feeAmount * 100) / 100
    const total = Math.round((subtotal + tax + fees) * 100) / 100

    this.orderTotals = { subtotal, tax, fees, total }

    const fmt = (n) => `${this.currencySymbol}${n.toFixed(2)}`

    const domainEl = this.getElement('#order-domain')
    const periodEl = this.getElement('#order-period')
    const totalEl = this.getElement('#order-total')
    if (domainEl) domainEl.textContent = this.config.domain
    if (periodEl) periodEl.textContent = '1 year'
    if (totalEl) totalEl.textContent = fmt(total)
  }

  toggleTheme() {
    const themeTarget = this.root?.host || document.documentElement
    const currentTheme = themeTarget.getAttribute('data-theme')
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    themeTarget.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
    this.updateThemeIcon(newTheme)
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
    // Step 1 (Order) has no required inputs
    if (step === 2) {
      return [
        'full-name',
        'email',
        'phone',
        'address-line1',
        'state',
        'zip',
        'country'
      ]
    } else if (step === 3) {
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
    // Step 1 has no validation
    if (currentStep === 1) {
      this.collectFormData()
      this.goToStep(2)
      return
    }
    if (this.validateStep(currentStep)) {
      this.collectFormData()
      this.goToStep(currentStep + 1)
    }
  }

  goToStep(step) {
    // Skip customer info step if fully provided
    if (step === 2 && this.skipCustomerStep) {
      step = 3
    }
    this.root.querySelectorAll('.form-step').forEach(stepEl => {
      stepEl.classList.remove('active')
    })

    this.root.querySelector(`.form-step[data-step="${step}"]`).classList.add('active')

    this.root.querySelectorAll('.progress-step').forEach(progressStep => {
      const stepNum = parseInt(progressStep.getAttribute('data-step'))
      progressStep.classList.remove('active', 'completed')

      if (stepNum === step) {
        progressStep.classList.add('active')
      } else if (stepNum < step) {
        progressStep.classList.add('completed')
      }
    })

    this.currentStep = step

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async handleSubmit(e) {
    e.preventDefault()

    // Validate payment step fields
    if (!this.validateStep(3)) {
      return
    }

    const submitButton = this.getElement('#submit-form')
    const submitText = this.getElement('#submit-text')
    if (submitButton) submitButton.disabled = true
    if (submitButton) submitButton.classList.add('loading')
    if (submitText) submitText.textContent = 'Processing...'

    this.collectFormData()

    // Move to status step and kick off simulated flow
    this.goToStep(4)
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

    // 2) Create payment intent (simulate ~5s)
    setStatus('Creating payment intent...')
    const paymentIntentId = await new Promise((resolve) => setTimeout(() => resolve('pi_simulated_' + Math.random().toString(36).slice(2, 8)), 5000))

    // 3) Charge via Stripe (simulate)
    setStatus('Charging card...')
    await new Promise((resolve) => setTimeout(resolve, 1200))

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
    }

    // Success summary
    const txnId = 'txn_' + Math.random().toString(36).slice(2, 10)
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
            <span class="summary-value">1 year</span>
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
  }

  closeForm() {
    // If running within a custom element, remove it. Otherwise hide container.
    const host = this.root.host
    if (host && typeof host.remove === 'function') {
      host.remove()
      return
    }
    const container = this.getElement('.payment-form-container')
    if (container) {
      container.style.display = 'none'
    }
  }
}
