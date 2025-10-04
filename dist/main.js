var m=`:host {
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
}

.theme-toggle {
  background: none;
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  padding: 0.5rem;
  cursor: pointer;
  color: var(--text-primary);
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  width: 2.5rem;
  height: 2.5rem;
}

.theme-toggle:hover {
  background-color: var(--bg-secondary);
}

.theme-toggle:focus {
  outline: 2px solid var(--input-focus);
  outline-offset: 2px;
}

.progress-bar {
  display: flex;
  padding: 1rem 1.5rem;
  gap: 0.5rem;
  background-color: var(--bg-secondary);
}

.progress-step {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.progress-circle {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: var(--input-bg);
  border: 2px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--text-secondary);
  transition: all 0.3s;
}

.progress-step.active .progress-circle {
  background-color: var(--button-primary);
  border-color: var(--button-primary);
  color: white;
}

.progress-step.completed .progress-circle {
  background-color: var(--success-color);
  border-color: var(--success-color);
  color: white;
}

.progress-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-align: center;
}

.progress-step.active .progress-label {
  color: var(--text-primary);
  font-weight: 500;
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

@media (max-width: 640px) {
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
`;var d=class{constructor(e=document){this.root=e,this.currentStep=1,this.formData={},this.initTheme(),this.initEventListeners()}getElement(e){return this.root?.querySelector(e)}initTheme(){let e=localStorage.getItem("theme")||"light";(this.root?.host||document.documentElement).setAttribute("data-theme",e),this.updateThemeIcon(e)}updateThemeIcon(e){let a=this.getElement("#theme-icon");a.textContent=e==="dark"?"\u2600\uFE0F":"\u{1F319}"}initEventListeners(){this.getElement("#theme-toggle").addEventListener("click",()=>this.toggleTheme()),this.getElement("#next-step-1").addEventListener("click",()=>this.validateAndNextStep(1)),this.getElement("#next-step-2").addEventListener("click",()=>this.validateAndNextStep(2)),this.getElement("#prev-step-2").addEventListener("click",()=>this.goToStep(1)),this.getElement("#prev-step-3").addEventListener("click",()=>this.goToStep(2)),this.getElement("#payment-form").addEventListener("submit",e=>this.handleSubmit(e)),this.getElement("#separate-billing").addEventListener("change",e=>{let a=this.getElement("#billing-address-fields");e.target.checked?(a.classList.add("show"),this.setBillingFieldsRequired(!0)):(a.classList.remove("show"),this.setBillingFieldsRequired(!1),this.clearBillingErrors())}),this.setupCardFormatting()}toggleTheme(){let e=this.root?.host||document.documentElement,o=e.getAttribute("data-theme")==="light"?"dark":"light";e.setAttribute("data-theme",o),localStorage.setItem("theme",o),this.updateThemeIcon(o)}setupCardFormatting(){let e=this.getElement("#card-number"),a=this.getElement("#expiry-date"),o=this.getElement("#cvc");e.addEventListener("input",t=>{let r=t.target.value.replace(/\s/g,"");r=r.replace(/\D/g,""),r=r.substring(0,16);let i=r.match(/.{1,4}/g)?.join(" ")||r;t.target.value=i}),a.addEventListener("input",t=>{let r=t.target.value.replace(/\D/g,"");r.length>=2&&(r=r.substring(0,2)+"/"+r.substring(2,4)),t.target.value=r}),o.addEventListener("input",t=>{t.target.value=t.target.value.replace(/\D/g,"").substring(0,4)}),this.getElement("#phone").addEventListener("input",t=>{let r=t.target.value.replace(/[^\d+\s()-]/g,"");t.target.value=r})}setBillingFieldsRequired(e){["billing-address-line1","billing-state","billing-zip","billing-country"].forEach(o=>{let n=this.getElement(`#${o}`);e?(n.setAttribute("required","required"),n.setAttribute("aria-required","true")):(n.removeAttribute("required"),n.removeAttribute("aria-required"))})}clearBillingErrors(){["billing-address-line1","billing-state","billing-zip","billing-country"].forEach(a=>{let o=this.getElement(`#${a}`),n=this.getElement(`#${a}-error`);o.classList.remove("error"),n&&n.classList.remove("show")})}validateStep(e){let a=!0;if(this.getFieldsForStep(e).forEach(n=>{let t=this.getElement(`#${n}`),r=this.getElement(`#${n}-error`);if(t.classList.remove("error"),r&&r.classList.remove("show"),t.hasAttribute("required")&&!t.value.trim())a=!1,t.classList.add("error"),r&&r.classList.add("show");else if(t.type==="email"&&t.value.trim())/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t.value.trim())||(a=!1,t.classList.add("error"),r&&(r.textContent="Please enter a valid email address",r.classList.add("show")));else if(n==="card-number"&&t.value.trim()){let i=t.value.replace(/\s/g,"");(i.length<13||i.length>19)&&(a=!1,t.classList.add("error"),r&&r.classList.add("show"))}else if(n==="expiry-date"&&t.value.trim())if(!/^(0[1-9]|1[0-2])\/\d{2}$/.test(t.value))a=!1,t.classList.add("error"),r&&(r.textContent="Please enter valid expiry (MM/YY)",r.classList.add("show"));else{let[b,h]=t.value.split("/"),f=new Date(2e3+parseInt(h),parseInt(b)-1),c=new Date;c.setDate(1),f<c&&(a=!1,t.classList.add("error"),r&&(r.textContent="Card has expired",r.classList.add("show")))}else n==="cvc"&&t.value.trim()&&(t.value.length<3||t.value.length>4)&&(a=!1,t.classList.add("error"),r&&r.classList.add("show"))}),!a){let n=this.root.querySelector(".error");n&&n.focus()}return a}getFieldsForStep(e){if(e===1)return["full-name","email","phone","address-line1","state","zip","country"];if(e===2){let a=["card-number","expiry-date","cvc"];return this.getElement("#separate-billing").checked&&a.push("billing-address-line1","billing-state","billing-zip","billing-country"),a}return[]}collectFormData(){this.formData={userInfo:{fullName:this.getElement("#full-name").value.trim(),email:this.getElement("#email").value.trim(),phone:this.getElement("#phone").value.trim(),address:{line1:this.getElement("#address-line1").value.trim(),state:this.getElement("#state").value.trim(),zip:this.getElement("#zip").value.trim(),country:this.getElement("#country").value}},paymentInfo:{cardNumber:this.getElement("#card-number").value.replace(/\s/g,""),expiryDate:this.getElement("#expiry-date").value,cvc:this.getElement("#cvc").value}};let e=this.getElement("#separate-billing").checked;e?this.formData.paymentInfo.billingAddress={line1:this.getElement("#billing-address-line1").value.trim(),state:this.getElement("#billing-state").value.trim(),zip:this.getElement("#billing-zip").value.trim(),country:this.getElement("#billing-country").value}:this.formData.paymentInfo.billingAddress=this.formData.userInfo.address,this.formData.paymentInfo.separateBillingAddress=e}updateSummary(){this.collectFormData(),this.getElement("#summary-name").textContent=this.formData.userInfo.fullName,this.getElement("#summary-email").textContent=this.formData.userInfo.email,this.getElement("#summary-phone").textContent=this.formData.userInfo.phone;let e=this.formData.userInfo.address,a=[e.state,e.country,e.zip].filter(Boolean).join(", "),o=[e.line1,a].filter(Boolean).join(", ");this.getElement("#summary-address").textContent=o;let n=this.formData.paymentInfo.cardNumber.slice(-4);if(this.getElement("#summary-card").textContent=`\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 ${n}`,this.formData.paymentInfo.separateBillingAddress){let t=this.formData.paymentInfo.billingAddress,r=[t.state,t.country,t.zip].filter(Boolean).join(", "),i=[t.line1,r].filter(Boolean).join(", ");this.getElement("#summary-billing").textContent=i,this.getElement("#summary-billing-section").style.display="flex"}else this.getElement("#summary-billing-section").style.display="none"}validateAndNextStep(e){this.validateStep(e)&&(e===2&&this.updateSummary(),this.goToStep(e+1))}goToStep(e){this.root.querySelectorAll(".form-step").forEach(a=>{a.classList.remove("active")}),this.root.querySelector(`.form-step[data-step="${e}"]`).classList.add("active"),this.root.querySelectorAll(".progress-step").forEach(a=>{let o=parseInt(a.getAttribute("data-step"));a.classList.remove("active","completed"),o===e?a.classList.add("active"):o<e&&a.classList.add("completed")}),this.currentStep=e,window.scrollTo({top:0,behavior:"smooth"})}async handleSubmit(e){e.preventDefault();let a=this.getElement("#submit-form"),o=this.getElement("#submit-text");a.disabled=!0,a.classList.add("loading"),o.textContent="Processing...",await new Promise(n=>setTimeout(n,1500)),this.collectFormData(),console.log("Payment Form Data:",JSON.stringify(this.formData,null,2)),a.disabled=!1,a.classList.remove("loading"),o.textContent="Complete Payment",this.showSuccessMessage()}showSuccessMessage(){let e=this.root.querySelector(".form-body");e.innerHTML=`
      <div class="confirmation-content">
        <div class="confirmation-icon">\u2713</div>
        <h2>Payment Submitted!</h2>
        <p>Your payment information has been collected. Check the console for the submitted data.</p>
        <button type="button" class="btn-primary" onclick="location.reload()">
          Start Over
        </button>
      </div>
    `}};var u=[{code:"AF",name:"Afghanistan"},{code:"AX",name:"\xC5land Islands"},{code:"AL",name:"Albania"},{code:"DZ",name:"Algeria"},{code:"AS",name:"American Samoa"},{code:"AD",name:"Andorra"},{code:"AO",name:"Angola"},{code:"AI",name:"Anguilla"},{code:"AQ",name:"Antarctica"},{code:"AG",name:"Antigua and Barbuda"},{code:"AR",name:"Argentina"},{code:"AM",name:"Armenia"},{code:"AW",name:"Aruba"},{code:"AU",name:"Australia"},{code:"AT",name:"Austria"},{code:"AZ",name:"Azerbaijan"},{code:"BS",name:"Bahamas"},{code:"BH",name:"Bahrain"},{code:"BD",name:"Bangladesh"},{code:"BB",name:"Barbados"},{code:"BY",name:"Belarus"},{code:"BE",name:"Belgium"},{code:"BZ",name:"Belize"},{code:"BJ",name:"Benin"},{code:"BM",name:"Bermuda"},{code:"BT",name:"Bhutan"},{code:"BO",name:"Bolivia"},{code:"BQ",name:"Bonaire, Sint Eustatius and Saba"},{code:"BA",name:"Bosnia and Herzegovina"},{code:"BW",name:"Botswana"},{code:"BV",name:"Bouvet Island"},{code:"BR",name:"Brazil"},{code:"IO",name:"British Indian Ocean Territory"},{code:"BN",name:"Brunei Darussalam"},{code:"BG",name:"Bulgaria"},{code:"BF",name:"Burkina Faso"},{code:"BI",name:"Burundi"},{code:"CV",name:"Cabo Verde"},{code:"KH",name:"Cambodia"},{code:"CM",name:"Cameroon"},{code:"CA",name:"Canada"},{code:"KY",name:"Cayman Islands"},{code:"CF",name:"Central African Republic"},{code:"TD",name:"Chad"},{code:"CL",name:"Chile"},{code:"CN",name:"China"},{code:"CX",name:"Christmas Island"},{code:"CC",name:"Cocos (Keeling) Islands"},{code:"CO",name:"Colombia"},{code:"KM",name:"Comoros"},{code:"CG",name:"Congo"},{code:"CD",name:"Congo, Democratic Republic of the"},{code:"CK",name:"Cook Islands"},{code:"CR",name:"Costa Rica"},{code:"CI",name:"C\xF4te d'Ivoire"},{code:"HR",name:"Croatia"},{code:"CU",name:"Cuba"},{code:"CW",name:"Cura\xE7ao"},{code:"CY",name:"Cyprus"},{code:"CZ",name:"Czechia"},{code:"DK",name:"Denmark"},{code:"DJ",name:"Djibouti"},{code:"DM",name:"Dominica"},{code:"DO",name:"Dominican Republic"},{code:"EC",name:"Ecuador"},{code:"EG",name:"Egypt"},{code:"SV",name:"El Salvador"},{code:"GQ",name:"Equatorial Guinea"},{code:"ER",name:"Eritrea"},{code:"EE",name:"Estonia"},{code:"SZ",name:"Eswatini"},{code:"ET",name:"Ethiopia"},{code:"FK",name:"Falkland Islands (Malvinas)"},{code:"FO",name:"Faroe Islands"},{code:"FJ",name:"Fiji"},{code:"FI",name:"Finland"},{code:"FR",name:"France"},{code:"GF",name:"French Guiana"},{code:"PF",name:"French Polynesia"},{code:"TF",name:"French Southern Territories"},{code:"GA",name:"Gabon"},{code:"GM",name:"Gambia"},{code:"GE",name:"Georgia"},{code:"DE",name:"Germany"},{code:"GH",name:"Ghana"},{code:"GI",name:"Gibraltar"},{code:"GR",name:"Greece"},{code:"GL",name:"Greenland"},{code:"GD",name:"Grenada"},{code:"GP",name:"Guadeloupe"},{code:"GU",name:"Guam"},{code:"GT",name:"Guatemala"},{code:"GG",name:"Guernsey"},{code:"GN",name:"Guinea"},{code:"GW",name:"Guinea-Bissau"},{code:"GY",name:"Guyana"},{code:"HT",name:"Haiti"},{code:"HM",name:"Heard Island and McDonald Islands"},{code:"VA",name:"Holy See"},{code:"HN",name:"Honduras"},{code:"HK",name:"Hong Kong"},{code:"HU",name:"Hungary"},{code:"IS",name:"Iceland"},{code:"IN",name:"India"},{code:"ID",name:"Indonesia"},{code:"IR",name:"Iran"},{code:"IQ",name:"Iraq"},{code:"IE",name:"Ireland"},{code:"IM",name:"Isle of Man"},{code:"IL",name:"Israel"},{code:"IT",name:"Italy"},{code:"JM",name:"Jamaica"},{code:"JP",name:"Japan"},{code:"JE",name:"Jersey"},{code:"JO",name:"Jordan"},{code:"KZ",name:"Kazakhstan"},{code:"KE",name:"Kenya"},{code:"KI",name:"Kiribati"},{code:"KP",name:"Korea, Democratic People's Republic of"},{code:"KR",name:"Korea, Republic of"},{code:"XK",name:"Kosovo"},{code:"KW",name:"Kuwait"},{code:"KG",name:"Kyrgyzstan"},{code:"LA",name:"Lao People's Democratic Republic"},{code:"LV",name:"Latvia"},{code:"LB",name:"Lebanon"},{code:"LS",name:"Lesotho"},{code:"LR",name:"Liberia"},{code:"LY",name:"Libya"},{code:"LI",name:"Liechtenstein"},{code:"LT",name:"Lithuania"},{code:"LU",name:"Luxembourg"},{code:"MO",name:"Macao"},{code:"MG",name:"Madagascar"},{code:"MW",name:"Malawi"},{code:"MY",name:"Malaysia"},{code:"MV",name:"Maldives"},{code:"ML",name:"Mali"},{code:"MT",name:"Malta"},{code:"MH",name:"Marshall Islands"},{code:"MQ",name:"Martinique"},{code:"MR",name:"Mauritania"},{code:"MU",name:"Mauritius"},{code:"YT",name:"Mayotte"},{code:"MX",name:"Mexico"},{code:"FM",name:"Micronesia"},{code:"MD",name:"Moldova"},{code:"MC",name:"Monaco"},{code:"MN",name:"Mongolia"},{code:"ME",name:"Montenegro"},{code:"MS",name:"Montserrat"},{code:"MA",name:"Morocco"},{code:"MZ",name:"Mozambique"},{code:"MM",name:"Myanmar"},{code:"NA",name:"Namibia"},{code:"NR",name:"Nauru"},{code:"NP",name:"Nepal"},{code:"NL",name:"Netherlands"},{code:"NC",name:"New Caledonia"},{code:"NZ",name:"New Zealand"},{code:"NI",name:"Nicaragua"},{code:"NE",name:"Niger"},{code:"NG",name:"Nigeria"},{code:"NU",name:"Niue"},{code:"NF",name:"Norfolk Island"},{code:"MK",name:"North Macedonia"},{code:"MP",name:"Northern Mariana Islands"},{code:"NO",name:"Norway"},{code:"OM",name:"Oman"},{code:"PK",name:"Pakistan"},{code:"PW",name:"Palau"},{code:"PS",name:"Palestine, State of"},{code:"PA",name:"Panama"},{code:"PG",name:"Papua New Guinea"},{code:"PY",name:"Paraguay"},{code:"PE",name:"Peru"},{code:"PH",name:"Philippines"},{code:"PN",name:"Pitcairn"},{code:"PL",name:"Poland"},{code:"PT",name:"Portugal"},{code:"PR",name:"Puerto Rico"},{code:"QA",name:"Qatar"},{code:"RE",name:"R\xE9union"},{code:"RO",name:"Romania"},{code:"RU",name:"Russian Federation"},{code:"RW",name:"Rwanda"},{code:"BL",name:"Saint Barth\xE9lemy"},{code:"SH",name:"Saint Helena, Ascension and Tristan da Cunha"},{code:"KN",name:"Saint Kitts and Nevis"},{code:"LC",name:"Saint Lucia"},{code:"MF",name:"Saint Martin (French part)"},{code:"PM",name:"Saint Pierre and Miquelon"},{code:"VC",name:"Saint Vincent and the Grenadines"},{code:"WS",name:"Samoa"},{code:"SM",name:"San Marino"},{code:"ST",name:"Sao Tome and Principe"},{code:"SA",name:"Saudi Arabia"},{code:"SN",name:"Senegal"},{code:"RS",name:"Serbia"},{code:"SC",name:"Seychelles"},{code:"SL",name:"Sierra Leone"},{code:"SG",name:"Singapore"},{code:"SX",name:"Sint Maarten (Dutch part)"},{code:"SK",name:"Slovakia"},{code:"SI",name:"Slovenia"},{code:"SB",name:"Solomon Islands"},{code:"SO",name:"Somalia"},{code:"ZA",name:"South Africa"},{code:"GS",name:"South Georgia and the South Sandwich Islands"},{code:"SS",name:"South Sudan"},{code:"ES",name:"Spain"},{code:"LK",name:"Sri Lanka"},{code:"SD",name:"Sudan"},{code:"SR",name:"Suriname"},{code:"SJ",name:"Svalbard and Jan Mayen"},{code:"SE",name:"Sweden"},{code:"CH",name:"Switzerland"},{code:"SY",name:"Syrian Arab Republic"},{code:"TW",name:"Taiwan"},{code:"TJ",name:"Tajikistan"},{code:"TZ",name:"Tanzania"},{code:"TH",name:"Thailand"},{code:"TL",name:"Timor-Leste"},{code:"TG",name:"Togo"},{code:"TK",name:"Tokelau"},{code:"TO",name:"Tonga"},{code:"TT",name:"Trinidad and Tobago"},{code:"TN",name:"Tunisia"},{code:"TR",name:"Turkey"},{code:"TM",name:"Turkmenistan"},{code:"TC",name:"Turks and Caicos Islands"},{code:"TV",name:"Tuvalu"},{code:"UG",name:"Uganda"},{code:"UA",name:"Ukraine"},{code:"AE",name:"United Arab Emirates"},{code:"GB",name:"United Kingdom"},{code:"US",name:"United States"},{code:"UM",name:"United States Minor Outlying Islands"},{code:"UY",name:"Uruguay"},{code:"UZ",name:"Uzbekistan"},{code:"VU",name:"Vanuatu"},{code:"VE",name:"Venezuela"},{code:"VN",name:"Viet Nam"},{code:"VG",name:"Virgin Islands (British)"},{code:"VI",name:"Virgin Islands (U.S.)"},{code:"WF",name:"Wallis and Futuna"},{code:"EH",name:"Western Sahara"},{code:"YE",name:"Yemen"},{code:"ZM",name:"Zambia"},{code:"ZW",name:"Zimbabwe"}];var p=`
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
`;var g=document.createElement("template");g.innerHTML=p;var l=class extends HTMLElement{constructor(){super(),this.paymentForm=null,this.isInitialized=!1,this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.isInitialized||(this.render(),this.isInitialized=!0)}render(){this.shadow.innerHTML="";let e=document.createElement("style");e.textContent=m;let a=g.content.cloneNode(!0);this.shadow.appendChild(e),this.shadow.appendChild(a),this.populateCountries(),this.paymentForm=new d(this.shadow)}populateCountries(){let e=this.shadow.querySelector("#country"),a=this.shadow.querySelector("#billing-country");if(!e||!a)return;let o='<option value="">Select Country</option>'+u.map(n=>`<option value="${n.code}">${n.name}</option>`).join("");e.innerHTML=o,a.innerHTML=o}};customElements.get("payment-form")||customElements.define("payment-form",l);function I({selector:s="#app"}={}){if(!s)return null;let e=document.querySelector(s);if(!e)return null;let a=e.querySelector("payment-form");return a||(a=document.createElement("payment-form"),e.appendChild(a)),a}export{l as PaymentFormElement,I as registerPaymentForm};
