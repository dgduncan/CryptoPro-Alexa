// 1. Text strings =====================================================================================================
 //    Modify these strings and messages to change the behavior of your Lambda function

 let speechOutput;
 let reprompt;
 const welcomeOutput = "Welcome to CryptoPro. What crypto currency would you like to get information on?";
 const welcomeReprompt = "Let me know where you'd like to go or when you'd like to go on your trip";
 const tripIntro = [
   "This sounds like a cool trip. ",
   "This will be fun. ",
   "Oh, I like this trip. "
 ];

'use strict';
const Alexa = require('alexa-sdk');
const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).
var aws = require('aws-sdk');
var converter = require('number-to-words');
var dynamodb = new aws.DynamoDB();

const handlers = {
    'LaunchRequest': function () {
      this.response.speak(welcomeOutput).listen(welcomeReprompt);
      this.emit(':responseReady');
    },
    'CryptoPro': function () {
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
        var cryptoCurrency=this.event.request.intent.slots.cryptocurrency.value;
        //var toCity=this.event.request.intent.slots.toCity.value;
        //var travelDate=this.event.request.intent.slots.travelDate.value;
        //var speechOutput = cryptoCurrency;

        //var activity = isSlotValid(this.event.request, "activity");
        //if (activity) {
        //  speechOutput += " to go "+ activity;
        //}

		if(cryptoCurrency == null)
			this.response.speak("No slot found");
		else {
			getCoin(cryptoCurrency, this);
			//this.response.speak("help");
			//this.emit(":responseReady");
		}
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
                S: jsUcfirst(coin)
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

function jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}