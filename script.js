'use strict';
// DOM Elements
const form = document.querySelectorAll('.form');
const tipBtns = document.querySelectorAll('.tip');
const amountInput = document.querySelector('.input-amount');
const peopleInput = document.querySelector('.people-input');
const customInput = document.querySelector('.custom-input');
const tipAmountDisplay = document.querySelector('.tip-amount');
const totalAmountDisplay = document.querySelector('.total-amount');
const resetBtn = document.querySelector('.reset');

// Global VAriables
let bill, custom, tip, people;
let tipAmount, totalPerPerson;

// Get data from local if any
getLocalStorage();

//////////////////////////////////////
// Functions
function setLocalStorage() {
  localStorage.setItem('tipAmount', JSON.stringify(tipAmount));
  localStorage.setItem('totalPerPerson', JSON.stringify(totalPerPerson));
}

function getLocalStorage() {
  const tipData = JSON.parse(localStorage.getItem('tipAmount'));
  const totalData = JSON.parse(localStorage.getItem('totalPerPerson'));

  // set data
  tipAmount = tipData;
  totalPerPerson = totalData;

  if (!tipData) return;

  setTipAndTotal();
}

function setTipAndTotal() {
  tipAmountDisplay.textContent = `$${tipAmount}`;
  totalAmountDisplay.textContent = `$${totalPerPerson}`;
}

function reset() {
  localStorage.removeItem('tipAmount');
  localStorage.removeItem('totalPerPerson');
  location.reload();
}

///////////////////////////////////////
// Event Listeners
form.forEach(form => {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    bill = +amountInput.value;
    custom = +customInput.value;
    people = +peopleInput.value;

    if (custom) {
      calculateTip(bill, custom, people);
    } else {
      calculateTip(bill, tip, people);
    }
  });
});

tipBtns.forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    tip = Number.parseInt(btn.textContent);
  });
});

function calculateTip(bill, tip, people) {
  if (tip) {
    tipAmount = Number(((bill * (tip / 100)) / people).toFixed(2));
  }

  if (custom) {
    tipAmount = Number(((bill * (custom / 100)) / people).toFixed(2));
  }

  totalPerPerson = Number(bill / people + tipAmount).toFixed(2);

  // set data
  setTipAndTotal();

  // local storage
  setLocalStorage();
}

resetBtn.addEventListener('click', function () {
  const initialVAlue = 0.0;

  tipAmountDisplay.textContent = `$${initialVAlue}`;
  totalAmountDisplay.textContent = `$${initialVAlue}`;
  amountInput.value = peopleInput.value = customInput.value = '';

  reset();
});
