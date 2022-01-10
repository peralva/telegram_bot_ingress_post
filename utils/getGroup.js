module.exports = parameters => {
    if(Object.prototype.toString.call(parameters) == '[object Object]') {
        var {
            id,
            token
        } = parameters;
    }

    if(typeof(global[token].groups[id]) != 'object') {
        global[token].groups[id] = {};
    }

    if(typeof(global[token].groups[id].parameters) != 'object') {
        global[token].groups[id].parameters = {};
    }

    if(typeof(global[token].groups[id].parameters.votes) != 'object') {
        global[token].groups[id].parameters.votes = {
            enlightened: 0,
            resistance: 0
        };
    }

    if(typeof(global[token].groups[id].messages) != 'object') {
        global[token].groups[id].messages = {};
    }

    return(global[token].groups[id]);
}