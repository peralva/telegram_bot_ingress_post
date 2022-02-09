module.exports = parameters => {
    if(Object.prototype.toString.call(parameters) == '[object Object]') {
        var {
            token,
            id
        } = parameters;
    }

    if(typeof(global.bots[token].channels) != 'object') {
        global.bots[token].channels = [];
    }

    let channel = global.bots[token].channels.find(element => element.data.id == id);

    if(typeof(channel) != 'object') {
        channel = {
            data: {
                id
            }
        };
    
        global.bots[token].channels.push(channel);
    }

    return(channel);
}