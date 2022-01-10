module.exports = ctx => {
    require(`./${ctx.update.callback_query.message.chat.type}`)(ctx);
}