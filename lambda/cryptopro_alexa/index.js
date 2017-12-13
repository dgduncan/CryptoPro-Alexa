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
	console.log("Entering GetPrice")
        var intentObj = this.event.request.intent;
        if (!intentObj.slots.cryptocurrency.value) {
            	var slotToElicit = 'cryptocurrency';
        	var speechOutput = 'Which cryptocurrency do yo want to know the price of?';
        	var repromptSpeech = speechOutput;
        	return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
        }

        var cryptoCurrency=this.event.request.intent.slots.cryptocurrency.value;
        

	if(cryptoCurrency == null)
		this.response.speak("No slot found");
	else {
		getCoin(cryptoCurrency, this);
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
		//contextt.response.speak(converter.toWords(data.Item.price.N));
		contextt.emit(":tell", converter.toWords(data.Item.price.N), "test");
			}
        });
	
	
}

function delegateSlotCollection() {
	console.log("in delegateSlotCollection");
	console.log("current dialogState: "+this.event.request.dialogState);

	if (context.event.request.dialogState === "STARTED") {
		console.log("in Beginning");
      		var updatedIntent=context.event.request.intent;
      		//optionally pre-fill slots: update the intent object with slot values for which
      		//you have defaults, then return Dialog.Delegate with this updated intent
      		// in the updatedIntent property
      		context.emit(":delegate", updatedIntent);
    	} else if (context.event.request.dialogState !== "COMPLETED") {
      		console.log("in not completed");
      		// return a Dialog.Delegate directive with no updatedIntent property.
      		context.emit(":delegate");
    	} else {
      		console.log("in completed");
      		console.log("returning: "+ JSON.stringify(this.event.request.intent));
      		// Dialog is now complete and all required slots should be filled,
      		// so call your normal intent handler.
      		return context.event.request.intent;
    	}
}
