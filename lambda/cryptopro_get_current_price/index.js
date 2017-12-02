const request = require('request')

exports.handler = (event, context, callback) => {
	const URL = process.env.url
	request(URL + "bitcoin", function (error, response, body) {
        	if (!error && response.statusCode == 200) {
                	var btcJSON = JSON.parse(body)
                	callback(null, 'Hello from Lambda');
            	}
    	});
};
