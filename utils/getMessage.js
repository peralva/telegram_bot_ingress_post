const getGroup = require("./getGroup");

module.exports = parameters => {
    if(Object.prototype.toString.call(parameters) == '[object Object]') {
        var {
            token,
            id_group,
            id_message
        } = parameters;
    }

    let group = getGroup({token, id: id_group});

    if(typeof(group.messages) != 'object') {
        group.messages = [];
    }

    let message = group.messages.find(element => element.id == id_message);

    if(typeof(message) != 'object') {
        message = {
            id: id_message,
            votes: []
        };

        group.messages.push(message);
    }

    return(message);
}