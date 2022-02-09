module.exports = parameters => {
    if(Object.prototype.toString.call(parameters) == '[object Object]') {
        var {
            data,
            lastName
        } = parameters;
    }

    return(`<a href="tg://user?id=${data.id}">${data.first_name}${lastName && data.last_name ? ` ${data.last_name}` : ``}</a>`);
}