const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('from-currency');
const toCurrencySelect = document.getElementById('to-currency');
const resultInput = document.getElementById('result');
const convertButton = document.getElementById('convert-button');
const swapButton = document.getElementById('swap-button');
const exchangeRateP = document.getElementById('exchange-rate');

let currencies = {};
let exchangeRates = {};

// Exchange rates as of January 2024 (example rates, not real-time)
const baseRates = {
    "USD": 1,
    "EUR": 0.91,
    "GBP": 0.79,
    "JPY": 141.50,
    "AUD": 1.48,
    "CAD": 1.34,
    "CHF": 0.85,
    "CNY": 7.15,
    "SEK": 10.23,
    "NZD": 1.60,
    "MXN": 17.01,
    "SGD": 1.33,
    "HKD": 7.82,
    "NOK": 10.28,
    "KRW": 1308.86,
    "TRY": 29.77,
    "INR": 83.14,
    "BRL": 4.87,
    "ZAR": 18.61,
    "RUB": 89.61
};

// Fetch currency data from JSON file
fetch('currencies.json')
    .then(response => response.json())
    .then(data => {
        currencies = data;
        populateCurrencySelects();
        calculateExchangeRates();
    });

function populateCurrencySelects() {
    for (const currency in currencies) {
        const option1 = document.createElement('option');
        option1.value = currency;
        option1.text = `${currency} - ${currencies[currency]}`;
        fromCurrencySelect.add(option1);

        const option2 = document.createElement('option');
        option2.value = currency;
        option2.text = `${currency} - ${currencies[currency]}`;
        toCurrencySelect.add(option2);
    }
    fromCurrencySelect.value = 'USD';
    toCurrencySelect.value = 'EUR';
}

function calculateExchangeRates() {
    for (const fromCurrency in baseRates) {
        exchangeRates[fromCurrency] = {};
        for (const toCurrency in baseRates) {
            exchangeRates[fromCurrency][toCurrency] = baseRates[toCurrency] / baseRates[fromCurrency];
        }
    }
}

convertButton.addEventListener('click', convertCurrency);
swapButton.addEventListener('click', swapCurrencies);

function swapCurrencies() {
    const temp = fromCurrencySelect.value;
    fromCurrencySelect.value = toCurrencySelect.value;
    toCurrencySelect.value = temp;
    convertCurrency();
}

function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    if (isNaN(amount)) {
        alert('Please enter a valid number');
        return;
    }

    const rate = exchangeRates[fromCurrency][toCurrency];
    const result = amount * rate;
    resultInput.value = result.toFixed(2);
    exchangeRateP.textContent = `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
}
