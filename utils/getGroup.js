module.exports = parameters => {
    if(Object.prototype.toString.call(parameters) == '[object Object]') {
        var {
            token,
            id
        } = parameters;
    }

    if(typeof(global.bots[token].groups) != 'object') {
        global.bots[token].groups = [];
    }

    let group = global.bots[token].groups.find(element => element.data.id == id);

    if(typeof(group) != 'object') {
        group = {
            data: {
                id
            },
            parameters: {
                delete_commands: [],
                votes: [],
                channels: []
            },
            messages: []
        };
    
        global.bots[token].groups.push(group);
    }

    return(group);
}