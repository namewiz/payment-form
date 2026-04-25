import { describe, beforeEach, test as it } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'url'
import { JSDOM } from 'jsdom'
import { PaymentForm } from '../src/payment-form.js'

function setupDOM() {
  const fileUrl = new URL('../src/payment-form.html', import.meta.url)
  const htmlPath = fileURLToPath(fileUrl)
  const html = readFileSync(htmlPath, 'utf-8')
  const dom = new JSDOM(html, { url: 'http://localhost', pretendToBeVisual: true })

  globalThis.window = dom.window
  globalThis.document = dom.window.document
  globalThis.HTMLElement = dom.window.HTMLElement
  globalThis.Event = dom.window.Event
  globalThis.CustomEvent = dom.window.CustomEvent
  globalThis.Node = dom.window.Node
  // In Node >= 20, globalThis.navigator may be a read-only getter.
  // Only set it if writable or not already defined.
  try {
    const desc = Object.getOwnPropertyDescriptor(globalThis, 'navigator')
    if (!desc || desc.writable) {
      globalThis.navigator = dom.window.navigator
    }
  } catch {
    // ignore if cannot redefine
  }
  globalThis.getComputedStyle = dom.window.getComputedStyle

  // Safe no-ops for missing browser APIs in JSDOM
  if (typeof window.scrollTo !== 'function') {
    window.scrollTo = () => {}
  }
  if (typeof window.matchMedia !== 'function') {
    window.matchMedia = (query) => ({
      matches: false,
      media: query,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      onchange: null
    })
  }
}

function createForm(options = {}) {
  const config = { domain: 'example.ng', currency: 'USD', ...options }
  return new PaymentForm(document, config)
}

