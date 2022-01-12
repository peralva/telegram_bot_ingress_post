module.exports = parameters => {
    if(Object.prototype.toString.call(parameters) == '[object Object]') {
        var {
            id,
            token
        } = parameters;
    }

    if(typeof(global.bots[token].users) != 'object') {
        global.bots[token].users = {};
    }

    if(typeof(global.bots[token].users[id]) != 'object') {
        global.bots[token].users[id] = {};
    }

    if(typeof(global.bots[token].users[id].parameters) != 'object') {
        global.bots[token].users[id].parameters = {};
    }

    if(typeof(global.bots[token].users[id].data) != 'object') {
        global.bots[token].users[id].data = {};
    }

    return(global.bots[token].users[id]);
}