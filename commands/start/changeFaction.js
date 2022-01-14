module.exports = parameters => {
    if(Object.prototype.toString.call(parameters) == '[object Object]') {
        var {
            ctx
        } = parameters;
    }

    require('../change_faction')(ctx);
}