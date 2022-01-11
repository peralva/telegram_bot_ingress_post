module.exports = parameters => {
    if(Object.prototype.toString.call(parameters) == '[object Object]') {
        var {
            id,
            token
        } = parameters;
    }

    if(typeof(global.bots[token].groups[id]) != 'object') {
        global.bots[token].groups[id] = {};
    }

    if(typeof(global.bots[token].groups[id].parameters) != 'object') {
        global.bots[token].groups[id].parameters = {};
    }

    if(typeof(global.bots[token].groups[id].parameters.votes) != 'object') {
        global.bots[token].groups[id].parameters.votes = {
            enlightened: 0,
            resistance: 0
        };
    }

    if(typeof(global.bots[token].groups[id].messages) != 'object') {
        global.bots[token].groups[id].messages = {};
    }

    return(global.bots[token].groups[id]);
}