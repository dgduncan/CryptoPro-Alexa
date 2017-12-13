const request = require('request');

exports.handler = (event, context, callback) => {
	const URL = process.env.url;
	var requestBody = JSON.parse(event.body);
	console.log(requestBody);
	//console.log(requestBody.result.parameters.Cryptocurrency)
	request(URL + requestBody.result.parameters.Cryptocurrency.toLowerCase(), function (error, response, body) {
        	if (!error && response.statusCode == 200) {
        			const btcJSON = JSON.parse(body)
                	callback(null, {statusCode: '200',
        			headers: {'Content-Type': 'application/json'},
        			body: JSON.stringify({
                			"speech": btcJSON[0].price_usd,
                			"displayText": btcJSON[0].price_usd,
        				"data": "",
        				"contextOut": [],
        				"source": ""
        				})
            		});
            	}
    	});
};