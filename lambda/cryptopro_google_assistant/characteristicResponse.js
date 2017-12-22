module.exports = {
        getAvailableSupply: function(callback, body) {
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

        getTotalSupply: function(callback, body) {
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
        const availableSupply = body[0].available_supply
        const totalSupply = body[0].total_supply

        switch (responseType) {
                case 0:
                        return `The available supply of ${coinName} is ${availableSupply} coins`
                case 1:
                        return `The total supply of ${coinName} is ${totalSupply} coins`
        }
}
