const translateText = require("../../../utils/translateText");

module.exports = parameters => {
    if(Object.prototype.toString.call(parameters) == '[object Object]') {
        var {
            ctx
        } = parameters;
    }

    let token = ctx.tg.token;
    let language = ctx.update.message.from.language_code;

    if(ctx.update.message.chat.type == 'private') {
        data = global.bots[token].users;
    } else if(false
        || ctx.update.message.chat.type == 'supergroup'
        || ctx.update.message.chat.type == 'group'
    ) {
        data = global.bots[token].groups;
    }

    if(true
        && typeof(data[ctx.update.message.chat.id]) == 'object'
        && typeof(data[ctx.update.message.chat.id].parameters) == 'object'
        && data[ctx.update.message.chat.id].parameters.delete_commands
    ) {
        ctx.deleteMessage(ctx.update.message.message_id).catch(err => {
            if(true
                && !err.response.ok
                && err.response.error_code == 400
            ) {
                ctx.replyWithHTML(
                    `${translateText({language, text: "I'm not allowed to delete messages"})}.`,
                    {reply_to_message_id: ctx.update.message.message_id}
                );
            }
        });
    }
}