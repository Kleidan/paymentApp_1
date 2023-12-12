const myForm = document.getElementById('my-form');
const ccdHolder = document.getElementById('ccd-name');
const ccdNum = document.getElementById('ccd-number');
const ccdExp = document.getElementById('ccd-exp');
const ccdCvc = document.getElementById('ccd-cvc');
const discount = document.getElementById('discount-code');
const applyDiscount = document.getElementById('discount-btn');
const payBtn = document.getElementById('pay-btn');


// Check to see if a full name containing only letters was enterd
ccdHolder.addEventListener('keyup', nameConfirmation);

function nameConfirmation() {
  const ccdNameRegex = /([a-zA-z]{1,}) ([a-zA-z]{1,})/;

  this.classList.remove('success', 'failure');

  if (!ccdNameRegex.test(this.value)) {
    this.classList.add('failure');
    return false;
  } else {
    this.classList.add('success');
    return true;
  }
}

// Credit card check
ccdNum.addEventListener('input', ccdNumCheck);

function ccdNumCheck() {
  // credit cards regex:
  let amexRegex = /^(?:3[47][0-9]{13})$/g;
  let visaRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/g;
  let masterCardRegex = /^(?:5[1-5][0-9]{14})$/g;
  let discoverRegex = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/g;

  // remove spaces
  let noSpacedValue = this.value.replaceAll(" ", '');

  // create groups of 4 digits
  let valuArray = noSpacedValue.match(/\d{1,4}/g);
  this.value = valuArray.join(' ');

  // remove any existing classes
  this.classList.remove('success', 'failure');

  if (noSpacedValue.match(amexRegex)) {
    this.style.backgroundImage = 'url(../assets/amex.svg)';
    this.classList.add('success');
    return true;
  } else if (noSpacedValue.match(visaRegex)) {
    this.style.backgroundImage = 'url(../assets/visa.svg)';
    this.classList.add('success');
    return true;
  } else if (noSpacedValue.match(masterCardRegex)) {
    this.style.backgroundImage = 'url(../assets/mastercard.svg)';
    this.classList.add('success');
    return true;
  } else if (noSpacedValue.match(discoverRegex)) {
    this.style.backgroundImage = 'url(../assets/discover.svg)';
    this.classList.add('success');
    return true;
  } else {
    this.style.backgroundImage = 'url(../assets/generic.svg)';
    return true;
  }
}

// Expiration Date validation
ccdExp.addEventListener('input', validateExpirationDateHandler);

function validateExpirationDateHandler(e) {
  const dateRegEx = new RegExp('^(0[1-9]|1[0-2])\/?([0-9]{2})$');

  if (dateRegEx.test(e.target.value)) {
    ccdExp.classList.remove('success', 'failure');
    let data = e.target.value.split('/');
    let expirationMonth = data[0];
    let expirationYear = '20' + data[1];

    // expiration date validation
    if (!validateExpirationDate(expirationMonth, expirationYear)) {
      ccdExp.classList.add('failure');
      return false;
    } else {
      ccdExp.classList.add('success');
      return true;
    }
  } else {
    ccdExp.classList.add('failure');
    return false;
  }
}

function validateExpirationDate(expirationMonth, expirationYear) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  if (expirationYear > currentYear) {
    return true;
  } else if (expirationYear === currentYear && expirationMonth >= currentMonth) {
    return true;
  }

  return false;
}

// CVC validation
ccdCvc.addEventListener('input', cvcEventHandler);

function cvcEventHandler(event) {
  cvc = event.target.value;
  ccdCvc.classList.remove('success', 'failure');
  if (validateCVC(cvc)) {
    ccdCvc.classList.add('success');
    return true;
  } else {
    ccdCvc.classList.add('failure');
    return false;
  }
}

function validateCVC(cvc) {
  const cvvPattern = /^[0-9]{3,4}/;
  return cvvPattern.test(cvc);
}

// PAY button validation
myForm.addEventListener('keyup', (e) => {
  if (ccdHolder.classList.contains('success') && ccdNum.classList.contains('success') && ccdExp.classList.contains('success') && ccdCvc.classList.contains('success')) {
    payBtn.disabled = false
  }
});

payBtn.addEventListener('click', (e) => {
  e.preventDefault();
  return alert('this is a demo page, thank you very much for visiting');
});