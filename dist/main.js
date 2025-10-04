var s=class{constructor(){this.currentStep=1,this.formData={},this.initTheme(),this.initEventListeners()}initTheme(){let e=localStorage.getItem("theme")||"light";document.documentElement.setAttribute("data-theme",e),this.updateThemeIcon(e)}updateThemeIcon(e){let a=document.getElementById("theme-icon");a.textContent=e==="dark"?"\u2600\uFE0F":"\u{1F319}"}initEventListeners(){document.getElementById("theme-toggle").addEventListener("click",()=>this.toggleTheme()),document.getElementById("next-step-1").addEventListener("click",()=>this.validateAndNextStep(1)),document.getElementById("next-step-2").addEventListener("click",()=>this.validateAndNextStep(2)),document.getElementById("prev-step-2").addEventListener("click",()=>this.goToStep(1)),document.getElementById("prev-step-3").addEventListener("click",()=>this.goToStep(2)),document.getElementById("payment-form").addEventListener("submit",e=>this.handleSubmit(e)),document.getElementById("separate-billing").addEventListener("change",e=>{let a=document.getElementById("billing-address-fields");e.target.checked?(a.classList.add("show"),this.setBillingFieldsRequired(!0)):(a.classList.remove("show"),this.setBillingFieldsRequired(!1),this.clearBillingErrors())}),this.setupCardFormatting()}toggleTheme(){let a=document.documentElement.getAttribute("data-theme")==="light"?"dark":"light";document.documentElement.setAttribute("data-theme",a),localStorage.setItem("theme",a),this.updateThemeIcon(a)}setupCardFormatting(){let e=document.getElementById("card-number"),a=document.getElementById("expiry-date"),o=document.getElementById("cvc");e.addEventListener("input",r=>{let n=r.target.value.replace(/\s/g,"");n=n.replace(/\D/g,""),n=n.substring(0,16);let i=n.match(/.{1,4}/g)?.join(" ")||n;r.target.value=i}),a.addEventListener("input",r=>{let n=r.target.value.replace(/\D/g,"");n.length>=2&&(n=n.substring(0,2)+"/"+n.substring(2,4)),r.target.value=n}),o.addEventListener("input",r=>{r.target.value=r.target.value.replace(/\D/g,"").substring(0,4)}),document.getElementById("phone").addEventListener("input",r=>{let n=r.target.value.replace(/[^\d+\s()-]/g,"");r.target.value=n})}setBillingFieldsRequired(e){["billing-address-line1","billing-state","billing-zip","billing-country"].forEach(o=>{let t=document.getElementById(o);e?(t.setAttribute("required","required"),t.setAttribute("aria-required","true")):(t.removeAttribute("required"),t.removeAttribute("aria-required"))})}clearBillingErrors(){["billing-address-line1","billing-state","billing-zip","billing-country"].forEach(a=>{let o=document.getElementById(a),t=document.getElementById(`${a}-error`);o.classList.remove("error"),t&&t.classList.remove("show")})}validateStep(e){let a=!0;if(this.getFieldsForStep(e).forEach(t=>{let r=document.getElementById(t),n=document.getElementById(`${t}-error`);if(r.classList.remove("error"),n&&n.classList.remove("show"),r.hasAttribute("required")&&!r.value.trim())a=!1,r.classList.add("error"),n&&n.classList.add("show");else if(r.type==="email"&&r.value.trim())/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.value.trim())||(a=!1,r.classList.add("error"),n&&(n.textContent="Please enter a valid email address",n.classList.add("show")));else if(t==="card-number"&&r.value.trim()){let i=r.value.replace(/\s/g,"");(i.length<13||i.length>19)&&(a=!1,r.classList.add("error"),n&&n.classList.add("show"))}else if(t==="expiry-date"&&r.value.trim())if(!/^(0[1-9]|1[0-2])\/\d{2}$/.test(r.value))a=!1,r.classList.add("error"),n&&(n.textContent="Please enter valid expiry (MM/YY)",n.classList.add("show"));else{let[p,g]=r.value.split("/"),b=new Date(2e3+parseInt(g),parseInt(p)-1),l=new Date;l.setDate(1),b<l&&(a=!1,r.classList.add("error"),n&&(n.textContent="Card has expired",n.classList.add("show")))}else t==="cvc"&&r.value.trim()&&(r.value.length<3||r.value.length>4)&&(a=!1,r.classList.add("error"),n&&n.classList.add("show"))}),!a){let t=document.querySelector(".error");t&&t.focus()}return a}getFieldsForStep(e){if(e===1)return["full-name","email","phone","address-line1","state","zip","country"];if(e===2){let a=["card-number","expiry-date","cvc"];return document.getElementById("separate-billing").checked&&a.push("billing-address-line1","billing-state","billing-zip","billing-country"),a}return[]}collectFormData(){this.formData={userInfo:{fullName:document.getElementById("full-name").value.trim(),email:document.getElementById("email").value.trim(),phone:document.getElementById("phone").value.trim(),address:{line1:document.getElementById("address-line1").value.trim(),state:document.getElementById("state").value.trim(),zip:document.getElementById("zip").value.trim(),country:document.getElementById("country").value}},paymentInfo:{cardNumber:document.getElementById("card-number").value.replace(/\s/g,""),expiryDate:document.getElementById("expiry-date").value,cvc:document.getElementById("cvc").value}};let e=document.getElementById("separate-billing").checked;e?this.formData.paymentInfo.billingAddress={line1:document.getElementById("billing-address-line1").value.trim(),state:document.getElementById("billing-state").value.trim(),zip:document.getElementById("billing-zip").value.trim(),country:document.getElementById("billing-country").value}:this.formData.paymentInfo.billingAddress=this.formData.userInfo.address,this.formData.paymentInfo.separateBillingAddress=e}updateSummary(){this.collectFormData(),document.getElementById("summary-name").textContent=this.formData.userInfo.fullName,document.getElementById("summary-email").textContent=this.formData.userInfo.email,document.getElementById("summary-phone").textContent=this.formData.userInfo.phone;let e=this.formData.userInfo.address,a=[e.state,e.country,e.zip].filter(Boolean).join(", "),o=[e.line1,a].filter(Boolean).join(", ");document.getElementById("summary-address").textContent=o;let t=this.formData.paymentInfo.cardNumber.slice(-4);if(document.getElementById("summary-card").textContent=`\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 ${t}`,this.formData.paymentInfo.separateBillingAddress){let r=this.formData.paymentInfo.billingAddress,n=[r.state,r.country,r.zip].filter(Boolean).join(", "),i=[r.line1,n].filter(Boolean).join(", ");document.getElementById("summary-billing").textContent=i,document.getElementById("summary-billing-section").style.display="flex"}else document.getElementById("summary-billing-section").style.display="none"}validateAndNextStep(e){this.validateStep(e)&&(e===2&&this.updateSummary(),this.goToStep(e+1))}goToStep(e){document.querySelectorAll(".form-step").forEach(a=>{a.classList.remove("active")}),document.querySelector(`.form-step[data-step="${e}"]`).classList.add("active"),document.querySelectorAll(".progress-step").forEach(a=>{let o=parseInt(a.getAttribute("data-step"));a.classList.remove("active","completed"),o===e?a.classList.add("active"):o<e&&a.classList.add("completed")}),this.currentStep=e,window.scrollTo({top:0,behavior:"smooth"})}async handleSubmit(e){e.preventDefault();let a=document.getElementById("submit-form"),o=document.getElementById("submit-text");a.disabled=!0,a.classList.add("loading"),o.textContent="Processing...",await new Promise(t=>setTimeout(t,1500)),this.collectFormData(),console.log("Payment Form Data:",JSON.stringify(this.formData,null,2)),a.disabled=!1,a.classList.remove("loading"),o.textContent="Complete Payment",this.showSuccessMessage()}showSuccessMessage(){let e=document.querySelector(".form-body");e.innerHTML=`
      <div class="confirmation-content">
        <div class="confirmation-icon">\u2713</div>
        <h2>Payment Submitted!</h2>
        <p>Your payment information has been collected. Check the console for the submitted data.</p>
        <button type="button" class="btn-primary" onclick="location.reload()">
          Start Over
        </button>
      </div>
    `}};var c=[{code:"AF",name:"Afghanistan"},{code:"AX",name:"\xC5land Islands"},{code:"AL",name:"Albania"},{code:"DZ",name:"Algeria"},{code:"AS",name:"American Samoa"},{code:"AD",name:"Andorra"},{code:"AO",name:"Angola"},{code:"AI",name:"Anguilla"},{code:"AQ",name:"Antarctica"},{code:"AG",name:"Antigua and Barbuda"},{code:"AR",name:"Argentina"},{code:"AM",name:"Armenia"},{code:"AW",name:"Aruba"},{code:"AU",name:"Australia"},{code:"AT",name:"Austria"},{code:"AZ",name:"Azerbaijan"},{code:"BS",name:"Bahamas"},{code:"BH",name:"Bahrain"},{code:"BD",name:"Bangladesh"},{code:"BB",name:"Barbados"},{code:"BY",name:"Belarus"},{code:"BE",name:"Belgium"},{code:"BZ",name:"Belize"},{code:"BJ",name:"Benin"},{code:"BM",name:"Bermuda"},{code:"BT",name:"Bhutan"},{code:"BO",name:"Bolivia"},{code:"BQ",name:"Bonaire, Sint Eustatius and Saba"},{code:"BA",name:"Bosnia and Herzegovina"},{code:"BW",name:"Botswana"},{code:"BV",name:"Bouvet Island"},{code:"BR",name:"Brazil"},{code:"IO",name:"British Indian Ocean Territory"},{code:"BN",name:"Brunei Darussalam"},{code:"BG",name:"Bulgaria"},{code:"BF",name:"Burkina Faso"},{code:"BI",name:"Burundi"},{code:"CV",name:"Cabo Verde"},{code:"KH",name:"Cambodia"},{code:"CM",name:"Cameroon"},{code:"CA",name:"Canada"},{code:"KY",name:"Cayman Islands"},{code:"CF",name:"Central African Republic"},{code:"TD",name:"Chad"},{code:"CL",name:"Chile"},{code:"CN",name:"China"},{code:"CX",name:"Christmas Island"},{code:"CC",name:"Cocos (Keeling) Islands"},{code:"CO",name:"Colombia"},{code:"KM",name:"Comoros"},{code:"CG",name:"Congo"},{code:"CD",name:"Congo, Democratic Republic of the"},{code:"CK",name:"Cook Islands"},{code:"CR",name:"Costa Rica"},{code:"CI",name:"C\xF4te d'Ivoire"},{code:"HR",name:"Croatia"},{code:"CU",name:"Cuba"},{code:"CW",name:"Cura\xE7ao"},{code:"CY",name:"Cyprus"},{code:"CZ",name:"Czechia"},{code:"DK",name:"Denmark"},{code:"DJ",name:"Djibouti"},{code:"DM",name:"Dominica"},{code:"DO",name:"Dominican Republic"},{code:"EC",name:"Ecuador"},{code:"EG",name:"Egypt"},{code:"SV",name:"El Salvador"},{code:"GQ",name:"Equatorial Guinea"},{code:"ER",name:"Eritrea"},{code:"EE",name:"Estonia"},{code:"SZ",name:"Eswatini"},{code:"ET",name:"Ethiopia"},{code:"FK",name:"Falkland Islands (Malvinas)"},{code:"FO",name:"Faroe Islands"},{code:"FJ",name:"Fiji"},{code:"FI",name:"Finland"},{code:"FR",name:"France"},{code:"GF",name:"French Guiana"},{code:"PF",name:"French Polynesia"},{code:"TF",name:"French Southern Territories"},{code:"GA",name:"Gabon"},{code:"GM",name:"Gambia"},{code:"GE",name:"Georgia"},{code:"DE",name:"Germany"},{code:"GH",name:"Ghana"},{code:"GI",name:"Gibraltar"},{code:"GR",name:"Greece"},{code:"GL",name:"Greenland"},{code:"GD",name:"Grenada"},{code:"GP",name:"Guadeloupe"},{code:"GU",name:"Guam"},{code:"GT",name:"Guatemala"},{code:"GG",name:"Guernsey"},{code:"GN",name:"Guinea"},{code:"GW",name:"Guinea-Bissau"},{code:"GY",name:"Guyana"},{code:"HT",name:"Haiti"},{code:"HM",name:"Heard Island and McDonald Islands"},{code:"VA",name:"Holy See"},{code:"HN",name:"Honduras"},{code:"HK",name:"Hong Kong"},{code:"HU",name:"Hungary"},{code:"IS",name:"Iceland"},{code:"IN",name:"India"},{code:"ID",name:"Indonesia"},{code:"IR",name:"Iran"},{code:"IQ",name:"Iraq"},{code:"IE",name:"Ireland"},{code:"IM",name:"Isle of Man"},{code:"IL",name:"Israel"},{code:"IT",name:"Italy"},{code:"JM",name:"Jamaica"},{code:"JP",name:"Japan"},{code:"JE",name:"Jersey"},{code:"JO",name:"Jordan"},{code:"KZ",name:"Kazakhstan"},{code:"KE",name:"Kenya"},{code:"KI",name:"Kiribati"},{code:"KP",name:"Korea, Democratic People's Republic of"},{code:"KR",name:"Korea, Republic of"},{code:"XK",name:"Kosovo"},{code:"KW",name:"Kuwait"},{code:"KG",name:"Kyrgyzstan"},{code:"LA",name:"Lao People's Democratic Republic"},{code:"LV",name:"Latvia"},{code:"LB",name:"Lebanon"},{code:"LS",name:"Lesotho"},{code:"LR",name:"Liberia"},{code:"LY",name:"Libya"},{code:"LI",name:"Liechtenstein"},{code:"LT",name:"Lithuania"},{code:"LU",name:"Luxembourg"},{code:"MO",name:"Macao"},{code:"MG",name:"Madagascar"},{code:"MW",name:"Malawi"},{code:"MY",name:"Malaysia"},{code:"MV",name:"Maldives"},{code:"ML",name:"Mali"},{code:"MT",name:"Malta"},{code:"MH",name:"Marshall Islands"},{code:"MQ",name:"Martinique"},{code:"MR",name:"Mauritania"},{code:"MU",name:"Mauritius"},{code:"YT",name:"Mayotte"},{code:"MX",name:"Mexico"},{code:"FM",name:"Micronesia"},{code:"MD",name:"Moldova"},{code:"MC",name:"Monaco"},{code:"MN",name:"Mongolia"},{code:"ME",name:"Montenegro"},{code:"MS",name:"Montserrat"},{code:"MA",name:"Morocco"},{code:"MZ",name:"Mozambique"},{code:"MM",name:"Myanmar"},{code:"NA",name:"Namibia"},{code:"NR",name:"Nauru"},{code:"NP",name:"Nepal"},{code:"NL",name:"Netherlands"},{code:"NC",name:"New Caledonia"},{code:"NZ",name:"New Zealand"},{code:"NI",name:"Nicaragua"},{code:"NE",name:"Niger"},{code:"NG",name:"Nigeria"},{code:"NU",name:"Niue"},{code:"NF",name:"Norfolk Island"},{code:"MK",name:"North Macedonia"},{code:"MP",name:"Northern Mariana Islands"},{code:"NO",name:"Norway"},{code:"OM",name:"Oman"},{code:"PK",name:"Pakistan"},{code:"PW",name:"Palau"},{code:"PS",name:"Palestine, State of"},{code:"PA",name:"Panama"},{code:"PG",name:"Papua New Guinea"},{code:"PY",name:"Paraguay"},{code:"PE",name:"Peru"},{code:"PH",name:"Philippines"},{code:"PN",name:"Pitcairn"},{code:"PL",name:"Poland"},{code:"PT",name:"Portugal"},{code:"PR",name:"Puerto Rico"},{code:"QA",name:"Qatar"},{code:"RE",name:"R\xE9union"},{code:"RO",name:"Romania"},{code:"RU",name:"Russian Federation"},{code:"RW",name:"Rwanda"},{code:"BL",name:"Saint Barth\xE9lemy"},{code:"SH",name:"Saint Helena, Ascension and Tristan da Cunha"},{code:"KN",name:"Saint Kitts and Nevis"},{code:"LC",name:"Saint Lucia"},{code:"MF",name:"Saint Martin (French part)"},{code:"PM",name:"Saint Pierre and Miquelon"},{code:"VC",name:"Saint Vincent and the Grenadines"},{code:"WS",name:"Samoa"},{code:"SM",name:"San Marino"},{code:"ST",name:"Sao Tome and Principe"},{code:"SA",name:"Saudi Arabia"},{code:"SN",name:"Senegal"},{code:"RS",name:"Serbia"},{code:"SC",name:"Seychelles"},{code:"SL",name:"Sierra Leone"},{code:"SG",name:"Singapore"},{code:"SX",name:"Sint Maarten (Dutch part)"},{code:"SK",name:"Slovakia"},{code:"SI",name:"Slovenia"},{code:"SB",name:"Solomon Islands"},{code:"SO",name:"Somalia"},{code:"ZA",name:"South Africa"},{code:"GS",name:"South Georgia and the South Sandwich Islands"},{code:"SS",name:"South Sudan"},{code:"ES",name:"Spain"},{code:"LK",name:"Sri Lanka"},{code:"SD",name:"Sudan"},{code:"SR",name:"Suriname"},{code:"SJ",name:"Svalbard and Jan Mayen"},{code:"SE",name:"Sweden"},{code:"CH",name:"Switzerland"},{code:"SY",name:"Syrian Arab Republic"},{code:"TW",name:"Taiwan"},{code:"TJ",name:"Tajikistan"},{code:"TZ",name:"Tanzania"},{code:"TH",name:"Thailand"},{code:"TL",name:"Timor-Leste"},{code:"TG",name:"Togo"},{code:"TK",name:"Tokelau"},{code:"TO",name:"Tonga"},{code:"TT",name:"Trinidad and Tobago"},{code:"TN",name:"Tunisia"},{code:"TR",name:"Turkey"},{code:"TM",name:"Turkmenistan"},{code:"TC",name:"Turks and Caicos Islands"},{code:"TV",name:"Tuvalu"},{code:"UG",name:"Uganda"},{code:"UA",name:"Ukraine"},{code:"AE",name:"United Arab Emirates"},{code:"GB",name:"United Kingdom"},{code:"US",name:"United States"},{code:"UM",name:"United States Minor Outlying Islands"},{code:"UY",name:"Uruguay"},{code:"UZ",name:"Uzbekistan"},{code:"VU",name:"Vanuatu"},{code:"VE",name:"Venezuela"},{code:"VN",name:"Viet Nam"},{code:"VG",name:"Virgin Islands (British)"},{code:"VI",name:"Virgin Islands (U.S.)"},{code:"WF",name:"Wallis and Futuna"},{code:"EH",name:"Western Sahara"},{code:"YE",name:"Yemen"},{code:"ZM",name:"Zambia"},{code:"ZW",name:"Zimbabwe"}];var m=`
  <div class="payment-form-container">
    <div class="form-header">
      <h1>Domain Payment</h1>
      <button type="button" class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">
        <span id="theme-icon">\u{1F319}</span>
      </button>
    </div>

    <div class="progress-bar">
      <div class="progress-step active" data-step="1">
        <div class="progress-circle">1</div>
        <span class="progress-label">Your Info</span>
      </div>
      <div class="progress-step" data-step="2">
        <div class="progress-circle">2</div>
        <span class="progress-label">Payment</span>
      </div>
      <div class="progress-step" data-step="3">
        <div class="progress-circle">3</div>
        <span class="progress-label">Confirm</span>
      </div>
    </div>

    <form id="payment-form" class="form-body" novalidate>
      <!-- Step 1: User Information -->
      <div class="form-step active" data-step="1">
        <div class="form-group">
          <label for="full-name">
            Full Name<span class="required">*</span>
          </label>
          <input
            type="text"
            id="full-name"
            name="fullName"
            autocomplete="name"
            placeholder="John Doe"
            required
            aria-required="true"
            aria-describedby="full-name-error"
          />
          <span class="error-message" id="full-name-error">Please enter your full name</span>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="email">
              Email<span class="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autocomplete="email"
              placeholder="john@example.com"
              required
              aria-required="true"
              aria-describedby="email-error"
            />
            <span class="error-message" id="email-error">Please enter a valid email</span>
          </div>

          <div class="form-group">
            <label for="phone">
              Phone Number<span class="required">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              autocomplete="tel"
              placeholder="+1 (555) 123-4567"
              required
              aria-required="true"
              aria-describedby="phone-error"
            />
            <span class="error-message" id="phone-error">Please enter a valid phone number</span>
            <span class="hint">International format (e.g., +1 555 123 4567)</span>
          </div>
        </div>

        <div class="form-group">
          <label for="address-line1">
            Street Address<span class="required">*</span>
          </label>
          <input
            type="text"
            id="address-line1"
            name="addressLine1"
            autocomplete="address-line1"
            placeholder="123 Main Street"
            required
            aria-required="true"
            aria-describedby="address-line1-error"
          />
          <span class="error-message" id="address-line1-error">Please enter your street address</span>
        </div>

        <div class="form-row form-row-3">
          <div class="form-group">
            <label for="state">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              autocomplete="address-level1"
              placeholder="NY"
            />
          </div>

          <div class="form-group">
            <label for="country">
              Country<span class="required">*</span>
            </label>
            <select
              id="country"
              name="country"
              autocomplete="country"
              required
              aria-required="true"
              aria-describedby="country-error"
            >
            </select>
            <span class="error-message" id="country-error">Please select your country</span>
          </div>

          <div class="form-group">
            <label for="zip">
              Zip<span class="required">*</span>
            </label>
            <input
              type="text"
              id="zip"
              name="zip"
              autocomplete="postal-code"
              placeholder="10001"
              required
              aria-required="true"
              aria-describedby="zip-error"
            />
            <span class="error-message" id="zip-error">Please enter your ZIP/postal code</span>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-primary" id="next-step-1">
            Continue to Payment
          </button>
        </div>
      </div>

      <!-- Step 2: Payment Information -->
      <div class="form-step" data-step="2">
        <div class="form-group">
          <label for="card-number">
            Card Number<span class="required">*</span>
          </label>
          <input
            type="text"
            id="card-number"
            name="cardNumber"
            autocomplete="cc-number"
            placeholder="1234 5678 9012 3456"
            maxlength="19"
            required
            aria-required="true"
            aria-describedby="card-number-error"
            inputmode="numeric"
          />
          <span class="error-message" id="card-number-error">Please enter a valid card number</span>
        </div>

        <div class="card-input-group">
          <div class="form-group">
            <label for="expiry-date">
              Expiry Date<span class="required">*</span>
            </label>
            <input
              type="text"
              id="expiry-date"
              name="expiryDate"
              autocomplete="cc-exp"
              placeholder="MM/YY"
              maxlength="5"
              required
              aria-required="true"
              aria-describedby="expiry-date-error"
              inputmode="numeric"
            />
            <span class="error-message" id="expiry-date-error">Please enter expiry date</span>
          </div>

          <div class="form-group">
            <label for="cvc">
              CVC<span class="required">*</span>
            </label>
            <input
              type="text"
              id="cvc"
              name="cvc"
              autocomplete="cc-csc"
              placeholder="123"
              maxlength="4"
              required
              aria-required="true"
              aria-describedby="cvc-error"
              inputmode="numeric"
            />
            <span class="error-message" id="cvc-error">Please enter CVC</span>
          </div>
        </div>

        <div class="checkbox-group">
          <input
            type="checkbox"
            id="separate-billing"
            name="separateBilling"
          />
          <label for="separate-billing">Use a different billing address</label>
        </div>

        <div id="billing-address-fields">
          <div class="form-group">
            <label for="billing-address-line1">
              Billing Street Address<span class="required">*</span>
            </label>
            <input
              type="text"
              id="billing-address-line1"
              name="billingAddressLine1"
              autocomplete="billing address-line1"
              placeholder="123 Billing Street"
            />
            <span class="error-message" id="billing-address-line1-error">Please enter billing address</span>
          </div>

          <div class="form-row form-row-3">
            <div class="form-group">
              <label for="billing-state">
                State
              </label>
              <input
                type="text"
                id="billing-state"
                name="billingState"
                autocomplete="billing address-level1"
                placeholder="NY"
              />
            </div>

            <div class="form-group">
              <label for="billing-country">
                Country<span class="required">*</span>
              </label>
              <select
                id="billing-country"
                name="billingCountry"
                autocomplete="billing country"
              >
              </select>
              <span class="error-message" id="billing-country-error">Please select billing country</span>
            </div>

            <div class="form-group">
              <label for="billing-zip">
                Zip<span class="required">*</span>
              </label>
              <input
                type="text"
                id="billing-zip"
                name="billingZip"
                autocomplete="billing postal-code"
                placeholder="10001"
              />
              <span class="error-message" id="billing-zip-error">Please enter billing ZIP code</span>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-secondary" id="prev-step-2">
            Back
          </button>
          <button type="button" class="btn-primary" id="next-step-2">
            Review Order
          </button>
        </div>
      </div>

      <!-- Step 3: Confirmation -->
      <div class="form-step" data-step="3">
        <div class="confirmation-content">
          <h2>Review Your Information</h2>
          <p>Please review your details before submitting</p>

          <div class="summary-section">
            <h3>Contact Information</h3>
            <div class="summary-item">
              <span class="summary-label">Name:</span>
              <span class="summary-value" id="summary-name"></span>
            </div>
            <div class="summary-item">
              <span class="summary-label">Email:</span>
              <span class="summary-value" id="summary-email"></span>
            </div>
            <div class="summary-item">
              <span class="summary-label">Phone:</span>
              <span class="summary-value" id="summary-phone"></span>
            </div>
          </div>

          <div class="summary-section">
            <h3>Shipping Address</h3>
            <div class="summary-item">
              <span class="summary-label">Address:</span>
              <span class="summary-value" id="summary-address"></span>
            </div>
          </div>

          <div class="summary-section">
            <h3>Payment Information</h3>
            <div class="summary-item">
              <span class="summary-label">Card:</span>
              <span class="summary-value" id="summary-card"></span>
            </div>
            <div class="summary-item" id="summary-billing-section" style="display: none;">
              <span class="summary-label">Billing Address:</span>
              <span class="summary-value" id="summary-billing"></span>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-secondary" id="prev-step-3">
            Back
          </button>
          <button type="submit" class="btn-primary" id="submit-form">
            <span id="submit-text">Complete Payment</span>
            <span class="loading-spinner"></span>
          </button>
        </div>
      </div>
    </form>
  </div>
`;document.querySelector("#app").innerHTML=m;var f=document.getElementById("country"),v=document.getElementById("billing-country"),u='<option value="">Select Country</option>'+c.map(d=>`<option value="${d.code}">${d.name}</option>`).join("");f.innerHTML=u;v.innerHTML=u;new s;
