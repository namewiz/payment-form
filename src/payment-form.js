export class PaymentForm {
  constructor(rootElement = document) {
    this.root = rootElement
    this.currentStep = 1
    this.formData = {}

    this.initTheme()
    this.initEventListeners()
  }

  getElement(selector) {
    return this.root?.querySelector(selector)
  }

  initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light'
    document.documentElement.setAttribute('data-theme', savedTheme)
    this.updateThemeIcon(savedTheme)
  }

  updateThemeIcon(theme) {
    const icon = this.getElement('#theme-icon')
    icon.textContent = theme === 'dark' ? '☀️' : '🌙'
  }

  initEventListeners() {
    this.getElement('#theme-toggle').addEventListener('click', () => this.toggleTheme())

    this.getElement('#next-step-1').addEventListener('click', () => this.validateAndNextStep(1))
    this.getElement('#next-step-2').addEventListener('click', () => this.validateAndNextStep(2))
    this.getElement('#prev-step-2').addEventListener('click', () => this.goToStep(1))
    this.getElement('#prev-step-3').addEventListener('click', () => this.goToStep(2))

    this.getElement('#payment-form').addEventListener('submit', (e) => this.handleSubmit(e))

    this.getElement('#separate-billing').addEventListener('change', (e) => {
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

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme')
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', newTheme)
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
    if (step === 1) {
      return [
        'full-name',
        'email',
        'phone',
        'address-line1',
        'state',
        'zip',
        'country'
      ]
    } else if (step === 2) {
      const fields = [
        'card-number',
        'expiry-date',
        'cvc'
      ]

      if (this.getElement('#separate-billing').checked) {
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
    this.formData = {
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

  updateSummary() {
    this.collectFormData()

    this.getElement('#summary-name').textContent = this.formData.userInfo.fullName
    this.getElement('#summary-email').textContent = this.formData.userInfo.email
    this.getElement('#summary-phone').textContent = this.formData.userInfo.phone

    const addr = this.formData.userInfo.address
    const stateCountryZip = [addr.state, addr.country, addr.zip]
      .filter(Boolean)
      .join(', ')
    const addressText = [
      addr.line1,
      stateCountryZip
    ].filter(Boolean).join(', ')
    this.getElement('#summary-address').textContent = addressText

    const cardLast4 = this.formData.paymentInfo.cardNumber.slice(-4)
    this.getElement('#summary-card').textContent = `•••• •••• •••• ${cardLast4}`

    if (this.formData.paymentInfo.separateBillingAddress) {
      const billAddr = this.formData.paymentInfo.billingAddress
      const billStateCountryZip = [billAddr.state, billAddr.country, billAddr.zip]
        .filter(Boolean)
        .join(', ')
      const billingText = [
        billAddr.line1,
        billStateCountryZip
      ].filter(Boolean).join(', ')
      this.getElement('#summary-billing').textContent = billingText
      this.getElement('#summary-billing-section').style.display = 'flex'
    } else {
      this.getElement('#summary-billing-section').style.display = 'none'
    }
  }

  validateAndNextStep(currentStep) {
    if (this.validateStep(currentStep)) {
      if (currentStep === 2) {
        this.updateSummary()
      }
      this.goToStep(currentStep + 1)
    }
  }

  goToStep(step) {
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

    const submitButton = this.getElement('#submit-form')
    const submitText = this.getElement('#submit-text')

    submitButton.disabled = true
    submitButton.classList.add('loading')
    submitText.textContent = 'Processing...'

    await new Promise(resolve => setTimeout(resolve, 1500))

    this.collectFormData()

    console.log('Payment Form Data:', JSON.stringify(this.formData, null, 2))

    submitButton.disabled = false
    submitButton.classList.remove('loading')
    submitText.textContent = 'Complete Payment'

    this.showSuccessMessage()
  }

  showSuccessMessage() {
    const formBody = this.root.querySelector('.form-body')
    formBody.innerHTML = `
      <div class="confirmation-content">
        <div class="confirmation-icon">✓</div>
        <h2>Payment Submitted!</h2>
        <p>Your payment information has been collected. Check the console for the submitted data.</p>
        <button type="button" class="btn-primary" onclick="location.reload()">
          Start Over
        </button>
      </div>
    `
  }
}
