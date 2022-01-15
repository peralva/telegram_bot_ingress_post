const translateText = require("../../../utils/translateText");

module.exports = parameters => {
    if(Object.prototype.toString.call(parameters) == '[object Object]') {
        var {
            data
        } = parameters;
    }

    return(''
        + '\n'
        + '\n'
        + `${translateText({language: data.language_code, text: 'Parameter configured by'})} <b><a href="tg://user?id=${data.id}">${data.first_name}${typeof(data.last_name) == 'string' ? ` ${data.last_name}` : ''}</a>.</b>`
    );
}