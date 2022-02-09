const translateText = require("../../../utils/translateText");

module.exports = parameters => {
    if(Object.prototype.toString.call(parameters) == '[object Object]') {
        var {
            data,
            lastName
        } = parameters;
    }

    return(!data.is_bot ? `<a href="tg://user?id=${data.id}">${data.first_name}${lastName && data.last_name ? ` ${data.last_name}` : ``}</a>` : `Anonymous`);
}