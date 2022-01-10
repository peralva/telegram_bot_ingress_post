module.exports = parameters => {
    if(Object.prototype.toString.call(parameters) == '[object Object]') {
        var {
            ctx,
            text,
            extra = {}
        } = parameters;
    }

    let token = ctx.tg.token;
    let data;

    if(ctx.update.message.chat.type == 'private') {
        data = global[token].users;
    } else if(false
        || ctx.update.message.chat.type == 'supergroup'
        || ctx.update.message.chat.type == 'group'
    ) {
        data = global[token].groups;
    }

    if(false
        || typeof(data[ctx.update.message.chat.id]) != 'object'
        || typeof(data[ctx.update.message.chat.id].parameters) != 'object'
        || !data[ctx.update.message.chat.id].parameters.delete_commands
    ) {
        extra.reply_to_message_id = ctx.update.message.message_id;
    }

    return(ctx.replyWithHTML(text, extra));
}