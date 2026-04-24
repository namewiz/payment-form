var S=`<div class="payment-form-container">
  <div class="form-header">
    <h1>Secure checkout</h1>
  </div>

  <div class="progress-bar" aria-hidden="true">
    <!-- Progress steps rendered dynamically by JS based on pipeline -->
  </div>

  <form id="payment-form" class="form-body" novalidate>
    <!-- Step: Cart -->
    <div class="form-step active" data-step="cart">
      <div class="cart-section">
        <h3>Your Cart</h3>
        <div id="cart-items">
          <!-- Cart item rows rendered by JS -->
        </div>
        <div class="cart-totals" id="cart-totals">
          <!-- Totals rendered by JS -->
        </div>
      </div>

      <div class="form-group">
        <label for="discount-code">Discount code</label>
        <input type="text" id="discount-code" name="discountCode" placeholder="DISCOUNT2025" autocomplete="off" />
        <span class="hint">Discounts are applied at checkout.</span>
      </div>

      <div class="form-actions">
        <button type="button" class="btn-primary" id="next-step-cart">
          Continue
        </button>
      </div>
    </div>

    <!-- Step: Customer Information -->
    <div class="form-step" data-step="customer">
      <div class="form-group">
        <label for="full-name">
          Full Name<span class="required">*</span>
        </label>
        <input type="text" id="full-name" name="fullName" autocomplete="name" placeholder="John Doe" required
          aria-required="true" aria-describedby="full-name-error" />
        <span class="error-message" id="full-name-error">Please enter your full name</span>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="email">
            Email<span class="required">*</span>
          </label>
          <input type="email" id="email" name="email" autocomplete="email" placeholder="john@example.com" required
            aria-required="true" aria-describedby="email-error" />
          <span class="error-message" id="email-error">Please enter a valid email</span>
        </div>

        <div class="form-group">
          <label for="phone" class="label-with-tooltip">
            <span class="label-text">Phone Number<span class="required">*</span></span>
            <span class="info-icon" tabindex="0" aria-describedby="phone-format-tooltip"
              aria-label="Phone format info">i</span>
            <span class="tooltip" id="phone-format-tooltip" role="tooltip">International format (e.g., +1 555 123
              4567)</span>
          </label>
          <input type="tel" id="phone" name="phone" autocomplete="tel" placeholder="+1 (555) 123-4567" required
            aria-required="true" aria-describedby="phone-error" />
          <span class="error-message" id="phone-error">Please enter a valid phone number</span>
        </div>
      </div>

      <div class="form-group">
        <label for="address-line1">
          Street Address<span class="required">*</span>
        </label>
        <input type="text" id="address-line1" name="addressLine1" autocomplete="address-line1"
          placeholder="123 Main Street" required aria-required="true" aria-describedby="address-line1-error" />
        <span class="error-message" id="address-line1-error">Please enter your street address</span>
      </div>

      <div class="form-row form-row-3">
        <div class="form-group">
          <label for="state">
            State
          </label>
          <input type="text" id="state" name="state" autocomplete="address-level1" placeholder="NY" />
        </div>

        <div class="form-group">
          <label for="country">
            Country<span class="required">*</span>
          </label>
          <select id="country" name="country" autocomplete="country" required aria-required="true"
            aria-describedby="country-error">
          </select>
          <span class="error-message" id="country-error">Please select your country</span>
        </div>

        <div class="form-group">
          <label for="zip">
            Zip<span class="required">*</span>
          </label>
          <input type="text" id="zip" name="zip" autocomplete="postal-code" placeholder="10001" required
            aria-required="true" aria-describedby="zip-error" />
          <span class="error-message" id="zip-error">Please enter your ZIP/postal code</span>
        </div>
      </div>

      <div class="form-actions">
        <button type="button" class="btn-secondary" id="prev-step-customer">
          Back
        </button>
        <button type="button" class="btn-primary" id="next-step-customer">
          Continue to Payment
        </button>
      </div>
    </div>

    <!-- Step: Payment Information -->
    <div class="form-step" data-step="payment">
      <div class="form-group">
        <label for="card-number">
          Card Number<span class="required">*</span>
        </label>
        <input type="text" id="card-number" name="cardNumber" autocomplete="cc-number" placeholder="1234 5678 9012 3456"
          maxlength="19" required aria-required="true" aria-describedby="card-number-error" inputmode="numeric" />
        <span class="error-message" id="card-number-error">Please enter a valid card number</span>
      </div>

      <div class="card-input-group">
        <div class="form-group">
          <label for="expiry-date">
            Expiry Date<span class="required">*</span>
          </label>
          <input type="text" id="expiry-date" name="expiryDate" autocomplete="cc-exp" placeholder="MM/YY" maxlength="5"
            required aria-required="true" aria-describedby="expiry-date-error" inputmode="numeric" />
          <span class="error-message" id="expiry-date-error">Please enter expiry date</span>
        </div>

        <div class="form-group">
          <label for="cvc">
            CVC<span class="required">*</span>
          </label>
          <input type="text" id="cvc" name="cvc" autocomplete="cc-csc" placeholder="123" maxlength="4" required
            aria-required="true" aria-describedby="cvc-error" inputmode="numeric" />
          <span class="error-message" id="cvc-error">Please enter CVC</span>
        </div>
      </div>

      <div class="checkbox-group">
        <input type="checkbox" id="separate-billing" name="separateBilling" />
        <label for="separate-billing">Use a different billing address</label>
      </div>

      <div id="billing-address-fields">
        <div class="form-group">
          <label for="billing-address-line1">
            Billing Street Address<span class="required">*</span>
          </label>
          <input type="text" id="billing-address-line1" name="billingAddressLine1" autocomplete="billing address-line1"
            placeholder="123 Billing Street" />
          <span class="error-message" id="billing-address-line1-error">Please enter billing address</span>
        </div>

        <div class="form-row form-row-3">
          <div class="form-group">
            <label for="billing-state">
              State
            </label>
            <input type="text" id="billing-state" name="billingState" autocomplete="billing address-level1"
              placeholder="NY" />
          </div>

          <div class="form-group">
            <label for="billing-country">
              Country<span class="required">*</span>
            </label>
            <select id="billing-country" name="billingCountry" autocomplete="billing country">
            </select>
            <span class="error-message" id="billing-country-error">Please select billing country</span>
          </div>

          <div class="form-group">
            <label for="billing-zip">
              Zip<span class="required">*</span>
            </label>
            <input type="text" id="billing-zip" name="billingZip" autocomplete="billing postal-code"
              placeholder="10001" />
            <span class="error-message" id="billing-zip-error">Please enter billing ZIP code</span>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button type="button" class="btn-secondary" id="prev-step-payment">
          Back
        </button>
        <button type="submit" class="btn-primary" id="submit-form">
          <span id="submit-text">Register Now</span>
          <span class="loading-spinner"></span>
        </button>
      </div>
    </div>

    <!-- Step: Status / Processing -->
    <div class="form-step" data-step="processing">
      <div class="confirmation-content" id="status-content">
        <div class="confirmation-icon" aria-hidden="true">\u23F3</div>
        <h2 id="processing-heading">Processing registration</h2>
        <p>Please do not close this page while we complete your order.</p>
        <div class="summary-section">
          <div class="summary-item">
            <span class="summary-label">Status</span>
            <span class="summary-value" id="status-text">Initializing...</span>
          </div>
        </div>
      </div>
    </div>
  </form>
</div>
`;var E=[{code:"AF",name:"Afghanistan"},{code:"AX",name:"\xC5land Islands"},{code:"AL",name:"Albania"},{code:"DZ",name:"Algeria"},{code:"AS",name:"American Samoa"},{code:"AD",name:"Andorra"},{code:"AO",name:"Angola"},{code:"AI",name:"Anguilla"},{code:"AQ",name:"Antarctica"},{code:"AG",name:"Antigua and Barbuda"},{code:"AR",name:"Argentina"},{code:"AM",name:"Armenia"},{code:"AW",name:"Aruba"},{code:"AU",name:"Australia"},{code:"AT",name:"Austria"},{code:"AZ",name:"Azerbaijan"},{code:"BS",name:"Bahamas"},{code:"BH",name:"Bahrain"},{code:"BD",name:"Bangladesh"},{code:"BB",name:"Barbados"},{code:"BY",name:"Belarus"},{code:"BE",name:"Belgium"},{code:"BZ",name:"Belize"},{code:"BJ",name:"Benin"},{code:"BM",name:"Bermuda"},{code:"BT",name:"Bhutan"},{code:"BO",name:"Bolivia"},{code:"BQ",name:"Bonaire, Sint Eustatius and Saba"},{code:"BA",name:"Bosnia and Herzegovina"},{code:"BW",name:"Botswana"},{code:"BV",name:"Bouvet Island"},{code:"BR",name:"Brazil"},{code:"IO",name:"British Indian Ocean Territory"},{code:"BN",name:"Brunei Darussalam"},{code:"BG",name:"Bulgaria"},{code:"BF",name:"Burkina Faso"},{code:"BI",name:"Burundi"},{code:"CV",name:"Cabo Verde"},{code:"KH",name:"Cambodia"},{code:"CM",name:"Cameroon"},{code:"CA",name:"Canada"},{code:"KY",name:"Cayman Islands"},{code:"CF",name:"Central African Republic"},{code:"TD",name:"Chad"},{code:"CL",name:"Chile"},{code:"CN",name:"China"},{code:"CX",name:"Christmas Island"},{code:"CC",name:"Cocos (Keeling) Islands"},{code:"CO",name:"Colombia"},{code:"KM",name:"Comoros"},{code:"CG",name:"Congo"},{code:"CD",name:"Congo, Democratic Republic of the"},{code:"CK",name:"Cook Islands"},{code:"CR",name:"Costa Rica"},{code:"CI",name:"C\xF4te d'Ivoire"},{code:"HR",name:"Croatia"},{code:"CU",name:"Cuba"},{code:"CW",name:"Cura\xE7ao"},{code:"CY",name:"Cyprus"},{code:"CZ",name:"Czechia"},{code:"DK",name:"Denmark"},{code:"DJ",name:"Djibouti"},{code:"DM",name:"Dominica"},{code:"DO",name:"Dominican Republic"},{code:"EC",name:"Ecuador"},{code:"EG",name:"Egypt"},{code:"SV",name:"El Salvador"},{code:"GQ",name:"Equatorial Guinea"},{code:"ER",name:"Eritrea"},{code:"EE",name:"Estonia"},{code:"SZ",name:"Eswatini"},{code:"ET",name:"Ethiopia"},{code:"FK",name:"Falkland Islands (Malvinas)"},{code:"FO",name:"Faroe Islands"},{code:"FJ",name:"Fiji"},{code:"FI",name:"Finland"},{code:"FR",name:"France"},{code:"GF",name:"French Guiana"},{code:"PF",name:"French Polynesia"},{code:"TF",name:"French Southern Territories"},{code:"GA",name:"Gabon"},{code:"GM",name:"Gambia"},{code:"GE",name:"Georgia"},{code:"DE",name:"Germany"},{code:"GH",name:"Ghana"},{code:"GI",name:"Gibraltar"},{code:"GR",name:"Greece"},{code:"GL",name:"Greenland"},{code:"GD",name:"Grenada"},{code:"GP",name:"Guadeloupe"},{code:"GU",name:"Guam"},{code:"GT",name:"Guatemala"},{code:"GG",name:"Guernsey"},{code:"GN",name:"Guinea"},{code:"GW",name:"Guinea-Bissau"},{code:"GY",name:"Guyana"},{code:"HT",name:"Haiti"},{code:"HM",name:"Heard Island and McDonald Islands"},{code:"VA",name:"Holy See"},{code:"HN",name:"Honduras"},{code:"HK",name:"Hong Kong"},{code:"HU",name:"Hungary"},{code:"IS",name:"Iceland"},{code:"IN",name:"India"},{code:"ID",name:"Indonesia"},{code:"IR",name:"Iran"},{code:"IQ",name:"Iraq"},{code:"IE",name:"Ireland"},{code:"IM",name:"Isle of Man"},{code:"IL",name:"Israel"},{code:"IT",name:"Italy"},{code:"JM",name:"Jamaica"},{code:"JP",name:"Japan"},{code:"JE",name:"Jersey"},{code:"JO",name:"Jordan"},{code:"KZ",name:"Kazakhstan"},{code:"KE",name:"Kenya"},{code:"KI",name:"Kiribati"},{code:"KP",name:"Korea, Democratic People's Republic of"},{code:"KR",name:"Korea, Republic of"},{code:"XK",name:"Kosovo"},{code:"KW",name:"Kuwait"},{code:"KG",name:"Kyrgyzstan"},{code:"LA",name:"Lao People's Democratic Republic"},{code:"LV",name:"Latvia"},{code:"LB",name:"Lebanon"},{code:"LS",name:"Lesotho"},{code:"LR",name:"Liberia"},{code:"LY",name:"Libya"},{code:"LI",name:"Liechtenstein"},{code:"LT",name:"Lithuania"},{code:"LU",name:"Luxembourg"},{code:"MO",name:"Macao"},{code:"MG",name:"Madagascar"},{code:"MW",name:"Malawi"},{code:"MY",name:"Malaysia"},{code:"MV",name:"Maldives"},{code:"ML",name:"Mali"},{code:"MT",name:"Malta"},{code:"MH",name:"Marshall Islands"},{code:"MQ",name:"Martinique"},{code:"MR",name:"Mauritania"},{code:"MU",name:"Mauritius"},{code:"YT",name:"Mayotte"},{code:"MX",name:"Mexico"},{code:"FM",name:"Micronesia"},{code:"MD",name:"Moldova"},{code:"MC",name:"Monaco"},{code:"MN",name:"Mongolia"},{code:"ME",name:"Montenegro"},{code:"MS",name:"Montserrat"},{code:"MA",name:"Morocco"},{code:"MZ",name:"Mozambique"},{code:"MM",name:"Myanmar"},{code:"NA",name:"Namibia"},{code:"NR",name:"Nauru"},{code:"NP",name:"Nepal"},{code:"NL",name:"Netherlands"},{code:"NC",name:"New Caledonia"},{code:"NZ",name:"New Zealand"},{code:"NI",name:"Nicaragua"},{code:"NE",name:"Niger"},{code:"NG",name:"Nigeria"},{code:"NU",name:"Niue"},{code:"NF",name:"Norfolk Island"},{code:"MK",name:"North Macedonia"},{code:"MP",name:"Northern Mariana Islands"},{code:"NO",name:"Norway"},{code:"OM",name:"Oman"},{code:"PK",name:"Pakistan"},{code:"PW",name:"Palau"},{code:"PS",name:"Palestine, State of"},{code:"PA",name:"Panama"},{code:"PG",name:"Papua New Guinea"},{code:"PY",name:"Paraguay"},{code:"PE",name:"Peru"},{code:"PH",name:"Philippines"},{code:"PN",name:"Pitcairn"},{code:"PL",name:"Poland"},{code:"PT",name:"Portugal"},{code:"PR",name:"Puerto Rico"},{code:"QA",name:"Qatar"},{code:"RE",name:"R\xE9union"},{code:"RO",name:"Romania"},{code:"RU",name:"Russian Federation"},{code:"RW",name:"Rwanda"},{code:"BL",name:"Saint Barth\xE9lemy"},{code:"SH",name:"Saint Helena, Ascension and Tristan da Cunha"},{code:"KN",name:"Saint Kitts and Nevis"},{code:"LC",name:"Saint Lucia"},{code:"MF",name:"Saint Martin (French part)"},{code:"PM",name:"Saint Pierre and Miquelon"},{code:"VC",name:"Saint Vincent and the Grenadines"},{code:"WS",name:"Samoa"},{code:"SM",name:"San Marino"},{code:"ST",name:"Sao Tome and Principe"},{code:"SA",name:"Saudi Arabia"},{code:"SN",name:"Senegal"},{code:"RS",name:"Serbia"},{code:"SC",name:"Seychelles"},{code:"SL",name:"Sierra Leone"},{code:"SG",name:"Singapore"},{code:"SX",name:"Sint Maarten (Dutch part)"},{code:"SK",name:"Slovakia"},{code:"SI",name:"Slovenia"},{code:"SB",name:"Solomon Islands"},{code:"SO",name:"Somalia"},{code:"ZA",name:"South Africa"},{code:"GS",name:"South Georgia and the South Sandwich Islands"},{code:"SS",name:"South Sudan"},{code:"ES",name:"Spain"},{code:"LK",name:"Sri Lanka"},{code:"SD",name:"Sudan"},{code:"SR",name:"Suriname"},{code:"SJ",name:"Svalbard and Jan Mayen"},{code:"SE",name:"Sweden"},{code:"CH",name:"Switzerland"},{code:"SY",name:"Syrian Arab Republic"},{code:"TW",name:"Taiwan"},{code:"TJ",name:"Tajikistan"},{code:"TZ",name:"Tanzania"},{code:"TH",name:"Thailand"},{code:"TL",name:"Timor-Leste"},{code:"TG",name:"Togo"},{code:"TK",name:"Tokelau"},{code:"TO",name:"Tonga"},{code:"TT",name:"Trinidad and Tobago"},{code:"TN",name:"Tunisia"},{code:"TR",name:"Turkey"},{code:"TM",name:"Turkmenistan"},{code:"TC",name:"Turks and Caicos Islands"},{code:"TV",name:"Tuvalu"},{code:"UG",name:"Uganda"},{code:"UA",name:"Ukraine"},{code:"AE",name:"United Arab Emirates"},{code:"GB",name:"United Kingdom"},{code:"US",name:"United States"},{code:"UM",name:"United States Minor Outlying Islands"},{code:"UY",name:"Uruguay"},{code:"UZ",name:"Uzbekistan"},{code:"VU",name:"Vanuatu"},{code:"VE",name:"Venezuela"},{code:"VN",name:"Viet Nam"},{code:"VG",name:"Virgin Islands (British)"},{code:"VI",name:"Virgin Islands (U.S.)"},{code:"WF",name:"Wallis and Futuna"},{code:"EH",name:"Western Sahara"},{code:"YE",name:"Yemen"},{code:"ZM",name:"Zambia"},{code:"ZW",name:"Zimbabwe"}];function C(c={}){return Array.isArray(c.items)&&c.items.length>0?c.items.map(e=>({type:e.type||"domain",action:e.action||"registration",name:e.name||"",years:typeof e.years=="number"&&e.years>=1?e.years:1,unitPrice:typeof e.unitPrice=="number"?e.unitPrice:0,taxRate:typeof e.taxRate=="number"?e.taxRate:0,feeAmount:typeof e.feeAmount=="number"?e.feeAmount:0})):[{type:"domain",action:"registration",name:c.domain||"",years:1,unitPrice:typeof c.basePrice=="number"?c.basePrice:12,taxRate:typeof c.taxesRate=="number"?c.taxesRate:.075,feeAmount:typeof c.feeAmount=="number"?c.feeAmount:1.5}]}function k(c,e){let t=o=>`${e}${o.toFixed(2)}`,r={domain:"Domain",email:"Email",hosting:"Hosting"},n={registration:"New",renewal:"Renewal",transfer:"Transfer"},a=c.length>1;return c.map((o,d)=>{let m=o.unitPrice*o.years,p=r[o.type]||o.type,g=n[o.action]||o.action,s=[1,2,3,4,5].map(u=>`<option value="${u}"${u===o.years?" selected":""}>${u} ${u===1?"year":"years"}</option>`).join("");return`
      <div class="cart-item" data-index="${d}">
        <div class="cart-item-info">
          <span class="cart-type-badge cart-type-${o.type}">${p}</span>
          <span class="cart-action-badge cart-action-${o.action}">${g}</span>
          <span class="cart-item-name">${o.name}</span>
        </div>
        <div class="cart-item-controls">
          <select class="cart-year-select" data-index="${d}" aria-label="Duration for ${o.name}">
            ${s}
          </select>
          <span class="cart-item-price">${t(m)}</span>
          <button type="button" class="cart-remove-btn" data-index="${d}" aria-label="Remove ${o.name}"${a?"":" disabled"}>&times;</button>
        </div>
      </div>`}).join("")}function M(c,e){let t=r=>`${e}${r.toFixed(2)}`;return`
    <div class="cart-totals-row">
      <span>Subtotal</span>
      <span>${t(c.subtotal)}</span>
    </div>
    <div class="cart-totals-row">
      <span>Tax</span>
      <span>${t(c.tax)}</span>
    </div>
    <div class="cart-totals-row">
      <span>Fees</span>
      <span>${t(c.fees)}</span>
    </div>
    <div class="cart-totals-row cart-totals-total">
      <span>Total</span>
      <span>${t(c.total)}</span>
    </div>`}function T(c){let e=0,t=0,r=0;for(let a of c){let i=a.unitPrice*a.years,o=i*a.taxRate,d=a.feeAmount;e+=i,t+=o,r+=d}e=Math.round(e*100)/100,t=Math.round(t*100)/100,r=Math.round(r*100)/100;let n=Math.round((e+t+r)*100)/100;return{subtotal:e,tax:t,fees:r,total:n}}var f=class{constructor(e=document,t={}){if(this.root=e,this.pipeline=["cart","customer","payment","processing"],this.currentStep="cart",this.formData={},this.config={domain:typeof t.domain=="string"&&t.domain.trim()?t.domain.trim():void 0,currency:typeof t.currency=="string"&&t.currency.trim()?t.currency.toUpperCase().trim():void 0,basePrice:typeof t.basePrice=="number"?t.basePrice:12,taxesRate:typeof t.taxesRate=="number"?t.taxesRate:.075,feeAmount:typeof t.feeAmount=="number"?t.feeAmount:1.5,customer:t.customer||{},items:t.items||[],paymentStyle:t.paymentStyle||"inline",transactionType:t.transactionType||"registration",theme:(()=>{let r=typeof t.theme=="string"?t.theme.trim().toLowerCase():void 0;return r==="light"||r==="dark"?r:"system"})()},!this.config.domain||!this.config.currency)throw new Error("PaymentForm: domain and currency are required configuration options");this.currencySymbol=this.getCurrencySymbol(this.config.currency),this.skipCustomerStep=!1,this.initTheme(),this.initEventListeners(),this.populateCountries(),this.renderProgressBar(),this.prefillCustomerInfo(),this.renderCart(),this.computeAndRenderOrderSummary(),this.applyWording(),this.trackEvent&&this.trackEvent("payment_form_viewed",{domain:this.config.domain,currency:this.config.currency})}getElement(e){return this.root?.querySelector(e)}initTheme(){let e=this.root?.host||document.documentElement,t=typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",r=this.config.theme==="light"||this.config.theme==="dark"?this.config.theme:t;e.setAttribute("data-theme",r)}initEventListeners(){let e=this.getElement("#next-step-cart");e&&e.addEventListener("click",()=>this.nextStep());let t=this.getElement("#next-step-customer");t&&t.addEventListener("click",()=>this.validateAndNextStep("customer"));let r=this.getElement("#prev-step-customer");r&&r.addEventListener("click",()=>this.prevStep());let n=this.getElement("#prev-step-payment");n&&n.addEventListener("click",()=>this.prevStep());let a=this.getElement("#payment-form");a&&a.addEventListener("submit",o=>this.handleSubmit(o));let i=this.getElement("#separate-billing");i&&i.addEventListener("change",o=>{let d=this.getElement("#billing-address-fields");o.target.checked?(d.classList.add("show"),this.setBillingFieldsRequired(!0)):(d.classList.remove("show"),this.setBillingFieldsRequired(!1),this.clearBillingErrors())}),this.setupCardFormatting()}populateCountries(){let e=this.getElement("#country"),t=this.getElement("#billing-country");if(!e&&!t)return;let n=[{code:"",name:"Select Country"},...E].map(i=>`<option value="${i.code}">${i.name}</option>`).join("");e&&e.options.length===0&&(e.innerHTML=n),t&&t.options.length===0&&(t.innerHTML=n)}gtagAvailable(){return typeof window<"u"&&typeof window.gtag=="function"}trackEvent(e,t={}){if(!this.gtagAvailable())return!1;try{return window.gtag("event",e,t),!0}catch{return!1}}getCurrencySymbol(e){return{USD:"$",EUR:"\u20AC",GBP:"\xA3",NGN:"\u20A6",GHS:"\u20B5",KES:"KSh",ZAR:"R"}[e]||e+" "}getPrimaryAction(){let e=new Set(this.config.items.map(t=>t.action||"registration"));return e.size>1?"mixed":e.size===1?[...e][0]:this.config.transactionType||"registration"}getWording(){let e=this.getPrimaryAction(),t=new Set(this.config.items.map(m=>m.type)).size>1,r=this.config.items.length>0?this.config.items[0].type:"domain",n={registration:{submit:"Register Now",processing:"Processing registration",successHeading:"Registration complete",successMessage:"Your registration was successful."},renewal:{submit:"Renew Now",processing:"Processing renewal",successHeading:"Renewal complete",successMessage:"Your renewal was successful."},transfer:{submit:"Transfer Now",processing:"Processing transfer",successHeading:"Transfer initiated",successMessage:"Your transfer has been initiated."},mixed:{submit:"Pay Now",processing:"Processing your order",successHeading:"Order complete",successMessage:"Your order was successful."}},a={registration:["Verifying payment","Setting up user account","Acquiring domain","Sending confirmation email","Setting up DNS records","Putting the finishing touches"],renewal:["Verifying payment","Extending registration","Updating DNS records","Sending confirmation email","Putting the finishing touches"],transfer:["Verifying payment","Initiating domain transfer","Verifying transfer eligibility","Sending transfer confirmation","Putting the finishing touches"],mixed:["Verifying payment","Processing items","Sending confirmation email","Putting the finishing touches"]},i=n[e]||n.registration,o=a[e]||a.registration;return{...i,processingSteps:o,itemDescription:t?"items":r}}prefillCustomerInfo(){let{name:e,email:t,phone:r}=this.config.customer||{},n=(d,m)=>{let p=this.getElement(d);return!p||m==null||m===""?!1:(p.value=m,p.setAttribute("readonly","readonly"),p.setAttribute("aria-readonly","true"),p.classList.add("prefilled"),!0)},a=n("#full-name",e),i=n("#email",t),o=n("#phone",r);this.skipCustomerStep=!!(a&&i&&o)}computeAndRenderOrderSummary(){this.orderTotals=T(this.config.items);let e=this.getElement("#cart-totals");e&&(e.innerHTML=M(this.orderTotals,this.currencySymbol))}renderCart(){let e=this.getElement("#cart-items");e&&(e.innerHTML=k(this.config.items,this.currencySymbol),e.querySelectorAll(".cart-year-select").forEach(t=>{t.addEventListener("change",r=>{let n=parseInt(r.target.dataset.index);this.config.items[n].years=parseInt(r.target.value),this.renderCart(),this.computeAndRenderOrderSummary()})}),e.querySelectorAll(".cart-remove-btn").forEach(t=>{t.addEventListener("click",r=>{let n=parseInt(r.target.dataset.index);this.config.items.length<=1||(this.config.items.splice(n,1),this.renderCart(),this.computeAndRenderOrderSummary())})}))}setItems(e){this.config.items=e,this.renderCart(),this.computeAndRenderOrderSummary()}renderProgressBar(){let e=this.getElement(".progress-bar");e&&(e.innerHTML=this.pipeline.map(t=>`<div class="progress-step${t===this.currentStep?" active":""}" data-step="${t}"></div>`).join(""))}applyWording(){let e=this.getWording(),t=this.getElement("#submit-text");t&&(t.textContent=e.submit);let r=this.getElement("#processing-heading");r&&(r.textContent=e.processing)}setupCardFormatting(){let e=this.getElement("#card-number"),t=this.getElement("#expiry-date"),r=this.getElement("#cvc");e.addEventListener("input",a=>{let i=a.target.value.replace(/\s/g,"");i=i.replace(/\D/g,""),i=i.substring(0,16);let o=i.match(/.{1,4}/g)?.join(" ")||i;a.target.value=o}),t.addEventListener("input",a=>{let i=a.target.value.replace(/\D/g,"");i.length>=2&&(i=i.substring(0,2)+"/"+i.substring(2,4)),a.target.value=i}),r.addEventListener("input",a=>{a.target.value=a.target.value.replace(/\D/g,"").substring(0,4)}),this.getElement("#phone").addEventListener("input",a=>{let i=a.target.value.replace(/[^\d+\s()-]/g,"");a.target.value=i})}setBillingFieldsRequired(e){["billing-address-line1","billing-state","billing-zip","billing-country"].forEach(r=>{let n=this.getElement(`#${r}`);e?(n.setAttribute("required","required"),n.setAttribute("aria-required","true")):(n.removeAttribute("required"),n.removeAttribute("aria-required"))})}clearBillingErrors(){["billing-address-line1","billing-state","billing-zip","billing-country"].forEach(t=>{let r=this.getElement(`#${t}`),n=this.getElement(`#${t}-error`);r.classList.remove("error"),n&&n.classList.remove("show")})}validateStep(e){let t=!0;if(this.getFieldsForStep(e).forEach(n=>{let a=this.getElement(`#${n}`),i=this.getElement(`#${n}-error`);if(a.classList.remove("error"),i&&i.classList.remove("show"),a.hasAttribute("required")&&!a.value.trim())t=!1,a.classList.add("error"),i&&i.classList.add("show");else if(a.type==="email"&&a.value.trim())/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.value.trim())||(t=!1,a.classList.add("error"),i&&(i.textContent="Please enter a valid email address",i.classList.add("show")));else if(n==="card-number"&&a.value.trim()){let o=a.value.replace(/\s/g,"");(o.length<13||o.length>19)&&(t=!1,a.classList.add("error"),i&&i.classList.add("show"))}else if(n==="expiry-date"&&a.value.trim())if(!/^(0[1-9]|1[0-2])\/\d{2}$/.test(a.value))t=!1,a.classList.add("error"),i&&(i.textContent="Please enter valid expiry (MM/YY)",i.classList.add("show"));else{let[d,m]=a.value.split("/"),p=new Date(2e3+parseInt(m),parseInt(d)-1),g=new Date;g.setDate(1),p<g&&(t=!1,a.classList.add("error"),i&&(i.textContent="Card has expired",i.classList.add("show")))}else n==="cvc"&&a.value.trim()&&(a.value.length<3||a.value.length>4)&&(t=!1,a.classList.add("error"),i&&i.classList.add("show"))}),!t){let n=this.root.querySelector(".error");n&&n.focus()}return t}getFieldsForStep(e){if(e==="customer")return["full-name","email","phone","address-line1","state","zip","country"];if(e==="payment"){let t=["card-number","expiry-date","cvc"],r=this.getElement("#separate-billing");return r&&r.checked&&t.push("billing-address-line1","billing-state","billing-zip","billing-country"),t}return[]}collectFormData(){let e=this.getElement("#discount-code")?.value?.trim()||"";this.formData={order:{domain:this.config.domain,currency:this.config.currency,items:this.config.items,discountCode:e,totals:this.orderTotals},userInfo:{fullName:this.getElement("#full-name").value.trim(),email:this.getElement("#email").value.trim(),phone:this.getElement("#phone").value.trim(),address:{line1:this.getElement("#address-line1").value.trim(),state:this.getElement("#state").value.trim(),zip:this.getElement("#zip").value.trim(),country:this.getElement("#country").value}},paymentInfo:{cardNumber:this.getElement("#card-number").value.replace(/\s/g,""),expiryDate:this.getElement("#expiry-date").value,cvc:this.getElement("#cvc").value}};let t=this.getElement("#separate-billing").checked;t?this.formData.paymentInfo.billingAddress={line1:this.getElement("#billing-address-line1").value.trim(),state:this.getElement("#billing-state").value.trim(),zip:this.getElement("#billing-zip").value.trim(),country:this.getElement("#billing-country").value}:this.formData.paymentInfo.billingAddress=this.formData.userInfo.address,this.formData.paymentInfo.separateBillingAddress=t}validateAndNextStep(e){this.validateStep(e)&&(this.collectFormData(),this.nextStep())}nextStep(){let e=this.pipeline.indexOf(this.currentStep);if(e<0||e>=this.pipeline.length-1)return;let t=this.pipeline[e+1];if(t==="customer"&&this.skipCustomerStep){let r=e+2;r<this.pipeline.length&&(t=this.pipeline[r])}this.collectFormData(),this.goToStep(t)}prevStep(){let e=this.pipeline.indexOf(this.currentStep);if(e<=0)return;let t=this.pipeline[e-1];if(t==="customer"&&this.skipCustomerStep){let r=e-2;r>=0&&(t=this.pipeline[r])}this.goToStep(t)}goToStep(e){this.root.querySelectorAll(".form-step").forEach(n=>{n.classList.remove("active")});let t=this.root.querySelector(`.form-step[data-step="${e}"]`);t&&t.classList.add("active");let r=this.pipeline.indexOf(e);if(this.root.querySelectorAll(".progress-step").forEach(n=>{let a=this.pipeline.indexOf(n.getAttribute("data-step"));n.classList.remove("active","completed"),a===r?n.classList.add("active"):a<r&&n.classList.add("completed")}),this.currentStep=e,window.scrollTo({top:0,behavior:"smooth"}),this.trackEvent("payment_form_step_viewed",{step:r,step_name:e,domain:this.config.domain,currency:this.config.currency}),e==="payment"){let n=this.orderTotals?.total||0;this.trackEvent("begin_checkout",{value:n,currency:this.config.currency,items:this.config.items.map(a=>({item_id:a.name,item_name:a.type+" "+a.action,price:a.unitPrice*a.years,quantity:1}))})}}async handleSubmit(e){if(e.preventDefault(),!this.validateStep("payment"))return;let t=this.getElement("#submit-form"),r=this.getElement("#submit-text");t&&(t.disabled=!0),t&&t.classList.add("loading"),r&&(r.textContent="Processing..."),this.collectFormData();let n=this.orderTotals?.total||0,a=this.formData?.order?.discountCode||"";this.trackEvent("add_payment_info",{payment_type:"card",value:n,currency:this.config.currency,coupon:a||void 0,items:this.config.items.map(i=>({item_id:i.name,item_name:i.type+" "+i.action,price:i.unitPrice*i.years,quantity:1}))}),this.goToStep("processing"),await this.processPaymentFlow()}async processPaymentFlow(){let e=s=>{let u=this.getElement("#status-text");u&&(u.textContent=s)};e("Securing session...");let t=await new Promise(s=>setTimeout(()=>s("recaptcha_dummy_token"),1e3));this.trackEvent("payment_milestone",{milestone:"recaptcha_token_obtained"}),e("Creating payment intent...");let r=await new Promise(s=>setTimeout(()=>s("pi_simulated_"+Math.random().toString(36).slice(2,8)),5e3));this.trackEvent("payment_milestone",{milestone:"payment_intent_created",payment_intent_id:r}),e("Charging card..."),this.trackEvent("payment_milestone",{milestone:"charge_attempt_started"}),await new Promise(s=>setTimeout(s,1200)),this.trackEvent("payment_milestone",{milestone:"charge_succeeded"});let n=this.getWording(),a=n.processingSteps,i=15e3/a.length;for(let s of a)e(s+"..."),await new Promise(u=>setTimeout(u,i)),this.trackEvent("payment_milestone",{milestone:s.toLowerCase().replace(/\s+/g,"_")});let o="txn_"+Math.random().toString(36).slice(2,10),d=this.config.items.length>0?this.config.items[0].years:1,m=this.getElement("#status-content");if(m){m.innerHTML=`
        <div class="confirmation-icon" aria-hidden="true">\u2713</div>
        <h2>${n.successHeading}</h2>
        <p>${n.successMessage}</p>
        <div class="summary-section">
          <div class="summary-item">
            <span class="summary-label">${n.itemDescription==="items"?"Items":n.itemDescription.charAt(0).toUpperCase()+n.itemDescription.slice(1)}</span>
            <span class="summary-value">${this.config.items.map(u=>u.name).join(", ")}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Period</span>
            <span class="summary-value">${d===1?"1 year":d+" years"}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Amount</span>
            <span class="summary-value">${this.getCurrencySymbol(this.config.currency)}${this.orderTotals.total.toFixed(2)}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Payment Intent</span>
            <span class="summary-value">${r}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Transaction</span>
            <span class="summary-value">${o}</span>
          </div>
        </div>
        <p>We\u2019ll email you next steps and credentials. You can now close this window.</p>
        <button type="button" class="btn-primary" id="close-payment-form">Close</button>
      `;let s=this.getElement("#close-payment-form");s&&s.addEventListener("click",()=>this.closeForm())}let p=this.orderTotals?.total||0,g=this.formData?.order?.discountCode||"";this.trackEvent("purchase",{transaction_id:o,value:p,currency:this.config.currency,coupon:g||void 0,items:this.config.items.map(s=>({item_id:s.name,item_name:s.type+" "+s.action,price:s.unitPrice*s.years,quantity:1}))})}closeForm(){let e=this.root.host;if(e&&typeof e.remove=="function"){this.trackEvent("payment_form_closed",{domain:this.config.domain,currency:this.config.currency}),e.remove();return}let t=this.getElement(".payment-form-container");t&&(this.trackEvent("payment_form_closed",{domain:this.config.domain,currency:this.config.currency}),t.style.display="none")}};var A=`:host {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --text-primary: #212529;
  --text-secondary: #6c757d;
  --border-color: #dee2e6;
  --input-bg: #ffffff;
  --input-border: #ced4da;
  --input-focus: #0d6efd;
  /* Disabled input appearance (light) */
  --input-disabled-bg: #e9ecef;
  --input-disabled-border: #dee2e6;
  --input-disabled-text: #6c757d;
  --button-primary: #0d6efd;
  --button-primary-hover: #0b5ed7;
  --button-secondary: #6c757d;
  --button-secondary-hover: #5c636a;
  --error-color: #dc3545;
  --success-color: #198754;
  --card-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: block;
  width: 100%;
}

:host([data-theme="dark"]) {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --text-primary: #e9ecef;
  --text-secondary: #adb5bd;
  --border-color: #495057;
  --input-bg: #2d2d2d;
  --input-border: #495057;
  --input-focus: #4d9fff;
  /* Disabled input appearance (dark) */
  --input-disabled-bg: #3a3a3a;
  --input-disabled-border: #5a5a5a;
  --input-disabled-text: #90979f;
  --button-primary: #4d9fff;
  --button-primary-hover: #3d8fef;
  --button-secondary: #6c757d;
  --button-secondary-hover: #5c636a;
  --card-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.3);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.payment-form-container {
  background-color: var(--bg-primary);
  border-radius: 0.5rem;
  box-shadow: var(--card-shadow);
  overflow: hidden;
}

.form-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-header h1 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
}



.progress-bar {
  display: flex;
  padding: 1rem 1.5rem;
  gap: 0.5rem;
  background-color: var(--bg-secondary);
}

.progress-step {
  flex: 1;
  height: 0.5rem;
  border-radius: 999px;
  background-color: var(--border-color);
  transition: background-color 0.3s ease-in-out;
}

/* Filled states for simple bar segments */
.progress-step.active {
  background-color: var(--button-primary);
}

.progress-step.completed {
  background-color: var(--success-color);
}

.form-body {
  padding: 2rem 1.5rem;
}

.form-step {
  display: none;
  animation: fadeIn 0.3s ease-in;
}

.form-step.active {
  display: block;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-row-3 {
  display: grid;
  /* Make third column (Zip) narrower */
  grid-template-columns: 1fr 1fr minmax(9ch, 12ch);
  gap: 1rem;
}

@media (max-width: 500px) {
  .form-row,
  .form-row-3 {
    grid-template-columns: 1fr;
  }
}

label {
  display: block;
  margin-bottom: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  color: var(--text-primary);
}

label .required {
  color: var(--error-color);
  margin-left: 0.125rem;
}

input,
select {
  width: 100%;
  padding: 0.625rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--text-primary);
  background-color: var(--input-bg);
  border: 1px solid var(--input-border);
  border-radius: 0.375rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  font-family: inherit;
}

input:focus,
select:focus {
  outline: 0;
  border-color: var(--input-focus);
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}

:host([data-theme="dark"]) input:focus,
:host([data-theme="dark"]) select:focus {
  box-shadow: 0 0 0 0.2rem rgba(77, 159, 255, 0.25);
}

input::placeholder {
  color: var(--text-secondary);
  opacity: 0.7;
}

/* Disabled and read-only inputs: make state clearly visible */
input:disabled,
select:disabled,
textarea:disabled {
  background-color: var(--input-disabled-bg);
  border-color: var(--input-disabled-border);
  color: var(--input-disabled-text);
  cursor: not-allowed;
}

/* Keep placeholder legible but subdued when disabled */
input:disabled::placeholder,
textarea:disabled::placeholder {
  color: var(--input-disabled-text);
  opacity: 0.8;
}

/* Don\u2019t show active focus styles on disabled/read-only */
input:disabled:focus,
select:disabled:focus,
textarea:disabled:focus,
input[readonly]:focus,
select[readonly]:focus,
textarea[readonly]:focus {
  outline: 0;
  box-shadow: none;
}

/* Read-only and prefilled inputs should also look inert */
input[readonly],
select[readonly],
textarea[readonly],
input.prefilled {
  background-color: var(--input-disabled-bg);
  border-color: var(--input-disabled-border);
  color: var(--input-disabled-text);
}

input.error,
select.error {
  border-color: var(--error-color);
}

input.error:focus,
select.error:focus {
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}

.error-message {
  color: var(--error-color);
  font-size: 0.75rem;
  margin-top: 0.25rem;
  display: none;
}

.error-message.show {
  display: block;
}

.hint {
  color: var(--text-secondary);
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

/* Label tooltip for phone format */
.label-with-tooltip {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  position: relative;
}

.label-with-tooltip .info-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  border: 1px solid var(--border-color);
  background-color: var(--bg-secondary);
  color: var(--text-secondary);
  cursor: help;
  user-select: none;
}

.label-with-tooltip .info-icon:hover {
  filter: brightness(0.98);
}

.label-with-tooltip .info-icon:focus {
  outline: 2px solid var(--input-focus);
  outline-offset: 2px;
}

.label-with-tooltip .tooltip {
  position: absolute;
  top: 100%;
  left: 0;
  transform: translateY(0.25rem);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  box-shadow: var(--card-shadow);
  padding: 0.5rem 0.625rem;
  font-size: 0.75rem;
  line-height: 1.2;
  z-index: 20;
  max-width: min(24rem, 90vw);
  white-space: normal;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.15s ease-in;
  pointer-events: none;
}

.label-with-tooltip:hover .tooltip,
.label-with-tooltip:focus-within .tooltip {
  opacity: 1;
  visibility: visible;
}

.checkbox-group {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-top: 1rem;
}

.checkbox-group input[type="checkbox"] {
  width: auto;
  margin-top: 0.25rem;
  cursor: pointer;
}

.checkbox-group label {
  margin-bottom: 0;
  cursor: pointer;
  user-select: none;
}

#billing-address-fields {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
  display: none;
}

