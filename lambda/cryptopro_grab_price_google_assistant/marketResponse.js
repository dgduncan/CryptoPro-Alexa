module.exports = {
	getDayVolumeUsd: function(callback, body) {
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
                        })	
	},
	
	getMarketcapUsd: function(callback, body) {
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
                        })
        }
}

function buildResponse(body, responseType) {
        const coinName = body[0].name
	const marketCapUsd = body[0].market_cap_usd
	const volumeDay = body[0]["24h_volume_usd"]        

        switch (responseType) {
                case 0:
                        return `The daily trading of ${coinName} is ${volumeDay} U S dollars`
        	case 1:
			return `The total market cap of ${coinName} is ${marketCapUsd} U S dollars`
        }
}	
