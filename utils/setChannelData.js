const getChannel = require("./getChannel");

module.exports = parameters => {
    if(Object.prototype.toString.call(parameters) == '[object Object]') {
        var {
            token,
            data
        } = parameters;
    }

    getChannel({token, id: data.id}).data = data;
}