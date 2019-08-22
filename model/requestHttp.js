const request = require('request');
let httpRequest = {
    request(url) {
        return new Promise((reject, resolve) => {
            request(url, (error, response, body) => {
                if (!error && response.statusCode === 200) { //通过前端传过来的code获取sessionKey
                    reject(body)
                } else {
                    resolve(error)
                }
            })
        })
    }
}
module.exports = httpRequest;