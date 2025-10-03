import './style.css'
import { PaymentForm } from './payment-form.js'
import { countries } from './countries.js'
import formTemplate from './payment-form.html?raw'

document.querySelector('#app').innerHTML = formTemplate

const countrySelect = document.getElementById('country')
const billingCountrySelect = document.getElementById('billing-country')

const countryOptions = '<option value="">Select Country</option>' +
  countries.map(c => `<option value="${c.code}">${c.name}</option>`).join('')

countrySelect.innerHTML = countryOptions
billingCountrySelect.innerHTML = countryOptions

new PaymentForm()
