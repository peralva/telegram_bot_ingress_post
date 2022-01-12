module.exports = parameters => {
    if(Object.prototype.toString.call(parameters) == '[object Object]') {
        var {
            id,
            token
        } = parameters;
    }

    if(typeof(global.bots[token].groups) != 'object') {
        global.bots[token].groups = {};
    }

    if(typeof(global.bots[token].groups[id]) != 'object') {
        global.bots[token].groups[id] = {};
    }

    if(typeof(global.bots[token].groups[id].parameters) != 'object') {
        global.bots[token].groups[id].parameters = {};
    }

    if(typeof(global.bots[token].groups[id].parameters.delete_commands) != 'object') {
        global.bots[token].groups[id].parameters.delete_commands = [];
    }

    if(typeof(global.bots[token].groups[id].parameters.votes) != 'object') {
        global.bots[token].groups[id].parameters.votes = [];
    }

    if(typeof(global.bots[token].groups[id].parameters.channels) != 'object') {
        global.bots[token].groups[id].parameters.channels = [];
    }

    if(typeof(global.bots[token].groups[id].messages) != 'object') {
        global.bots[token].groups[id].messages = {};
    }

    return(global.bots[token].groups[id]);
}