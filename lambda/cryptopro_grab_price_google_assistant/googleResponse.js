
module.exports = {
	getPriceUsd: function(callback, body) {
		callback(null, {statusCode: '200',
        		headers: {'Content-Type': 'application/json'},
        		body: JSON.stringify({
                		"speech": body[0].price_usd,
                		"displayText": body[0].price_usd,
        			"data": "",
        			"contextOut": [],
        			"source": ""
        			})
            		});
	},

	getPriceBtc: function(callback, body) {
		callback(null, {statusCode: '200',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                                "speech": body[0].price_btc,
                                "displayText": body[0].price_btc,
                                "data": "",
                                "contextOut": [],
                                "source": ""
                                })
                        });
	}
}
	
