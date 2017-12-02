var aws = require("aws-sdk");
var dynamodb = new aws.DynamoDB();
var request = require('request');

exports.handler = (event, context, callback) => {
    request("https://api.coinmarketcap.com/v1/ticker/?limit=100", function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var btcJSON = JSON.parse(body)
                updateCoins(btcJSON, callback)
            }
        
    });
};

function updateCoins(btcJSON, callback) {
    for (var index = 0; index < btcJSON.length; index++ ) {
        var coin = btcJSON[index];
        var params = {
        ExpressionAttributeNames: {
            "#P": "price",
            "#THC" : "percent_change_day",
            "#R" : "rank",
            "#S" : "symbol"
        }, 
        ExpressionAttributeValues: {
            ":p": {
                N: coin.price_usd
            },
            ":thc": {
                N: coin.percent_change_24h
            },

            ":r": {
                N: coin.rank 
            },
            ":s": {
                S: coin.symbol
            }
        }, 
        Key: {
            "name": {
                S: coin.name.toLowerCase()
            }
        }, 
        ReturnValues: "ALL_NEW", 
        TableName: "CryptoPro", 
        UpdateExpression: "SET #P = :p, #THC = :thc, #R = :r, #S = :s"
        };
        
        updateDatabase(params);
    }
    
    callback(null, "done");
}

function updateDatabase(params) {
    dynamodb.updateItem(params, function(err, data) {
        if (err)
            console.log(err, err.stack); // an error occurred
    });
}