'use strict';

const Alexa = require('alexa-sdk');
const cryptoPrices = require('./crypto-prices');
const currencies = require('./currencies');

const APP_ID = undefined; // TODO replace

function generateHint(){
    return 'Try asking for the price of Bitcoin.';
}

function getPriceSummarySpeech(currencyFrom, currencyTo, price){
    return 'The price of ' + currencyFrom.speechName + ' right now is ' + price + ' ' + currencyTo.speechName;
}

const handlers = {
    'LaunchRequest': function () {
        let speechOutput = 'Welcome to crypto currency. ' + generateHint();
        let reprompt = 'I didn\'t catch that. '+ generateHint();

        this.emit(':tell', speechOutput, reprompt);
    },
    'GetPriceIntent': function () {
        const currencyFromSlot = this.event.request.intent.slots.CurrencyFrom;
        let currencyFromInput = currencyFromSlot && currencyFromSlot.value;

        let currencyFrom = currencies.getCurrencyByName(currencyFromInput);
        let currencyTo = currencies.getCurrencyByName('USD');

        let price = cryptoPrices.getPrice(currencyFrom.symbol, currencyTo.symbol);

        let priceOutput = getPriceSummarySpeech(currencyFrom, currencyTo);

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