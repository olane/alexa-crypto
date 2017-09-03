'use strict';

const Promise = require('promise');
const chai = require('chai');
const expect = chai.expect;
const _ = require('lodash');

const currencies = require('../currencies');

describe('currencies', () => {
    describe('#getCurrencyByName', () => {
        const currencyNamesToCheck = [
            { input: 'BTC', symbol: 'BTC' },
            { input: 'bitcoin', symbol: 'BTC' },
            { input: 'Bitcoins', symbol: 'BTC' },
            { input: 'Ether', symbol: 'ETH' },
            { input: 'ethereum', symbol: 'ETH' },
            { input: 'US Dollars', symbol: 'USD' },
            { input: 'U.S. dollars', symbol: 'USD' },
            { input: 'dollars', symbol: 'USD' }
        ];
        
        _.forEach(currencyNamesToCheck, testPair => {
            it('should return ' + testPair.symbol + ' for ' + testPair.input, () => {
                let currency = currencies.getCurrencyByName(testPair.input);
                expect(currency.symbol).to.equal(testPair.symbol);
            });
        });
    });
});
