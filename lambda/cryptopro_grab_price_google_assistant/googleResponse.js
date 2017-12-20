
module.exports = {
	getPriceUsd: function(callback, body) {
		callback(null, {statusCode: '200',
        		headers: {'Content-Type': 'application/json'},
        		body: JSON.stringify({
                		"speech": body[0].price_usd,
                		"displayText": "Currently, " + body[0].name + " is trading for " + body[0].price_usd + " US dollars",
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
	
