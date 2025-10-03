/* @vitest-environment jsdom */

import { describe, it, expect, beforeEach } from 'vitest'
import { PaymentForm } from '../payment-form.js'

function setupDOM() {
  document.body.innerHTML = `
    <button id="theme-toggle"><span id="theme-icon"></span></button>

    <button id="next-step-1"></button>
    <button id="next-step-2"></button>
    <button id="prev-step-2"></button>
    <button id="prev-step-3"></button>

    <form id="payment-form"></form>

    <input type="checkbox" id="separate-billing" />
    <div id="billing-address-fields"></div>

    <input id="card-number" />
    <input id="expiry-date" />
    <input id="cvc" />
    <input id="phone" />

    <input id="full-name" required />
    <span id="full-name-error" class="error-message"></span>

    <input id="email" type="email" required />
    <span id="email-error" class="error-message"></span>

    <input id="address-line1" required />
    <span id="address-line1-error" class="error-message"></span>

    <input id="state" required />
    <span id="state-error" class="error-message"></span>

    <input id="zip" required />
    <span id="zip-error" class="error-message"></span>

    <select id="country" required>
      <option value="">Select</option>
      <option value="US">United States</option>
    </select>
    <span id="country-error" class="error-message"></span>

    <span id="card-number-error" class="error-message"></span>
    <span id="expiry-date-error" class="error-message"></span>
    <span id="cvc-error" class="error-message"></span>

    <span id="summary-name"></span>
    <span id="summary-email"></span>
    <span id="summary-phone"></span>
    <span id="summary-address"></span>
    <span id="summary-card"></span>
    <div id="summary-billing-section" style="display:none"></div>
    <span id="summary-billing"></span>

    <button id="submit-form"><span id="submit-text"></span></button>
    <div class="form-body"></div>
  `
}

describe('PaymentForm', () => {
  beforeEach(() => {
    // Reset DOM and storage
    localStorage.clear()
    document.documentElement.setAttribute('data-theme', 'light')
    setupDOM()
  })

  it('toggles theme and updates storage + icon', () => {
    const form = new PaymentForm()

    // Initial theme set in initTheme
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    expect(document.getElementById('theme-icon').textContent).toBe('🌙')

    // Toggle -> dark
    form.toggleTheme()
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
    expect(document.getElementById('theme-icon').textContent).toBe('☀️')

    // Toggle -> light
    form.toggleTheme()
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    expect(localStorage.getItem('theme')).toBe('light')
    expect(document.getElementById('theme-icon').textContent).toBe('🌙')
  })

  it('formats card number input to XXXX XXXX XXXX XXXX and strips non-digits', () => {
    const form = new PaymentForm()
    const cardInput = document.getElementById('card-number')

    // Simulate messy entry
    cardInput.value = '4111a1111b1111-1111 123'
    cardInput.dispatchEvent(new Event('input'))

    expect(cardInput.value).toBe('4111 1111 1111 1111')
  })

  it('validates step 1 required fields and passes with valid input', () => {
    const form = new PaymentForm()

    // Initially empty -> invalid
    const validEmpty = form.validateStep(1)
    expect(validEmpty).toBe(false)
    // Should mark at least one field as error
    expect(document.querySelectorAll('.error').length).toBeGreaterThan(0)

    // Fill with valid values
    document.getElementById('full-name').value = 'John Doe'
    document.getElementById('email').value = 'john@example.com'
    document.getElementById('phone').value = '1234567890'
    document.getElementById('address-line1').value = '123 Main St'
    document.getElementById('state').value = 'CA'
    document.getElementById('zip').value = '94105'
    document.getElementById('country').value = 'US'

    // Clear previous error classes to emulate user correction
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'))
    document.querySelectorAll('.error-message').forEach(el => el.classList.remove('show'))

    const validNow = form.validateStep(1)
    expect(validNow).toBe(true)
    expect(document.querySelectorAll('.error').length).toBe(0)
  })
})

