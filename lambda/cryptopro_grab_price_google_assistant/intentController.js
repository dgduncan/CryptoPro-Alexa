var googleResponse = require("./googleResponse.js");

module.exports = {
	checkIntent: function(intent, callback, body) {
		switch(intent) {
			case "get_price_usd":
				googleResponse.getPriceUsd(callback, body)
				break
			case "get_price_btc":
				googleResponse.getPriceBtc(callback, body)
				break
		}
	}
}
