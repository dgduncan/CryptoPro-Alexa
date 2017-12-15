var googleResponse = require("./googleResponse.js");

module.exports = {
	checkIntent: function(intent, callback) {
		switch(intent) {
			case "get_price_usd":
				googleResponse.getPriceUsd(callback)
				break
			case "get_price_btc":
				googleResponse.getPriceBtc(callback)
				break
		}
	}
}
