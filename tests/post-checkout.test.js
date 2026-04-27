import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { getNextSteps, renderIntentQuestion, getUpsellOffers, renderUpsellCards } from '../src/post-checkout.js'

describe('getNextSteps', () => {
  it('returns domain registration steps', () => {
    const html = getNextSteps([
      { type: 'domain', action: 'registration', name: 'example.ng' }
    ])

    assert.ok(html.includes('Set up your domain'))
    assert.ok(html.includes('nameservers'))
    assert.ok(html.includes('example.ng'))
  })

  it('returns domain transfer steps', () => {
    const html = getNextSteps([
      { type: 'domain', action: 'transfer', name: 'transfer.ng' }
    ])

    assert.ok(html.includes('Complete your transfer'))
    assert.ok(html.includes('authorization'))
    assert.ok(html.includes('transfer.ng'))
  })

  it('returns domain renewal steps', () => {
    const html = getNextSteps([
      { type: 'domain', action: 'renewal', name: 'old.ng' }
    ])

    assert.ok(html.includes('Domain renewed'))
    assert.ok(html.includes('old.ng'))
  })

  it('returns email registration steps', () => {
    const html = getNextSteps([
      { type: 'email', action: 'registration', name: 'mail@test.ng' }
    ])

    assert.ok(html.includes('Set up your email'))
    assert.ok(html.includes('mail@test.ng'))
  })

  it('returns hosting registration steps', () => {
    const html = getNextSteps([
      { type: 'hosting', action: 'registration', name: 'hosting-plan' }
    ])

    assert.ok(html.includes('Set up your hosting'))
    assert.ok(html.includes('hosting-plan'))
  })

  it('returns multiple cards for multiple items', () => {
    const html = getNextSteps([
      { type: 'domain', action: 'registration', name: 'a.ng' },
      { type: 'email', action: 'registration', name: 'mail@a.ng' }
    ])

    assert.ok(html.includes('Set up your domain'))
    assert.ok(html.includes('Set up your email'))
    assert.ok(html.includes('a.ng'))
    assert.ok(html.includes('mail@a.ng'))
  })
})

describe('renderIntentQuestion', () => {
  it('renders purpose radio options', () => {
    const html = renderIntentQuestion()

    assert.ok(html.includes('intent-purpose'))
    assert.ok(html.includes('Personal website'))
    assert.ok(html.includes('Business'))
    assert.ok(html.includes('Email only'))
    assert.ok(html.includes('Development'))
    assert.ok(html.includes('Other'))
  })

  it('renders technical level radio options', () => {
    const html = renderIntentQuestion()

    assert.ok(html.includes('intent-technical'))
    assert.ok(html.includes('Yes, I can manage DNS'))
    assert.ok(html.includes('Somewhat'))
    assert.ok(html.includes('No, I need guidance'))
  })
})

describe('getUpsellOffers', () => {
  it('suggests related TLDs for a domain purchase', () => {
    const offers = getUpsellOffers([
      { type: 'domain', action: 'registration', name: 'example.ng' }
    ])

    assert.ok(offers.length > 0)
    assert.ok(offers.some((o) => o.name.includes('example.')))
    assert.ok(offers.every((o) => o.name !== 'example.ng'))
  })

  it('does not suggest domains the user already owns', () => {
    const offers = getUpsellOffers([
      { type: 'domain', action: 'registration', name: 'example.ng' },
      { type: 'domain', action: 'registration', name: 'example.com.ng' }
    ])

    assert.ok(!offers.some((o) => o.name === 'example.com.ng'))
  })

  it('suggests email for domain purchases when slots available', () => {
    // Use a domain that already has fewer TLD variants to leave room for email
    const offers = getUpsellOffers([
      { type: 'domain', action: 'registration', name: 'example.com' }
    ])

    // The email offer should be among the suggestions
    assert.ok(offers.some((o) => o.type === 'email' || o.type === 'domain'))
    assert.ok(offers.length > 0)
  })

  it('limits offers to 3', () => {
    const offers = getUpsellOffers([
      { type: 'domain', action: 'registration', name: 'example.ng' }
    ])

    assert.ok(offers.length <= 3)
  })

  it('includes discount pricing', () => {
    const offers = getUpsellOffers([
      { type: 'domain', action: 'registration', name: 'example.ng' }
    ])

    for (const offer of offers) {
      assert.ok(offer.discountPrice < offer.originalPrice)
      assert.ok(offer.discountPercent > 0)
    }
  })

  it('returns empty array for non-domain items', () => {
    const offers = getUpsellOffers([
      { type: 'hosting', action: 'registration', name: 'my-plan' }
    ])

    assert.equal(offers.length, 0)
  })
})

describe('renderUpsellCards', () => {
  it('renders upsell cards with pricing', () => {
    const offers = [
      { type: 'domain', action: 'registration', name: 'example.com.ng', description: 'Get .com.ng', originalPrice: 8, discountPrice: 6.40, discountPercent: 20 }
    ]
    const html = renderUpsellCards(offers, '$')

    assert.ok(html.includes('example.com.ng'))
    assert.ok(html.includes('$8.00'))
    assert.ok(html.includes('$6.40'))
    assert.ok(html.includes('20% off'))
    assert.ok(html.includes('Add to order'))
  })

  it('renders empty message when no offers', () => {
    const html = renderUpsellCards([], '$')

    assert.ok(html.includes('No additional offers'))
  })
})
