var intentController = require('./intentController.js');
const request = require('request');

exports.handler = (event, context, callback) => {
	var requestBody = JSON.parse(event.body);
	const intentName = requestBody.result.metadata.intentName	
	request(process.env.url + requestBody.result.parameters.Cryptocurrency.toLowerCase(), function (error, response, body) {
        	if (!error && response.statusCode == 200) {
        		const btcJSON = JSON.parse(body)
			intentController.checkIntent(intentName, callback, btcJSON)
                	
            	}
    	});
};
