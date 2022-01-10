module.exports = ctx => {
    if(ctx.startPayload == '') {
        require('./help')(ctx);
    } else {
        require('./change_faction')(ctx);
    }
}