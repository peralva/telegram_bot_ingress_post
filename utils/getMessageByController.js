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

    let message = group.messages.find(element => element.ids.controller == id_message);

    if(typeof(message) != 'object') {
        message = {
            ids: {
                controller: id_message
            },
            votes: []
        };

        group.messages.push(message);
    }

    return(message);
}