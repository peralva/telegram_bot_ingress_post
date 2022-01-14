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
        + `${translateText({language: data.language, text: 'Parameter configured by'})} <b>${data.first_name}${typeof(data.last_name) == 'string' ? ` ${data.last_name}` : ''}.</b>`
    );
}