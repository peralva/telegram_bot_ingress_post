module.exports = parameters => {
    if(Object.prototype.toString.call(parameters) == '[object Object]') {
        var {
            token,
            id
        } = parameters;
    }

    if(typeof(global.bots[token].users) != 'object') {
        global.bots[token].users = [];
    }

    let user = global.bots[token].users.find(element => element.data.id == id);

    if(typeof(user) != 'object') {
        user = {
            data: {
                id
            },
            parameters: {}
        };

        global.bots[token].users.push(user);
    }

    return(user);
}