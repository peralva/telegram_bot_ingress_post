const translateText = require("../../../utils/translateText");
const getUserName = require("./getUserName");

module.exports = parameters => {
    if(Object.prototype.toString.call(parameters) == '[object Object]') {
        var {
            data
        } = parameters;
    }

    return(''
        + '\n'
        + '\n'
        + `${translateText({language: data.language_code, text: 'Parameter configured by'})} <b>${getUserName({data, lastName: true})}.</b>`
    );
}