'use strict';

const _ = require('lodash');

const currencies = [
    {
        speechName: 'Bitcoin',
        speechNamePlural: 'Bitcoins',
        symbol: 'BTC',
        synonyms: ['Bitcoin', 'BTC', 'Bitcoins', 'B.T.C.']
    },
    {
        speechName: 'U.S. dollar',
        speechNamePlural: 'U.S. dollars',
        symbol: 'USD',
        synonyms: ['U.S. dollars', 'USD', 'United States dollars', 'dollars', 'dollar']
    },
    {
        speechName: 'ether',
        speechNamePlural: 'ether',
        symbol: 'ETH',
        synonyms: ['Ether', 'ETH', 'Ethereum']
    }
];

const stripFullStops = (str) => str.replace(/\./g, '');
const toCanonicalCurrencyName = (currencyName) => stripFullStops(currencyName).toLowerCase();
const compareCurrencyNames = (a, b) => toCanonicalCurrencyName(a) === toCanonicalCurrencyName(b);

const getCurrencyByName = (currencyName) => {
    return _.find(currencies, 
        currency => _.find(currency.synonyms,
            synonym => compareCurrencyNames(synonym, currencyName)
        )
    );
};

module.exports = {
    currencies: currencies,
    getCurrencyByName: getCurrencyByName
};
