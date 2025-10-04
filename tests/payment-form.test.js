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

    const validEmpty = form.validateStep(2)
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

    const validNow = form.validateStep(2)
    assert.equal(validNow, true)
    assert.equal(document.querySelectorAll('.error').length, 0)
  })
})
