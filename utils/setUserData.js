const getUser = require("./getUser");
const recordData = require("./recordData");

module.exports = parameters => {
    if(Object.prototype.toString.call(parameters) == '[object Object]') {
        var {
            token,
            data
        } = parameters;
    }

    let user = getUser({token, id: data.id});

    user.data = {...data};

    delete(user.data.id);
}