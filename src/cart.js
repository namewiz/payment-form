/**
 * Converts legacy single-item options into an items array.
 * This preserves backward compat: <payment-form domain="x" currency="USD">
 * auto-generates a single-item cart.
 */
export function normalizeItems(options = {}) {
  // If items are already provided, validate and return them
  if (Array.isArray(options.items) && options.items.length > 0) {
    return options.items.map((item) => ({
      type: item.type || 'domain',
      action: item.action || 'registration',
      name: item.name || '',
      years: typeof item.years === 'number' && item.years >= 1 ? item.years : 1,
      unitPrice: typeof item.unitPrice === 'number' ? item.unitPrice : 0,
      taxRate: typeof item.taxRate === 'number' ? item.taxRate : 0,
      feeAmount: typeof item.feeAmount === 'number' ? item.feeAmount : 0
    }))
  }

  // Legacy single-domain mode: convert flat options into one-item array
  return [
    {
      type: 'domain',
      action: 'registration',
      name: options.domain || '',
      years: 1,
      unitPrice: typeof options.basePrice === 'number' ? options.basePrice : 12.0,
      taxRate: typeof options.taxesRate === 'number' ? options.taxesRate : 0.075,
      feeAmount: typeof options.feeAmount === 'number' ? options.feeAmount : 1.5
    }
  ]
}

/**
 * Renders cart item rows HTML.
 * Each row shows: type badge, item name, year selector, per-item total, remove button.
 */
export function renderCartHTML(items, currencySymbol) {
  const fmt = (n) => `${currencySymbol}${n.toFixed(2)}`
  const typeLabels = { domain: 'Domain', email: 'Email', hosting: 'Hosting' }
  const canRemove = items.length > 1

  const rows = items.map((item, index) => {
    const itemTotal = item.unitPrice * item.years
    const typeLabel = typeLabels[item.type] || item.type

    const yearOptions = [1, 2, 3, 4, 5]
      .map((y) => `<option value="${y}"${y === item.years ? ' selected' : ''}>${y} ${y === 1 ? 'year' : 'years'}</option>`)
      .join('')

    return `
      <div class="cart-item" data-index="${index}">
        <div class="cart-item-info">
          <span class="cart-type-badge cart-type-${item.type}">${typeLabel}</span>
          <span class="cart-item-name">${item.name}</span>
        </div>
        <div class="cart-item-controls">
          <select class="cart-year-select" data-index="${index}" aria-label="Duration for ${item.name}">
            ${yearOptions}
          </select>
          <span class="cart-item-price">${fmt(itemTotal)}</span>
          <button type="button" class="cart-remove-btn" data-index="${index}" aria-label="Remove ${item.name}"${canRemove ? '' : ' disabled'}>&times;</button>
        </div>
      </div>`
  }).join('')

  return rows
}

/**
 * Renders cart totals HTML (subtotal, tax, fees, total).
 */
export function renderCartTotalsHTML(totals, currencySymbol) {
  const fmt = (n) => `${currencySymbol}${n.toFixed(2)}`

  return `
    <div class="cart-totals-row">
      <span>Subtotal</span>
      <span>${fmt(totals.subtotal)}</span>
    </div>
    <div class="cart-totals-row">
      <span>Tax</span>
      <span>${fmt(totals.tax)}</span>
    </div>
    <div class="cart-totals-row">
      <span>Fees</span>
      <span>${fmt(totals.fees)}</span>
    </div>
    <div class="cart-totals-row cart-totals-total">
      <span>Total</span>
      <span>${fmt(totals.total)}</span>
    </div>`
}

/**
 * Computes totals for a cart of items.
 * Returns { subtotal, tax, fees, total } with values rounded to 2 decimal places.
 */
export function computeCartTotals(items) {
  let subtotal = 0
  let tax = 0
  let fees = 0

  for (const item of items) {
    const itemSubtotal = item.unitPrice * item.years
    const itemTax = itemSubtotal * item.taxRate
    const itemFee = item.feeAmount

    subtotal += itemSubtotal
    tax += itemTax
    fees += itemFee
  }

  subtotal = Math.round(subtotal * 100) / 100
  tax = Math.round(tax * 100) / 100
  fees = Math.round(fees * 100) / 100
  const total = Math.round((subtotal + tax + fees) * 100) / 100

  return { subtotal, tax, fees, total }
}
