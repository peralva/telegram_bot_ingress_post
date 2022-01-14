module.exports = ctx => {
    if(ctx.startPayload == '') {
        require('../help')(ctx);
    } else {
        let startPayload = ctx.startPayload.split('_')

        require(`./${startPayload[0]}`)({ctx, startPayload: startPayload[1]});
    }
}