#billing-address-fields.show {
  display: block;
}

.card-input-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

button {
  padding: 0.625rem 1.25rem;
  font-size: 1rem;
  font-weight: 500;
  font-family: inherit;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

button:focus {
  outline: 2px solid var(--input-focus);
  outline-offset: 2px;
}

.btn-primary {
  background-color: var(--button-primary);
  color: white;
  flex: 1;
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--button-primary-hover);
}

.btn-secondary {
  background-color: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover:not(:disabled) {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}

.confirmation-content {
  text-align: center;
}

.confirmation-icon {
  width: 4rem;
  height: 4rem;
  background-color: var(--success-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 2rem;
}

.confirmation-content h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.confirmation-content p {
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.summary-section {
  background-color: var(--bg-secondary);
  border-radius: 0.375rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
  text-align: left;
}

.summary-section h3 {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--border-color);
}

.summary-item:last-child {
  border-bottom: none;
}

.summary-label {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.summary-value {
  color: var(--text-primary);
  font-weight: 500;
  font-size: 0.875rem;
}

/* Cart styles */
.cart-section {
  margin-bottom: 1.5rem;
}

.cart-section h3 {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  margin-bottom: 0.5rem;
  background-color: var(--bg-secondary);
}

.cart-item-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  min-width: 0;
}

.cart-item-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cart-type-badge {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  padding: 0.125rem 0.5rem;
  border-radius: 999px;
  white-space: nowrap;
  background-color: var(--button-primary);
  color: white;
}

.cart-type-domain {
  background-color: #0d6efd;
}

.cart-type-email {
  background-color: #6f42c1;
}

.cart-type-hosting {
  background-color: #198754;
}

.cart-action-badge {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  padding: 0.125rem 0.5rem;
  border-radius: 999px;
  white-space: nowrap;
  background-color: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
}

.cart-action-registration {
  color: #198754;
  border-color: #198754;
}

.cart-action-renewal {
  color: #0d6efd;
  border-color: #0d6efd;
}

.cart-action-transfer {
  color: #fd7e14;
  border-color: #fd7e14;
}

.cart-item-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.cart-year-select {
  width: auto;
  padding: 0.25rem 0.5rem;
  font-size: 0.8125rem;
  border: 1px solid var(--input-border);
  border-radius: 0.25rem;
  background-color: var(--input-bg);
  color: var(--text-primary);
}

.cart-item-price {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  min-width: 4.5rem;
  text-align: right;
}

.cart-remove-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.25rem;
  line-height: 1;
  padding: 0.25rem;
  cursor: pointer;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-remove-btn:hover:not(:disabled) {
  color: var(--error-color);
  background-color: rgba(220, 53, 69, 0.1);
}

.cart-remove-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.cart-totals {
  margin-top: 0.75rem;
  padding: 0.75rem;
  background-color: var(--bg-secondary);
  border-radius: 0.375rem;
}

.cart-totals-row {
  display: flex;
  justify-content: space-between;
  padding: 0.25rem 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.cart-totals-total {
  border-top: 1px solid var(--border-color);
  margin-top: 0.25rem;
  padding-top: 0.5rem;
  font-weight: 600;
  color: var(--text-primary);
}

@media (max-width: 500px) {
  .cart-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .cart-item-controls {
    width: 100%;
    justify-content: space-between;
  }
}

.loading-spinner {
  border: 3px solid var(--border-color);
  border-top: 3px solid var(--button-primary);
  border-radius: 50%;
  width: 1.25rem;
  height: 1.25rem;
  animation: spin 0.8s linear infinite;
  display: none;
}

.loading .loading-spinner {
  display: block;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
`;var P=document.createElement("template");P.innerHTML=S;var v=class extends HTMLElement{constructor(){super(),this.paymentForm=null,this.isInitialized=!1,this.shadow=this.attachShadow({mode:"open"})}set items(e){this._items=Array.isArray(e)?e:void 0,this.isInitialized&&this.paymentForm&&this.render()}get items(){return this._items}connectedCallback(){this.isInitialized||(this.render(),this.isInitialized=!0)}render(){this.shadow.innerHTML="";let e=this.readOptionsFromAttributes(),t=typeof e.domain=="string"&&e.domain.trim().length>0,r=typeof e.currency=="string"&&e.currency.trim().length>0;if(!t||!r){console.warn("[PaymentFormElement] Missing required attributes: domain and currency. Not initializing form.");return}let n=document.createElement("style");n.textContent=A;let a=P.content.cloneNode(!0);this.shadow.appendChild(n),this.shadow.appendChild(a),this.paymentForm=new f(this.shadow,e)}readOptionsFromAttributes(){let e=l=>this.getAttribute(l),t=l=>this.getAttribute(`data-${l}`),r=t("domain")||e("domain")||void 0,n=t("currency")||e("currency")||void 0,a=t("theme")||e("theme")||void 0,i=typeof r=="string"?r.trim():void 0,o=typeof n=="string"?n.trim().toUpperCase():void 0,d={name:t("name")||e("name")||void 0,email:t("email")||e("email")||void 0,phone:t("phone")||e("phone")||void 0},m=e("base-price")?Number(e("base-price")):void 0,p=e("taxes-rate")?Number(e("taxes-rate")):void 0,g=e("fee-amount")?Number(e("fee-amount")):void 0,s=t("payment-style")||e("payment-style")||void 0,u=t("transaction-type")||e("transaction-type")||void 0,x;if(typeof s=="string"){let l=s.trim().toLowerCase();(l==="inline"||l==="external")&&(x=l)}let h;if(typeof u=="string"){let l=u.trim().toLowerCase();(l==="registration"||l==="renewal"||l==="transfer")&&(h=l)}let b,w=t("items")||e("items");if(w)try{b=JSON.parse(w)}catch{console.warn("[PaymentFormElement] Invalid JSON in items attribute.")}this._items&&(b=this._items);let y;if(typeof a=="string"){let l=a.trim().toLowerCase();l==="light"||l==="dark"?y=l:(l==="system"||l==="system-default")&&(y="system")}let L=C({items:b,domain:i,basePrice:m,taxesRate:p,feeAmount:g,transactionType:h});return{domain:i,currency:o,customer:d,basePrice:m,taxesRate:p,feeAmount:g,theme:y,items:L,paymentStyle:x,transactionType:h}}};customElements.get("payment-form")||customElements.define("payment-form",v);export{v as PaymentFormElement};
