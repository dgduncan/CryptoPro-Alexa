module.exports = {
	getPercentChangeUsdHour: function(callback, body) {
		const googleResponse = buildResponse(body, 0)
		callback(null, {statusCode: '200',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                                "speech": googleResponse,
                                "displayText": googleResponse,
                                "data": "",
                                "contextOut": [],
                                "source": ""
                                })
                        });
	},

	getPercentChangeUsdDay: function(callback, body) {
		const googleResponse = buildResponse(body, 1)
                callback(null, {statusCode: '200',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                                "speech": googleResponse,
                                "displayText": googleResponse,
                                "data": "",
                                "contextOut": [],
                                "source": ""
                                })
                        });
	},

	getPercentChangeUsdWeek: function(callback, body) {
		const googleResponse = buildResponse(body, 2)
                callback(null, {statusCode: '200',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                                "speech": googleResponse,
                                "displayText": googleResponse,
                                "data": "",
                                "contextOut": [],
                                "source": ""
                                })
                        });
	},

	getPriceUsd: function(callback, body) {
		const googleResponse = buildResponse(body, 3)
		callback(null, {statusCode: '200',
        		headers: {'Content-Type': 'application/json'},
        		body: JSON.stringify({
                		"speech": googleResponse, 
                		"displayText": googleResponse, 
        			"data": "",
        			"contextOut": [],
        			"source": ""
        			})
            		});
	},

	getPriceBtc: function(callback, body) {
		const googleResponse = buildResponse(body, 4)
		callback(null, {statusCode: '200',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                                "speech": googleResponse,
                                "displayText": googleResponse,
                                "data": "",
                                "contextOut": [],
                                "source": ""
                                })
                        });
	}
}

function buildResponse(body, responseType) {
	const coinName = body[0].name
	const percentChangeUsdHour = body[0].percent_change_1h
	const percentChangeUsdDay = body[0].percent_change_24h
	const percentChangeUsdWeek = body[0].percent_change_7d
	const priceUsd = body[0].price_usd
	const priceBtc = body[0].price_btc
	
	switch (responseType) {
		case 0:
			return percentChangeUsdHour;
			break;
		case 1:
			return percentChangeUsdDay;
			break;
		case 2:
			return percentChangeUsdWeek;
			break;
		case 3:
			return `Currently, ${coinName} is trading for ${priceUsd} U S dollars`
			break;
		case 4:
			return `Currently, ${coinName} is trading for ${priceBtc} bitcoins per`
			break;
	}
}