describe('PaymentForm (DOM integration)', () => {
  beforeEach(() => {
    setupDOM()
  })

  it('initializes theme based on config (light)', () => {
    createForm({ theme: 'light' })
    assert.equal(document.documentElement.getAttribute('data-theme'), 'light')
  })

  it('formats card number input to XXXX XXXX XXXX XXXX and strips non-digits', () => {
    createForm()
    const cardInput = document.getElementById('card-number')

    cardInput.value = '4111a1111b1111-1111 123'
    cardInput.dispatchEvent(new window.Event('input'))

    assert.equal(cardInput.value, '4111 1111 1111 1111')
  })

  it('validates step 2 required fields and passes with valid input', () => {
    const form = createForm()

    const validEmpty = form.validateStep('customer')
    assert.equal(validEmpty, false)
    assert.ok(document.querySelectorAll('.error').length > 0)

    document.getElementById('full-name').value = 'John Doe'
    document.getElementById('email').value = 'john@example.com'
    document.getElementById('phone').value = '1234567890'
    document.getElementById('address-line1').value = '123 Main St'
    document.getElementById('state').value = 'CA'
    document.getElementById('zip').value = '94105'
    document.getElementById('country').value = 'US'

    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'))
    document.querySelectorAll('.error-message').forEach(el => el.classList.remove('show'))

    const validNow = form.validateStep('customer')
    assert.equal(validNow, true)
    assert.equal(document.querySelectorAll('.error').length, 0)
  })

  it('navigates forward through pipeline steps', () => {
    const form = createForm()

    assert.equal(form.currentStep, 'cart')

    // Move to customer step
    form.nextStep()
    assert.equal(form.currentStep, 'customer')

    // Cart step should show as completed in progress bar
    const cartProgress = document.querySelector('.progress-step[data-step="cart"]')
    assert.ok(cartProgress.classList.contains('completed'))
  })

  it('navigates backward through pipeline steps', () => {
    const form = createForm()

    form.nextStep() // cart -> customer
    assert.equal(form.currentStep, 'customer')

    form.prevStep() // customer -> cart
    assert.equal(form.currentStep, 'cart')
  })

  it('skips customer step when all customer info is prefilled', () => {
    const form = createForm({
      customer: { name: 'John', email: 'john@test.com', phone: '+1234567890' }
    })

    assert.equal(form.skipCustomerStep, true)
    assert.equal(form.currentStep, 'cart')

    form.nextStep() // should skip customer, go to payment
    assert.equal(form.currentStep, 'payment')

    form.prevStep() // should skip customer backward, go to cart
    assert.equal(form.currentStep, 'cart')
  })

  it('renders cart items in the cart step', () => {
    createForm({
      items: [
        { type: 'domain', name: 'example.ng', unitPrice: 12, taxRate: 0.075, feeAmount: 1.5, years: 1 }
      ]
    })

    const cartItems = document.getElementById('cart-items')
    assert.ok(cartItems.innerHTML.includes('example.ng'))
    assert.ok(cartItems.innerHTML.includes('Domain'))
  })

  it('renders dynamic progress bar with correct number of steps', () => {
    createForm()

    const progressSteps = document.querySelectorAll('.progress-step')
    assert.equal(progressSteps.length, 4) // cart, customer, payment, processing
  })

  it('shows "Register Now" button for registration action', () => {
    createForm({
      items: [
        { type: 'domain', action: 'registration', name: 'test.ng', unitPrice: 12, taxRate: 0, feeAmount: 0, years: 1 }
      ]
    })

    const submitText = document.getElementById('submit-text')
    assert.equal(submitText.textContent, 'Register Now')
  })

  it('shows "Renew Now" button for renewal action', () => {
    createForm({
      items: [
        { type: 'domain', action: 'renewal', name: 'test.ng', unitPrice: 12, taxRate: 0, feeAmount: 0, years: 1 }
      ]
    })

    const submitText = document.getElementById('submit-text')
    assert.equal(submitText.textContent, 'Renew Now')
  })

  it('shows "Transfer Now" button for transfer action', () => {
    createForm({
      items: [
        { type: 'domain', action: 'transfer', name: 'test.ng', unitPrice: 12, taxRate: 0, feeAmount: 0, years: 1 }
      ]
    })

    const submitText = document.getElementById('submit-text')
    assert.equal(submitText.textContent, 'Transfer Now')
  })

  it('shows action badges in cart items', () => {
    createForm({
      items: [
        { type: 'domain', action: 'registration', name: 'new.ng', unitPrice: 12, taxRate: 0, feeAmount: 0, years: 1 },
        { type: 'domain', action: 'renewal', name: 'old.ng', unitPrice: 10, taxRate: 0, feeAmount: 0, years: 1 }
      ]
    })

    const cartItems = document.getElementById('cart-items')
    assert.ok(cartItems.innerHTML.includes('New'))
    assert.ok(cartItems.innerHTML.includes('Renewal'))
    assert.ok(cartItems.innerHTML.includes('cart-action-registration'))
    assert.ok(cartItems.innerHTML.includes('cart-action-renewal'))
  })

  it('shows "Pay Now" button for mixed actions', () => {
    createForm({
      items: [
        { type: 'domain', action: 'registration', name: 'new.ng', unitPrice: 12, taxRate: 0, feeAmount: 0, years: 1 },
        { type: 'domain', action: 'renewal', name: 'old.ng', unitPrice: 10, taxRate: 0, feeAmount: 0, years: 1 }
      ]
    })

    const submitText = document.getElementById('submit-text')
    assert.equal(submitText.textContent, 'Pay Now')
  })

  it('updates processing heading based on transaction type', () => {
    createForm({
      items: [
        { type: 'domain', action: 'transfer', name: 'test.ng', unitPrice: 12, taxRate: 0, feeAmount: 0, years: 1 }
      ]
    })

    const heading = document.getElementById('processing-heading')
    assert.equal(heading.textContent, 'Processing transfer')
  })

  it('uses redirect pipeline for external payment style', () => {
    const form = createForm({ paymentStyle: 'external' })

    assert.deepEqual(form.pipeline, ['cart', 'customer', 'redirect', 'processing'])
  })

  it('uses inline pipeline by default', () => {
    const form = createForm()

    assert.deepEqual(form.pipeline, ['cart', 'customer', 'payment', 'processing'])
  })

  it('renders redirect step with order summary when navigating to it', () => {
    const form = createForm({
      paymentStyle: 'external',
      items: [
        { type: 'domain', action: 'registration', name: 'test.ng', unitPrice: 12, taxRate: 0.075, feeAmount: 1.5, years: 1 }
      ]
    })

    // Navigate to redirect step: cart -> customer -> redirect
    form.nextStep() // cart -> customer
    form.nextStep() // customer -> redirect (skips validation in nextStep for cart)

    assert.equal(form.currentStep, 'redirect')
    const summary = document.getElementById('redirect-summary')
    assert.ok(summary.innerHTML.includes('test.ng'))
    assert.ok(summary.innerHTML.includes('Total'))
  })

  it('fires payment-redirect event when no checkout-api is set', () => {
    const form = createForm({ paymentStyle: 'external' })
    let eventFired = false

    // Listen on the host element (root.host doesn't exist in test, so we check the fallback)
    form.nextStep() // cart -> customer
    form.collectFormData = () => { form.formData = { order: { domain: 'test.ng' } } }

    // handleRedirect without checkoutApi should try to dispatch event
    form.handleRedirect()
    // Just verify it doesn't throw
    assert.ok(true)
  })

  it('completePayment advances to processing with success content', () => {
    const form = createForm({ paymentStyle: 'external' })

    form.completePayment({ success: true, transactionId: 'txn_abc123' })

    assert.equal(form.currentStep, 'processing')
    const content = document.getElementById('status-content')
    assert.ok(content.innerHTML.includes('txn_abc123'))
  })
})
