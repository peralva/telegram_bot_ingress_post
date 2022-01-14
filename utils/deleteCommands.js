const translateText = require("../../../utils/translateText");
const getGroup = require("../utils/getGroup");
const getUser = require("../utils/getUser");

module.exports = parameters => {
    if(Object.prototype.toString.call(parameters) == '[object Object]') {
        var {
            ctx
        } = parameters;
    }

    let token = ctx.tg.token;
    let language = ctx.update.message.from.language_code;

    let deleteCommand;

    if(ctx.update.message.chat.type == 'private') {
        deleteCommand = getUser({token, id: ctx.update.message.chat.id}).parameters.delete_commands;
    } else if(ctx.update.message.chat.type.includes('group')) {
        let delete_commands = getGroup({token, id: ctx.update.message.chat.id}).parameters.delete_commands;

        deleteCommand = (true
            && delete_commands.length > 0
            && delete_commands[0].value
        );
    }

    if(deleteCommand) {
        ctx.deleteMessage(ctx.update.message.message_id).catch(err => {
            if(true
                && ctx.update.message.chat.type.includes('group')
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