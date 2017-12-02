'use strict';
const Alexa = require('alexa-sdk');
const aws = require('aws-sdk');
const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).
const converter = require('number-to-words');
const dynamodb = new aws.DynamoDB();

 let speechOutput;
 let reprompt;
 const welcomeOutput = "Welcome to CryptoPro. What crypto currency would you like to get information on?";
 const welcomeReprompt = "Let me know where you'd like to go or when you'd like to go on your trip";



const handlers = {
    'LaunchRequest': function () {
      this.response.speak(welcomeOutput).listen(welcomeReprompt);
      this.emit(':responseReady');
    },
    'GetPrice': function () {
        var filledSlots = delegateSlotCollection.call(this);
        var intentObj = this.event.request.intent;
        if (!intentObj.slots.cryptocurrency.value) {
            var slotToElicit = 'CryptoCurrency';
            var speechOutput = 'Which cryptocurrency do yo want to know the price of?';
            var repromptSpeech = speechOutput;
            this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }
        //delegate to Alexa to collect all the required slot values
        //var filledSlots = delegateSlotCollection.call(this);

        //compose speechOutput that simply reads all the collected slot values

		
        //activity is optional so we'll add it to the output
        //only when we have a valid activity
        //var travelMode = isSlotValid(this.event.request, "travelMode");
        //if (travelMode) {
        //  speechOutput += travelMode;
        //} else {
        //  speechOutput += "You'll go ";
        //}

        //Now let's recap the trip
        //var cryptoCurrency=this.event.request.intent.slots.cryptocurrency.value;
        //var toCity=this.event.request.intent.slots.toCity.value;
        //var travelDate=this.event.request.intent.slots.travelDate.value;
        //var speechOutput = cryptoCurrency;

        //var activity = isSlotValid(this.event.request, "activity");
        //if (activity) {
        //  speechOutput += " to go "+ activity;
        //}
        
        //console.log(cryptoCurrency);

		//if(cryptoCurrency == null)
		//	this.response.speak("No slot found");
		//else {
		//	getCoin(cryptoCurrency, this);
			//this.response.speak("help");
			//this.emit(":responseReady");
		//}
    },
    'AMAZON.HelpIntent': function () {
        speechOutput = "";
        reprompt = "";
        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        speechOutput = "";
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        speechOutput = "";
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'SessionEndedRequest': function () {
        var speechOutput = "";
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
};





exports.handler = (event, context) => {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    //alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

function getCoin(coin, contextt) {
    var params = {
        TableName: "CryptoPro",
        Key: {
            "name": {
                S: coin
            },
        }
    };
	
	//contextt.response.speak("help");
	//contextt.emit(":responseReady");
    
    dynamodb.getItem(params, function(err, data) {
        if (err) {
            contextt.response.speak("help");
			contextt.emit(":responseReady");
			}
        else {
            contextt.response.speak(converter.toWords(data.Item.price.N));
			contextt.emit(":responseReady");
			}
        });
	
	
}
