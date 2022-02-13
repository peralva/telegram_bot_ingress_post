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

    let messages = group.messages.filter(element => element.ids.post && element.ids.post == id_message);
    return(messages);
}