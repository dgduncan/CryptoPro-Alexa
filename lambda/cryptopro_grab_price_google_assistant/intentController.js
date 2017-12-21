var characteristicResponse = require("./characteristicResponse.js")
var marketResponse = require("./marketResponse.js")
var priceResponse = require("./priceResponse.js")

module.exports = {
	checkIntent: function(intent, callback, body) {
		switch(intent) {
			case "get_available_supply":
				characteristicResponse.getAvailableSupply(callback, body)
			case "get_day_volume_usd":
				marketResponse.getDayVolumeUsd(callback, body)
			case "get_marketcap_usd":
				marketResponse.getMarketcapUsd(callback, body)
			case "get_percent_change_usd_hour":
				priceResponse.getPercentChangeUsdHour(callback, body)
			case "get_percent_change_usd_day":
				priceResponse.getPercentChangeUsdDay(callback, body)
			case "get_percent_change_usd_week":
				priceResponse.getPercentChangeUsdWeek(callback, body)
			case "get_price_usd":
				priceResponse.getPriceUsd(callback, body)
			case "get_price_btc":
				priceResponse.getPriceBtc(callback, body)
			case "get_total_supply":
				characteristicResponse.getTotalSupply(callback, body)
		}
	}
}
