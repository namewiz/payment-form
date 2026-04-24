import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { computeCartTotals, normalizeItems, renderCartHTML, renderCartTotalsHTML } from '../src/cart.js'

describe('normalizeItems', () => {
  it('converts legacy single-domain options into a one-item array', () => {
    const items = normalizeItems({
      domain: 'example.ng',
      basePrice: 20,
      taxesRate: 0.1,
      feeAmount: 2
    })

    assert.equal(items.length, 1)
    assert.equal(items[0].type, 'domain')
    assert.equal(items[0].action, 'registration')
    assert.equal(items[0].name, 'example.ng')
    assert.equal(items[0].years, 1)
    assert.equal(items[0].unitPrice, 20)
    assert.equal(items[0].taxRate, 0.1)
    assert.equal(items[0].feeAmount, 2)
  })

  it('uses defaults when no pricing options provided', () => {
    const items = normalizeItems({ domain: 'test.ng' })

    assert.equal(items.length, 1)
    assert.equal(items[0].unitPrice, 12.0)
    assert.equal(items[0].taxRate, 0.075)
    assert.equal(items[0].feeAmount, 1.5)
  })

  it('passes through an items array with defaults for missing fields', () => {
    const items = normalizeItems({
      items: [
        { name: 'example.ng', unitPrice: 15 },
        { type: 'email', name: 'mail@example.ng', unitPrice: 5, taxRate: 0.05 }
      ]
    })

    assert.equal(items.length, 2)
    // First item gets defaults
    assert.equal(items[0].type, 'domain')
    assert.equal(items[0].action, 'registration')
    assert.equal(items[0].years, 1)
    assert.equal(items[0].taxRate, 0)
    assert.equal(items[0].feeAmount, 0)
    // Second item keeps its values
    assert.equal(items[1].type, 'email')
    assert.equal(items[1].taxRate, 0.05)
  })

  it('ignores items array if empty and falls back to legacy', () => {
    const items = normalizeItems({
      items: [],
      domain: 'fallback.ng',
      basePrice: 10
    })

    assert.equal(items.length, 1)
    assert.equal(items[0].name, 'fallback.ng')
    assert.equal(items[0].unitPrice, 10)
  })
})

describe('computeCartTotals', () => {
  it('computes totals for a single item', () => {
    const totals = computeCartTotals([
      { unitPrice: 12, years: 1, taxRate: 0.075, feeAmount: 1.5 }
    ])

    assert.equal(totals.subtotal, 12)
    assert.equal(totals.tax, 0.9)
    assert.equal(totals.fees, 1.5)
    assert.equal(totals.total, 14.4)
  })

  it('computes totals for multiple items', () => {
    const totals = computeCartTotals([
      { unitPrice: 10, years: 1, taxRate: 0.1, feeAmount: 1 },
      { unitPrice: 5, years: 2, taxRate: 0.05, feeAmount: 0.5 }
    ])

    // subtotal: 10*1 + 5*2 = 20
    assert.equal(totals.subtotal, 20)
    // tax: 10*0.1 + 10*0.05 = 1 + 0.5 = 1.5
    assert.equal(totals.tax, 1.5)
    // fees: 1 + 0.5 = 1.5
    assert.equal(totals.fees, 1.5)
    // total: 20 + 1.5 + 1.5 = 23
    assert.equal(totals.total, 23)
  })

  it('handles multi-year correctly', () => {
    const totals = computeCartTotals([
      { unitPrice: 12, years: 3, taxRate: 0.075, feeAmount: 1.5 }
    ])

    // subtotal: 12*3 = 36
    assert.equal(totals.subtotal, 36)
    // tax: 36*0.075 = 2.7
    assert.equal(totals.tax, 2.7)
    assert.equal(totals.fees, 1.5)
    assert.equal(totals.total, 40.2)
  })

  it('handles empty cart', () => {
    const totals = computeCartTotals([])

    assert.equal(totals.subtotal, 0)
    assert.equal(totals.tax, 0)
    assert.equal(totals.fees, 0)
    assert.equal(totals.total, 0)
  })

  it('matches legacy pricing math', () => {
    // The old code did: subtotal=12, tax=round(12*0.075*100)/100=0.9, fees=round(1.5*100)/100=1.5, total=round(14.4*100)/100=14.4
    const totals = computeCartTotals([
      { unitPrice: 12, years: 1, taxRate: 0.075, feeAmount: 1.5 }
    ])

    assert.equal(totals.subtotal, 12)
    assert.equal(totals.tax, 0.9)
    assert.equal(totals.fees, 1.5)
    assert.equal(totals.total, 14.4)
  })
})

describe('renderCartHTML', () => {
  it('renders a single item with correct structure', () => {
    const html = renderCartHTML([
      { type: 'domain', action: 'registration', name: 'example.ng', years: 1, unitPrice: 12, taxRate: 0.075, feeAmount: 1.5 }
    ], '$')

    assert.ok(html.includes('example.ng'))
    assert.ok(html.includes('Domain'))
    assert.ok(html.includes('$12.00'))
    assert.ok(html.includes('cart-year-select'))
    // Single item: remove button should be disabled
    assert.ok(html.includes('disabled'))
  })

  it('renders multiple items with remove buttons enabled', () => {
    const html = renderCartHTML([
      { type: 'domain', name: 'a.ng', years: 1, unitPrice: 10, taxRate: 0, feeAmount: 0 },
      { type: 'email', name: 'mail@a.ng', years: 1, unitPrice: 5, taxRate: 0, feeAmount: 0 }
    ], '$')

    assert.ok(html.includes('a.ng'))
    assert.ok(html.includes('mail@a.ng'))
    assert.ok(html.includes('Domain'))
    assert.ok(html.includes('Email'))
    // Multiple items: remove buttons should NOT be disabled
    assert.ok(!html.includes('disabled'))
  })

  it('shows correct price for multi-year items', () => {
    const html = renderCartHTML([
      { type: 'domain', name: 'test.ng', years: 3, unitPrice: 10, taxRate: 0, feeAmount: 0 }
    ], '₦')

    assert.ok(html.includes('₦30.00'))
  })
})

describe('renderCartTotalsHTML', () => {
  it('renders totals with correct values', () => {
    const html = renderCartTotalsHTML({ subtotal: 20, tax: 1.5, fees: 1.5, total: 23 }, '$')

    assert.ok(html.includes('$20.00'))
    assert.ok(html.includes('$1.50'))
    assert.ok(html.includes('$23.00'))
    assert.ok(html.includes('Subtotal'))
    assert.ok(html.includes('Total'))
  })
})
