## Payment Form

Standalone, accessible payment form as a Web Component for domain checkout flows. It renders a 4‑step checkout UI inside Shadow DOM with built‑in validation, card input formatting, and a simulated payment flow.

Features

- Self‑contained Web Component: `<payment-form>` renders in Shadow DOM
- Required config via attributes: `domain`, `currency`
- Prefill customer data and skip the information step
- Light/dark/system theming controlled by attribute
- Basic order summary with subtotal, tax and fees
- No external CSS/JS required beyond the bundled ESM module

What this is not

- This repo simulates payment/registration. There is no real Stripe/recaptcha/network call yet; wire up your backend where appropriate.

Quick Start

1) Build the ESM bundle

```bash
npm install
npm run build
```

2) Include the bundle and drop the element in your page

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Checkout</title>
  </head>
  <body>
    <!-- Required attributes: domain, currency -->
    <payment-form domain="example.ng" currency="NGN"></payment-form>

    <!-- Load the component (defines custom element) -->
    <script type="module" src="./dist/main.js"></script>
  </body>
  </html>
```

API

Web Component: `<payment-form>`

- Required
  - `domain` (string) – Domain name being purchased. Example: `example.ng`.
  - `currency` (string) – 3‑letter currency code, upper/lowercase accepted. Example: `USD`, `NGN`. Symbols supported for: USD, EUR, GBP, NGN, GHS, KES, ZAR; otherwise the code is shown.
- Optional pricing
  - `base-price` (number) – Base price. Default: `12.0`.
  - `taxes-rate` (number) – Fractional tax rate. Default: `0.075` (7.5%).
  - `fee-amount` (number) – Flat fee. Default: `1.5`.
- Optional customer prefill (read‑only when set)
  - `name` (string)
  - `email` (string)
  - `phone` (string)
  - If all three are provided, the Customer Info step is skipped.
- Optional theming
  - `theme` (string) – `light` | `dark` | `system` | `system-default`. Defaults to system preference.

Notes

- Attributes are read once during element connection; updating attributes after initial render does not reinitialize the form. To apply new config, replace the element with a new one carrying the desired attributes (see Dynamic Config example below).
- The component defines itself on import (`customElements.define('payment-form', ...)`). See `src/main.js:101`.
- Theme is applied via `data-theme` attribute on the host or `documentElement` (when used without the custom element). See `src/payment-form.js:41`.

Programmatic Helper: `registerPaymentForm`

The bundle exports a small helper to ensure a `<payment-form>` exists in a container and returns it.

```js
import { registerPaymentForm } from './dist/main.js'

const el = registerPaymentForm({ selector: '#app' })
// If you need to pass attributes, prefer creating a new element with attributes
// before attaching it (see Dynamic Config below).
```

Usage Examples

Basic element

```html
<payment-form domain="myname.ng" currency="NGN"></payment-form>
<script type="module" src="./dist/main.js"></script>
```

Prefill customer and skip step

```html
<payment-form
  domain="acme.ng"
  currency="NGN"
  name="Jane Doe"
  email="jane@example.com"
  phone="+234 801 234 5678"
></payment-form>
<script type="module" src="./dist/main.js"></script>
```

Force theme

```html
<payment-form domain="brand.ng" currency="NGN" theme="dark"></payment-form>
<script type="module" src="./dist/main.js"></script>
```

Dynamic config (replace element)

```js
// Build a configured element, then replace the existing one
function applyCheckoutConfig({ domain, currency, customer = {}, theme = 'system' }) {
  const existing = document.querySelector('payment-form')
  const el = document.createElement('payment-form')
  el.setAttribute('domain', domain)
  el.setAttribute('currency', String(currency).toUpperCase())
  if (customer.name) el.setAttribute('name', customer.name)
  if (customer.email) el.setAttribute('email', customer.email)
  if (customer.phone) el.setAttribute('phone', customer.phone)
  if (theme) el.setAttribute('theme', theme)

  if (existing && existing.parentNode) existing.parentNode.replaceChild(el, existing)
  else document.body.appendChild(el)
}
```

Public Surface

- `PaymentFormElement` – the custom element class is defined when the module loads; not required for typical use. See `src/main.js:9`.
- `registerPaymentForm(options)` – returns the element or `null` if the container is missing. See `src/main.js:106`.
- `PaymentForm` – internal class that drives the DOM inside the ShadowRoot; not exported by the bundle for app use. See `src/payment-form.js:1`.

Behavior

- Card input formatting for number, expiry and CVC.
- Validation for required fields, email, card number length, expiry format and non‑expired date, CVC length. See `src/payment-form.js:209`.
- Separate billing address toggles required fields. See `src/payment-form.js:171`.
- Price summary = `basePrice + (basePrice * taxesRate) + feeAmount`. See `src/payment-form.js:118`.
- Simulated payment flow with status updates and final summary UI; no network calls. See `src/payment-form.js:429`.

Styling and Theming

- Runs inside Shadow DOM with scoped CSS. Theme is applied by setting `data-theme` on the host to `light`/`dark`; with `theme="system"` the component picks the OS preference on load.
- You can control width via the host element (e.g., `payment-form { max-width: 700px }`).

Local Development

- Dev (watch): `npm run dev` (writes to `dist/` and watches)
- Preview (static server): `npm run preview`
- Build (minified): `npm run build`

Project Layout

- `src/main.js` – defines and exports the custom element and helper
- `src/payment-form.js` – form logic, validation, flow
- `src/payment-form.html` – markup template rendered into Shadow DOM
- `src/style.css` – component styles and theme variables
- `src/countries.js` – country list used to populate selects
- `index.html` – simple demo page loading the built bundle

License

MIT © Justice Ogbonna
