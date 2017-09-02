'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined; // TODO replace

function generateHint(){
    return 'Try asking for the price of Bitcoin.';
}

const handlers = {
    'LaunchRequest': function () {
        let speechOutput = 'Welcome to crypto currency. ' + generateHint();
        let reprompt = 'I didn\'t catch that. '+ generateHint();

        this.emit(':tell', speechOutput, reprompt);
    },
    'GetPriceIntent': function () {
        
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