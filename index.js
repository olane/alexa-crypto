'use strict';

const Alexa = require('alexa-sdk');
const cryptoPrices = require('./crypto-prices');

const APP_ID = undefined; // TODO replace

function generateHint(){
    return 'Try asking for the price of Bitcoin.';
}

function getCurrencySymbol(currencyInput) {
    return 'BTC';
}

function getPriceSummarySpeech(currencyFrom, currencyTo, price){
    return 'The price of ' + currencyFrom + ' right now is ' + price + ' ' + currencyTo;
}

const handlers = {
    'LaunchRequest': function () {
        let speechOutput = 'Welcome to crypto currency. ' + generateHint();
        let reprompt = 'I didn\'t catch that. '+ generateHint();

        this.emit(':tell', speechOutput, reprompt);
    },
    'GetPriceIntent': function () {
        const currencyFromSlot = this.event.request.intent.slots.CurrencyFrom;
        let currencyFrom;
        if (currencyFromSlot && currencyFromSlot.value) {
            currencyFrom = currencyFrom.value.toLowerCase();
        }

        let currencyFromSymbol = getCurrencySymbol(currencyFrom);

        let price = cryptoPrices.getPrice(currencyFromSymbol, 'USD');

        let priceOutput = getPriceSummarySpeech(currencyFrom, 'USD');

        this.emit(':tell', priceOutput);
    },
    'AMAZON.HelpIntent': function () {
        let speechOutput = 'You can ask things like, ' + generateHint();
        let reprompt = 'You can say things like, '+ generateHint();

        this.emit(':tell', speechOutput, reprompt);
    }
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};