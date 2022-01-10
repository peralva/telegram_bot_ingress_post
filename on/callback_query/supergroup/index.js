module.exports = ctx => {
    ctx.update.callback_query.data = JSON.parse(ctx.update.callback_query.data);

    let type = Object.keys(ctx.update.callback_query.data)[0];

    ctx.update.callback_query.data = ctx.update.callback_query.data[type];

    require(`./${type}`)(ctx);
}