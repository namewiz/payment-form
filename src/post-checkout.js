/**
 * Post-checkout flow: next-steps content, intent questions, upsell logic.
 * All functions are pure — they return HTML strings, no DOM manipulation.
 */

/**
 * Returns next-steps HTML content based on what the user purchased.
 * Each item gets its own guidance card based on type + action.
 */
export function getNextSteps(items) {
  const stepMap = {
    domain: {
      registration: {
        title: 'Set up your domain',
        steps: [
          'Point your nameservers to your hosting provider',
          'Configure DNS records (A, CNAME, MX)',
          'Verify domain ownership via email'
        ]
      },
      renewal: {
        title: 'Domain renewed',
        steps: [
          'Your domain registration has been extended',
          'Check that your DNS records are still correct',
          'Update your WHOIS contact info if needed'
        ]
      },
      transfer: {
        title: 'Complete your transfer',
        steps: [
          'Check your email for a transfer confirmation',
          'Provide the authorization/EPP code from your old registrar',
          'Approve the transfer when prompted (can take up to 5 days)'
        ]
      }
    },
    email: {
      registration: {
        title: 'Set up your email',
        steps: [
          'Choose your email address (e.g., you@yourdomain.ng)',
          'Set up your email client or use webmail',
          'Add MX records to your domain DNS'
        ]
      },
      renewal: {
        title: 'Email renewed',
        steps: [
          'Your email service has been extended',
          'No changes needed to your existing setup',
          'Check your mailbox storage if you need more space'
        ]
      }
    },
    hosting: {
      registration: {
        title: 'Set up your hosting',
        steps: [
          'Access your hosting control panel',
          'Upload your website files or install a CMS',
          'Point your domain nameservers to your hosting'
        ]
      },
      renewal: {
        title: 'Hosting renewed',
        steps: [
          'Your hosting plan has been extended',
          'Check your storage and bandwidth usage',
          'Review your backup schedule'
        ]
      }
    }
  }

  const cards = items.map((item) => {
    const action = item.action || 'registration'
    const typeMap = stepMap[item.type] || stepMap.domain
    const info = typeMap[action] || typeMap.registration || { title: 'Next steps', steps: ['Check your email for further instructions'] }

    const stepsList = info.steps
      .map((s) => `<li>${s}</li>`)
      .join('')

    return `
      <div class="next-step-card">
        <h3>${info.title}</h3>
        <p class="next-step-item-name">${item.name}</p>
        <ol class="next-step-list">${stepsList}</ol>
      </div>`
  })

  return cards.join('')
}

/**
 * Returns HTML for the intent question form.
 * Two questions: "What will you use this for?" and "Are you technical?"
 */
export function renderIntentQuestion() {
  return `
    <div class="intent-section">
      <h2>Tell us about yourself</h2>
      <p>This helps us personalize your experience.</p>

      <div class="intent-group">
        <label class="intent-label">What will you use this for?</label>
        <div class="intent-options" id="intent-purpose">
          <label class="intent-option">
            <input type="radio" name="intent-purpose" value="personal" />
            <span class="intent-option-text">Personal website</span>
          </label>
          <label class="intent-option">
            <input type="radio" name="intent-purpose" value="business" />
            <span class="intent-option-text">Business</span>
          </label>
          <label class="intent-option">
            <input type="radio" name="intent-purpose" value="email" />
            <span class="intent-option-text">Email only</span>
          </label>
          <label class="intent-option">
            <input type="radio" name="intent-purpose" value="development" />
            <span class="intent-option-text">Development / testing</span>
          </label>
          <label class="intent-option">
            <input type="radio" name="intent-purpose" value="other" />
            <span class="intent-option-text">Other</span>
          </label>
        </div>
      </div>

      <div class="intent-group">
        <label class="intent-label">Are you technical?</label>
        <div class="intent-options" id="intent-technical">
          <label class="intent-option">
            <input type="radio" name="intent-technical" value="yes" />
            <span class="intent-option-text">Yes, I can manage DNS and servers</span>
          </label>
          <label class="intent-option">
            <input type="radio" name="intent-technical" value="somewhat" />
            <span class="intent-option-text">Somewhat, I know the basics</span>
          </label>
          <label class="intent-option">
            <input type="radio" name="intent-technical" value="no" />
            <span class="intent-option-text">No, I need guidance</span>
          </label>
        </div>
      </div>
    </div>`
}

/**
 * Examines purchased items and returns upsell offers.
 * Each offer: { type, action, name, description, originalPrice, discountPrice, discountPercent }
 */
export function getUpsellOffers(items) {
  const offers = []
  const ownedNames = new Set(items.map((i) => i.name.toLowerCase()))

  for (const item of items) {
    if (item.type !== 'domain') continue

    const name = item.name.toLowerCase()

    // Extract the label (part before the TLD)
    const parts = name.split('.')
    if (parts.length < 2) continue
    const label = parts[0]

    // Suggest related TLD variants
    const variants = [
      { tld: '.com.ng', price: 8.00 },
      { tld: '.org.ng', price: 6.00 },
      { tld: '.ng', price: 15.00 },
      { tld: '.com', price: 10.00 }
    ]

    for (const v of variants) {
      const suggested = label + v.tld
      if (ownedNames.has(suggested)) continue
      if (name === suggested) continue

      offers.push({
        type: 'domain',
        action: 'registration',
        name: suggested,
        description: `Protect your brand with ${v.tld}`,
        originalPrice: v.price,
        discountPrice: Math.round(v.price * 0.8 * 100) / 100,
        discountPercent: 20
      })
    }

    // If they bought a domain, suggest email
    const emailName = `mail@${name}`
    if (!ownedNames.has(emailName)) {
      offers.push({
        type: 'email',
        action: 'registration',
        name: emailName,
        description: `Professional email for your domain`,
        originalPrice: 5.00,
        discountPrice: 3.50,
        discountPercent: 30
      })
    }
  }

  // Limit to 3 most relevant offers
  return offers.slice(0, 3)
}

/**
 * Renders upsell cards HTML from an array of offers.
 */
export function renderUpsellCards(offers, currencySymbol) {
  if (!offers || offers.length === 0) {
    return '<p class="upsell-empty">No additional offers available right now.</p>'
  }

  const fmt = (n) => `${currencySymbol}${n.toFixed(2)}`

  const cards = offers.map((offer, index) => {
    return `
      <div class="upsell-card" data-index="${index}">
        <div class="upsell-card-header">
          <span class="upsell-type-badge upsell-type-${offer.type}">${offer.type}</span>
          <span class="upsell-discount-badge">${offer.discountPercent}% off</span>
        </div>
        <h3 class="upsell-name">${offer.name}</h3>
        <p class="upsell-description">${offer.description}</p>
        <div class="upsell-pricing">
          <span class="upsell-original-price">${fmt(offer.originalPrice)}</span>
          <span class="upsell-discount-price">${fmt(offer.discountPrice)}</span>
          <span class="upsell-period">/year</span>
        </div>
        <button type="button" class="btn-primary upsell-add-btn" data-index="${index}">Add to order</button>
      </div>`
  }).join('')

  return cards
}
