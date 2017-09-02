'use strict';

const Promise = require('promise');
const chai = require('chai');
const expect = chai.expect;
const _ = require('lodash');

const cryptoPrices = require('../crypto-prices');

describe('crypto-prices', () => {
    describe('#getPrice', () => {
        const currencyPairsToCheck = [
            { from: 'BTC', to: 'USD' },
            { from: 'BTC', to: 'EUR' },
            { from: 'BTC', to: 'GBP' },
            { from: 'ETH', to: 'GBP' },
            { from: 'ETH', to: 'BTC' },
            { from: 'OMG', to: 'ETH' }
        ];
        
        _.forEach(currencyPairsToCheck, currencyPair => {
            it('should return a valid ' + currencyPair.from + '/' + currencyPair.to + ' price', () => {
                return cryptoPrices.getPrice(currencyPair.from, currencyPair.to).then(price => {
                    expect(price).to.be.at.least(0, currencyPair.from + '/' + currencyPair.to + ' price should not be negative');
                });
            });
        });
    });
});