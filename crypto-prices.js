'use strict';

global.fetch = require('node-fetch')
const cryptocompare = require('cryptocompare')

function getPrice(fromSymbol, toSymbol){
    return cryptocompare.price(fromSymbol, toSymbol).then(prices => {
        return prices[toSymbol];
    });
}

module.exports = {
    getPrice: getPrice
};
