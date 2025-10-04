var g=`<div class="payment-form-container">
  <div class="form-header">
    <h1>Secure checkout</h1>
  </div>

  <div class="progress-bar" aria-hidden="true">
    <div class="progress-step active" data-step="1"></div>
    <div class="progress-step" data-step="2"></div>
    <div class="progress-step" data-step="3"></div>
    <div class="progress-step" data-step="4"></div>
  </div>

  <form id="payment-form" class="form-body" novalidate>
    <!-- Step 1: Order Summary -->
    <div class="form-step active" data-step="1">
      <div class="summary-section">
        <h3>Order Summary</h3>
        <div class="summary-item">
          <span class="summary-label">Domain</span>
          <span class="summary-value" id="order-domain">example.ng</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Period</span>
          <span class="summary-value" id="order-period">1 year</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Total</span>
          <span class="summary-value" id="order-total">$0.00</span>
        </div>
      </div>

      <div class="form-group">
        <label for="discount-code">Discount code</label>
        <input type="text" id="discount-code" name="discountCode" placeholder="DISCOUNT2025" autocomplete="off" />
        <span class="hint">Discounts are applied at checkout.</span>
      </div>

      <div class="form-actions">
        <button type="button" class="btn-primary" id="next-step-1">
          Continue
        </button>
      </div>
    </div>

    <!-- Step 2: User Information -->
    <div class="form-step" data-step="2">
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
        <button type="button" class="btn-secondary" id="prev-step-1">
          Back
        </button>
        <button type="button" class="btn-primary" id="next-step-2">
          Continue to Payment
        </button>
      </div>
    </div>

    <!-- Step 3: Payment Information -->
    <div class="form-step" data-step="3">
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
        <button type="button" class="btn-secondary" id="prev-step-2">
          Back
        </button>
        <button type="submit" class="btn-primary" id="submit-form">
          <span id="submit-text">Pay Now</span>
          <span class="loading-spinner"></span>
        </button>
      </div>
    </div>

    <!-- Step 4: Status / Processing -->
    <div class="form-step" data-step="4">
      <div class="confirmation-content" id="status-content">
        <div class="confirmation-icon" aria-hidden="true">\u23F3</div>
        <h2>Processing your order</h2>
        <p>Please do not close this page while we complete your purchase.</p>
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
`;var h=[{code:"AF",name:"Afghanistan"},{code:"AX",name:"\xC5land Islands"},{code:"AL",name:"Albania"},{code:"DZ",name:"Algeria"},{code:"AS",name:"American Samoa"},{code:"AD",name:"Andorra"},{code:"AO",name:"Angola"},{code:"AI",name:"Anguilla"},{code:"AQ",name:"Antarctica"},{code:"AG",name:"Antigua and Barbuda"},{code:"AR",name:"Argentina"},{code:"AM",name:"Armenia"},{code:"AW",name:"Aruba"},{code:"AU",name:"Australia"},{code:"AT",name:"Austria"},{code:"AZ",name:"Azerbaijan"},{code:"BS",name:"Bahamas"},{code:"BH",name:"Bahrain"},{code:"BD",name:"Bangladesh"},{code:"BB",name:"Barbados"},{code:"BY",name:"Belarus"},{code:"BE",name:"Belgium"},{code:"BZ",name:"Belize"},{code:"BJ",name:"Benin"},{code:"BM",name:"Bermuda"},{code:"BT",name:"Bhutan"},{code:"BO",name:"Bolivia"},{code:"BQ",name:"Bonaire, Sint Eustatius and Saba"},{code:"BA",name:"Bosnia and Herzegovina"},{code:"BW",name:"Botswana"},{code:"BV",name:"Bouvet Island"},{code:"BR",name:"Brazil"},{code:"IO",name:"British Indian Ocean Territory"},{code:"BN",name:"Brunei Darussalam"},{code:"BG",name:"Bulgaria"},{code:"BF",name:"Burkina Faso"},{code:"BI",name:"Burundi"},{code:"CV",name:"Cabo Verde"},{code:"KH",name:"Cambodia"},{code:"CM",name:"Cameroon"},{code:"CA",name:"Canada"},{code:"KY",name:"Cayman Islands"},{code:"CF",name:"Central African Republic"},{code:"TD",name:"Chad"},{code:"CL",name:"Chile"},{code:"CN",name:"China"},{code:"CX",name:"Christmas Island"},{code:"CC",name:"Cocos (Keeling) Islands"},{code:"CO",name:"Colombia"},{code:"KM",name:"Comoros"},{code:"CG",name:"Congo"},{code:"CD",name:"Congo, Democratic Republic of the"},{code:"CK",name:"Cook Islands"},{code:"CR",name:"Costa Rica"},{code:"CI",name:"C\xF4te d'Ivoire"},{code:"HR",name:"Croatia"},{code:"CU",name:"Cuba"},{code:"CW",name:"Cura\xE7ao"},{code:"CY",name:"Cyprus"},{code:"CZ",name:"Czechia"},{code:"DK",name:"Denmark"},{code:"DJ",name:"Djibouti"},{code:"DM",name:"Dominica"},{code:"DO",name:"Dominican Republic"},{code:"EC",name:"Ecuador"},{code:"EG",name:"Egypt"},{code:"SV",name:"El Salvador"},{code:"GQ",name:"Equatorial Guinea"},{code:"ER",name:"Eritrea"},{code:"EE",name:"Estonia"},{code:"SZ",name:"Eswatini"},{code:"ET",name:"Ethiopia"},{code:"FK",name:"Falkland Islands (Malvinas)"},{code:"FO",name:"Faroe Islands"},{code:"FJ",name:"Fiji"},{code:"FI",name:"Finland"},{code:"FR",name:"France"},{code:"GF",name:"French Guiana"},{code:"PF",name:"French Polynesia"},{code:"TF",name:"French Southern Territories"},{code:"GA",name:"Gabon"},{code:"GM",name:"Gambia"},{code:"GE",name:"Georgia"},{code:"DE",name:"Germany"},{code:"GH",name:"Ghana"},{code:"GI",name:"Gibraltar"},{code:"GR",name:"Greece"},{code:"GL",name:"Greenland"},{code:"GD",name:"Grenada"},{code:"GP",name:"Guadeloupe"},{code:"GU",name:"Guam"},{code:"GT",name:"Guatemala"},{code:"GG",name:"Guernsey"},{code:"GN",name:"Guinea"},{code:"GW",name:"Guinea-Bissau"},{code:"GY",name:"Guyana"},{code:"HT",name:"Haiti"},{code:"HM",name:"Heard Island and McDonald Islands"},{code:"VA",name:"Holy See"},{code:"HN",name:"Honduras"},{code:"HK",name:"Hong Kong"},{code:"HU",name:"Hungary"},{code:"IS",name:"Iceland"},{code:"IN",name:"India"},{code:"ID",name:"Indonesia"},{code:"IR",name:"Iran"},{code:"IQ",name:"Iraq"},{code:"IE",name:"Ireland"},{code:"IM",name:"Isle of Man"},{code:"IL",name:"Israel"},{code:"IT",name:"Italy"},{code:"JM",name:"Jamaica"},{code:"JP",name:"Japan"},{code:"JE",name:"Jersey"},{code:"JO",name:"Jordan"},{code:"KZ",name:"Kazakhstan"},{code:"KE",name:"Kenya"},{code:"KI",name:"Kiribati"},{code:"KP",name:"Korea, Democratic People's Republic of"},{code:"KR",name:"Korea, Republic of"},{code:"XK",name:"Kosovo"},{code:"KW",name:"Kuwait"},{code:"KG",name:"Kyrgyzstan"},{code:"LA",name:"Lao People's Democratic Republic"},{code:"LV",name:"Latvia"},{code:"LB",name:"Lebanon"},{code:"LS",name:"Lesotho"},{code:"LR",name:"Liberia"},{code:"LY",name:"Libya"},{code:"LI",name:"Liechtenstein"},{code:"LT",name:"Lithuania"},{code:"LU",name:"Luxembourg"},{code:"MO",name:"Macao"},{code:"MG",name:"Madagascar"},{code:"MW",name:"Malawi"},{code:"MY",name:"Malaysia"},{code:"MV",name:"Maldives"},{code:"ML",name:"Mali"},{code:"MT",name:"Malta"},{code:"MH",name:"Marshall Islands"},{code:"MQ",name:"Martinique"},{code:"MR",name:"Mauritania"},{code:"MU",name:"Mauritius"},{code:"YT",name:"Mayotte"},{code:"MX",name:"Mexico"},{code:"FM",name:"Micronesia"},{code:"MD",name:"Moldova"},{code:"MC",name:"Monaco"},{code:"MN",name:"Mongolia"},{code:"ME",name:"Montenegro"},{code:"MS",name:"Montserrat"},{code:"MA",name:"Morocco"},{code:"MZ",name:"Mozambique"},{code:"MM",name:"Myanmar"},{code:"NA",name:"Namibia"},{code:"NR",name:"Nauru"},{code:"NP",name:"Nepal"},{code:"NL",name:"Netherlands"},{code:"NC",name:"New Caledonia"},{code:"NZ",name:"New Zealand"},{code:"NI",name:"Nicaragua"},{code:"NE",name:"Niger"},{code:"NG",name:"Nigeria"},{code:"NU",name:"Niue"},{code:"NF",name:"Norfolk Island"},{code:"MK",name:"North Macedonia"},{code:"MP",name:"Northern Mariana Islands"},{code:"NO",name:"Norway"},{code:"OM",name:"Oman"},{code:"PK",name:"Pakistan"},{code:"PW",name:"Palau"},{code:"PS",name:"Palestine, State of"},{code:"PA",name:"Panama"},{code:"PG",name:"Papua New Guinea"},{code:"PY",name:"Paraguay"},{code:"PE",name:"Peru"},{code:"PH",name:"Philippines"},{code:"PN",name:"Pitcairn"},{code:"PL",name:"Poland"},{code:"PT",name:"Portugal"},{code:"PR",name:"Puerto Rico"},{code:"QA",name:"Qatar"},{code:"RE",name:"R\xE9union"},{code:"RO",name:"Romania"},{code:"RU",name:"Russian Federation"},{code:"RW",name:"Rwanda"},{code:"BL",name:"Saint Barth\xE9lemy"},{code:"SH",name:"Saint Helena, Ascension and Tristan da Cunha"},{code:"KN",name:"Saint Kitts and Nevis"},{code:"LC",name:"Saint Lucia"},{code:"MF",name:"Saint Martin (French part)"},{code:"PM",name:"Saint Pierre and Miquelon"},{code:"VC",name:"Saint Vincent and the Grenadines"},{code:"WS",name:"Samoa"},{code:"SM",name:"San Marino"},{code:"ST",name:"Sao Tome and Principe"},{code:"SA",name:"Saudi Arabia"},{code:"SN",name:"Senegal"},{code:"RS",name:"Serbia"},{code:"SC",name:"Seychelles"},{code:"SL",name:"Sierra Leone"},{code:"SG",name:"Singapore"},{code:"SX",name:"Sint Maarten (Dutch part)"},{code:"SK",name:"Slovakia"},{code:"SI",name:"Slovenia"},{code:"SB",name:"Solomon Islands"},{code:"SO",name:"Somalia"},{code:"ZA",name:"South Africa"},{code:"GS",name:"South Georgia and the South Sandwich Islands"},{code:"SS",name:"South Sudan"},{code:"ES",name:"Spain"},{code:"LK",name:"Sri Lanka"},{code:"SD",name:"Sudan"},{code:"SR",name:"Suriname"},{code:"SJ",name:"Svalbard and Jan Mayen"},{code:"SE",name:"Sweden"},{code:"CH",name:"Switzerland"},{code:"SY",name:"Syrian Arab Republic"},{code:"TW",name:"Taiwan"},{code:"TJ",name:"Tajikistan"},{code:"TZ",name:"Tanzania"},{code:"TH",name:"Thailand"},{code:"TL",name:"Timor-Leste"},{code:"TG",name:"Togo"},{code:"TK",name:"Tokelau"},{code:"TO",name:"Tonga"},{code:"TT",name:"Trinidad and Tobago"},{code:"TN",name:"Tunisia"},{code:"TR",name:"Turkey"},{code:"TM",name:"Turkmenistan"},{code:"TC",name:"Turks and Caicos Islands"},{code:"TV",name:"Tuvalu"},{code:"UG",name:"Uganda"},{code:"UA",name:"Ukraine"},{code:"AE",name:"United Arab Emirates"},{code:"GB",name:"United Kingdom"},{code:"US",name:"United States"},{code:"UM",name:"United States Minor Outlying Islands"},{code:"UY",name:"Uruguay"},{code:"UZ",name:"Uzbekistan"},{code:"VU",name:"Vanuatu"},{code:"VE",name:"Venezuela"},{code:"VN",name:"Viet Nam"},{code:"VG",name:"Virgin Islands (British)"},{code:"VI",name:"Virgin Islands (U.S.)"},{code:"WF",name:"Wallis and Futuna"},{code:"EH",name:"Western Sahara"},{code:"YE",name:"Yemen"},{code:"ZM",name:"Zambia"},{code:"ZW",name:"Zimbabwe"}];var u=class{constructor(e=document,a={}){if(this.root=e,this.currentStep=1,this.formData={},this.config={domain:typeof a.domain=="string"&&a.domain.trim()?a.domain.trim():void 0,currency:typeof a.currency=="string"&&a.currency.trim()?a.currency.toUpperCase().trim():void 0,basePrice:typeof a.basePrice=="number"?a.basePrice:12,taxesRate:typeof a.taxesRate=="number"?a.taxesRate:.075,feeAmount:typeof a.feeAmount=="number"?a.feeAmount:1.5,customer:a.customer||{},theme:(()=>{let r=typeof a.theme=="string"?a.theme.trim().toLowerCase():void 0;return r==="light"||r==="dark"?r:"system"})()},!this.config.domain||!this.config.currency)throw new Error("PaymentForm: domain and currency are required configuration options");this.currencySymbol=this.getCurrencySymbol(this.config.currency),this.skipCustomerStep=!1,this.initTheme(),this.initEventListeners(),this.populateCountries(),this.prefillCustomerInfo(),this.computeAndRenderOrderSummary(),this.trackEvent&&this.trackEvent("payment_form_viewed",{domain:this.config.domain,currency:this.config.currency})}getElement(e){return this.root?.querySelector(e)}initTheme(){let e=this.root?.host||document.documentElement,a=typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",r=this.config.theme==="light"||this.config.theme==="dark"?this.config.theme:a;e.setAttribute("data-theme",r)}initEventListeners(){let e=this.getElement("#next-step-1");e&&e.addEventListener("click",()=>this.validateAndNextStep(1));let a=this.getElement("#next-step-2");a&&a.addEventListener("click",()=>this.validateAndNextStep(2));let r=this.getElement("#prev-step-1");r&&r.addEventListener("click",()=>this.goToStep(1));let o=this.getElement("#prev-step-2");o&&o.addEventListener("click",()=>this.goToStep(2));let t=this.getElement("#payment-form");t&&t.addEventListener("submit",s=>this.handleSubmit(s));let n=this.getElement("#separate-billing");n&&n.addEventListener("change",s=>{let d=this.getElement("#billing-address-fields");s.target.checked?(d.classList.add("show"),this.setBillingFieldsRequired(!0)):(d.classList.remove("show"),this.setBillingFieldsRequired(!1),this.clearBillingErrors())}),this.setupCardFormatting()}populateCountries(){let e=this.getElement("#country"),a=this.getElement("#billing-country");if(!e&&!a)return;let o=[{code:"",name:"Select Country"},...h].map(n=>`<option value="${n.code}">${n.name}</option>`).join("");e&&e.options.length===0&&(e.innerHTML=o),a&&a.options.length===0&&(a.innerHTML=o)}gtagAvailable(){return typeof window<"u"&&typeof window.gtag=="function"}trackEvent(e,a={}){if(!this.gtagAvailable())return!1;try{return window.gtag("event",e,a),!0}catch{return!1}}getCurrencySymbol(e){return{USD:"$",EUR:"\u20AC",GBP:"\xA3",NGN:"\u20A6",GHS:"\u20B5",KES:"KSh",ZAR:"R"}[e]||e+" "}prefillCustomerInfo(){let{name:e,email:a,phone:r}=this.config.customer||{},o=(d,l)=>{let i=this.getElement(d);return!i||l==null||l===""?!1:(i.value=l,i.setAttribute("readonly","readonly"),i.setAttribute("aria-readonly","true"),i.classList.add("prefilled"),!0)},t=o("#full-name",e),n=o("#email",a),s=o("#phone",r);this.skipCustomerStep=!!(t&&n&&s)}computeAndRenderOrderSummary(){let e=Number(this.config.basePrice),a=Math.round(e*this.config.taxesRate*100)/100,r=Math.round(this.config.feeAmount*100)/100,o=Math.round((e+a+r)*100)/100;this.orderTotals={subtotal:e,tax:a,fees:r,total:o};let t=l=>`${this.currencySymbol}${l.toFixed(2)}`,n=this.getElement("#order-domain"),s=this.getElement("#order-period"),d=this.getElement("#order-total");n&&(n.textContent=this.config.domain),s&&(s.textContent="1 year"),d&&(d.textContent=t(o))}setupCardFormatting(){let e=this.getElement("#card-number"),a=this.getElement("#expiry-date"),r=this.getElement("#cvc");e.addEventListener("input",t=>{let n=t.target.value.replace(/\s/g,"");n=n.replace(/\D/g,""),n=n.substring(0,16);let s=n.match(/.{1,4}/g)?.join(" ")||n;t.target.value=s}),a.addEventListener("input",t=>{let n=t.target.value.replace(/\D/g,"");n.length>=2&&(n=n.substring(0,2)+"/"+n.substring(2,4)),t.target.value=n}),r.addEventListener("input",t=>{t.target.value=t.target.value.replace(/\D/g,"").substring(0,4)}),this.getElement("#phone").addEventListener("input",t=>{let n=t.target.value.replace(/[^\d+\s()-]/g,"");t.target.value=n})}setBillingFieldsRequired(e){["billing-address-line1","billing-state","billing-zip","billing-country"].forEach(r=>{let o=this.getElement(`#${r}`);e?(o.setAttribute("required","required"),o.setAttribute("aria-required","true")):(o.removeAttribute("required"),o.removeAttribute("aria-required"))})}clearBillingErrors(){["billing-address-line1","billing-state","billing-zip","billing-country"].forEach(a=>{let r=this.getElement(`#${a}`),o=this.getElement(`#${a}-error`);r.classList.remove("error"),o&&o.classList.remove("show")})}validateStep(e){let a=!0;if(this.getFieldsForStep(e).forEach(o=>{let t=this.getElement(`#${o}`),n=this.getElement(`#${o}-error`);if(t.classList.remove("error"),n&&n.classList.remove("show"),t.hasAttribute("required")&&!t.value.trim())a=!1,t.classList.add("error"),n&&n.classList.add("show");else if(t.type==="email"&&t.value.trim())/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t.value.trim())||(a=!1,t.classList.add("error"),n&&(n.textContent="Please enter a valid email address",n.classList.add("show")));else if(o==="card-number"&&t.value.trim()){let s=t.value.replace(/\s/g,"");(s.length<13||s.length>19)&&(a=!1,t.classList.add("error"),n&&n.classList.add("show"))}else if(o==="expiry-date"&&t.value.trim())if(!/^(0[1-9]|1[0-2])\/\d{2}$/.test(t.value))a=!1,t.classList.add("error"),n&&(n.textContent="Please enter valid expiry (MM/YY)",n.classList.add("show"));else{let[d,l]=t.value.split("/"),i=new Date(2e3+parseInt(l),parseInt(d)-1),c=new Date;c.setDate(1),i<c&&(a=!1,t.classList.add("error"),n&&(n.textContent="Card has expired",n.classList.add("show")))}else o==="cvc"&&t.value.trim()&&(t.value.length<3||t.value.length>4)&&(a=!1,t.classList.add("error"),n&&n.classList.add("show"))}),!a){let o=this.root.querySelector(".error");o&&o.focus()}return a}getFieldsForStep(e){if(e===2)return["full-name","email","phone","address-line1","state","zip","country"];if(e===3){let a=["card-number","expiry-date","cvc"],r=this.getElement("#separate-billing");return r&&r.checked&&a.push("billing-address-line1","billing-state","billing-zip","billing-country"),a}return[]}collectFormData(){let e=this.getElement("#discount-code")?.value?.trim()||"";this.formData={order:{domain:this.config.domain,currency:this.config.currency,discountCode:e,totals:this.orderTotals},userInfo:{fullName:this.getElement("#full-name").value.trim(),email:this.getElement("#email").value.trim(),phone:this.getElement("#phone").value.trim(),address:{line1:this.getElement("#address-line1").value.trim(),state:this.getElement("#state").value.trim(),zip:this.getElement("#zip").value.trim(),country:this.getElement("#country").value}},paymentInfo:{cardNumber:this.getElement("#card-number").value.replace(/\s/g,""),expiryDate:this.getElement("#expiry-date").value,cvc:this.getElement("#cvc").value}};let a=this.getElement("#separate-billing").checked;a?this.formData.paymentInfo.billingAddress={line1:this.getElement("#billing-address-line1").value.trim(),state:this.getElement("#billing-state").value.trim(),zip:this.getElement("#billing-zip").value.trim(),country:this.getElement("#billing-country").value}:this.formData.paymentInfo.billingAddress=this.formData.userInfo.address,this.formData.paymentInfo.separateBillingAddress=a}validateAndNextStep(e){if(e===1){this.collectFormData(),this.goToStep(2);return}this.validateStep(e)&&(this.collectFormData(),this.goToStep(e+1))}goToStep(e){e===2&&this.skipCustomerStep&&(e=3),this.root.querySelectorAll(".form-step").forEach(r=>{r.classList.remove("active")}),this.root.querySelector(`.form-step[data-step="${e}"]`).classList.add("active"),this.root.querySelectorAll(".progress-step").forEach(r=>{let o=parseInt(r.getAttribute("data-step"));r.classList.remove("active","completed"),o===e?r.classList.add("active"):o<e&&r.classList.add("completed")}),this.currentStep=e,window.scrollTo({top:0,behavior:"smooth"});let a={1:"order_summary",2:"customer_info",3:"payment_info",4:"processing"};if(this.trackEvent("payment_form_step_viewed",{step:e,step_name:a[e]||"unknown",domain:this.config.domain,currency:this.config.currency}),e===3){let r=this.orderTotals?.total||0;this.trackEvent("begin_checkout",{value:r,currency:this.config.currency,items:[{item_id:this.config.domain,item_name:"Domain Registration",price:r,quantity:1}]})}}async handleSubmit(e){if(e.preventDefault(),!this.validateStep(3))return;let a=this.getElement("#submit-form"),r=this.getElement("#submit-text");a&&(a.disabled=!0),a&&a.classList.add("loading"),r&&(r.textContent="Processing..."),this.collectFormData();let o=this.orderTotals?.total||0,t=this.formData?.order?.discountCode||"";this.trackEvent("add_payment_info",{payment_type:"card",value:o,currency:this.config.currency,coupon:t||void 0,items:[{item_id:this.config.domain,item_name:"Domain Registration",price:o,quantity:1}]}),this.goToStep(4),await this.processPaymentFlow()}async processPaymentFlow(){let e=i=>{let c=this.getElement("#status-text");c&&(c.textContent=i)};e("Securing session...");let a=await new Promise(i=>setTimeout(()=>i("recaptcha_dummy_token"),1e3));this.trackEvent("payment_milestone",{milestone:"recaptcha_token_obtained"}),e("Creating payment intent...");let r=await new Promise(i=>setTimeout(()=>i("pi_simulated_"+Math.random().toString(36).slice(2,8)),5e3));this.trackEvent("payment_milestone",{milestone:"payment_intent_created",payment_intent_id:r}),e("Charging card..."),this.trackEvent("payment_milestone",{milestone:"charge_attempt_started"}),await new Promise(i=>setTimeout(i,1200)),this.trackEvent("payment_milestone",{milestone:"charge_succeeded"});let o=["Verifying payment","Setting up user account","Acquiring domain","Sending confirmation email","Setting up DNS records","Putting the finishing touches"],t=15e3/o.length;for(let i of o)e(i+"..."),await new Promise(c=>setTimeout(c,t)),this.trackEvent("payment_milestone",{milestone:i.toLowerCase().replace(/\s+/g,"_")});let n="txn_"+Math.random().toString(36).slice(2,10),s=this.getElement("#status-content");if(s){s.innerHTML=`
        <div class="confirmation-icon" aria-hidden="true">\u2713</div>
        <h2>Payment complete</h2>
        <p>Your domain purchase was successful.</p>
        <div class="summary-section">
          <div class="summary-item">
            <span class="summary-label">Domain</span>
            <span class="summary-value">${this.config.domain}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Period</span>
            <span class="summary-value">1 year</span>
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
            <span class="summary-value">${n}</span>
          </div>
        </div>
        <p>We\u2019ll email you next steps and credentials. You can now close this window.</p>
        <button type="button" class="btn-primary" id="close-payment-form">Close</button>
      `;let i=this.getElement("#close-payment-form");i&&i.addEventListener("click",()=>this.closeForm())}let d=this.orderTotals?.total||0,l=this.formData?.order?.discountCode||"";this.trackEvent("purchase",{transaction_id:n,value:d,currency:this.config.currency,coupon:l||void 0,items:[{item_id:this.config.domain,item_name:"Domain Registration",price:d,quantity:1}]})}closeForm(){let e=this.root.host;if(e&&typeof e.remove=="function"){this.trackEvent("payment_form_closed",{domain:this.config.domain,currency:this.config.currency}),e.remove();return}let a=this.getElement(".payment-form-container");a&&(this.trackEvent("payment_form_closed",{domain:this.config.domain,currency:this.config.currency}),a.style.display="none")}};var f=`:host {
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
`;var y=document.createElement("template");y.innerHTML=g;var b=class extends HTMLElement{constructor(){super(),this.paymentForm=null,this.isInitialized=!1,this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.isInitialized||(this.render(),this.isInitialized=!0)}render(){this.shadow.innerHTML="";let e=this.readOptionsFromAttributes(),a=typeof e.domain=="string"&&e.domain.trim().length>0,r=typeof e.currency=="string"&&e.currency.trim().length>0;if(!a||!r){console.warn("[PaymentFormElement] Missing required attributes: domain and currency. Not initializing form.");return}let o=document.createElement("style");o.textContent=f;let t=y.content.cloneNode(!0);this.shadow.appendChild(o),this.shadow.appendChild(t),this.paymentForm=new u(this.shadow,e)}readOptionsFromAttributes(){let e=m=>this.getAttribute(m),a=m=>this.getAttribute(`data-${m}`),r=a("domain")||e("domain")||void 0,o=a("currency")||e("currency")||void 0,t=a("theme")||e("theme")||void 0,n=typeof r=="string"?r.trim():void 0,s=typeof o=="string"?o.trim().toUpperCase():void 0,d={name:a("name")||e("name")||void 0,email:a("email")||e("email")||void 0,phone:a("phone")||e("phone")||void 0},l=e("base-price")?Number(e("base-price")):void 0,i=e("taxes-rate")?Number(e("taxes-rate")):void 0,c=e("fee-amount")?Number(e("fee-amount")):void 0,p;if(typeof t=="string"){let m=t.trim().toLowerCase();m==="light"||m==="dark"?p=m:(m==="system"||m==="system-default")&&(p="system")}return{domain:n,currency:s,customer:d,basePrice:l,taxesRate:i,feeAmount:c,theme:p}}};customElements.get("payment-form")||customElements.define("payment-form",b);export{b as PaymentFormElement};
