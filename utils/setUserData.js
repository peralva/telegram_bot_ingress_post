const getUser = require("./getUser");

module.exports = parameters => {
    if(Object.prototype.toString.call(parameters) == '[object Object]') {
        var {
            token,
            data
        } = parameters;
    }

    getUser({token, id: data.id}).data = data;
}