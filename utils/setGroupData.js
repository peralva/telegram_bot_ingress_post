const getGroup = require("./getGroup");

module.exports = parameters => {
    if(Object.prototype.toString.call(parameters) == '[object Object]') {
        var {
            token,
            data
        } = parameters;
    }

    getGroup({token, id: data.id}).data = data;
}