module.exports = parameters => {
    if(Object.prototype.toString.call(parameters) == '[object Object]') {
        var {
            id,
            token
        } = parameters;
    }

    if(typeof(global[token].users[id]) != 'object') {
        global[token].users[id] = {};
    }

    if(typeof(global[token].users[id].parameters) != 'object') {
        global[token].users[id].parameters = {};
    }

    if(typeof(global[token].users[id].data) != 'object') {
        global[token].users[id].data = {};
    }

    return(global[token].users[id]);
}