const getGroup = require("./getGroup");
const getUser = require("./getUser");

module.exports = parameters => {
    if(Object.prototype.toString.call(parameters) == '[object Object]') {
        var {
            ctx,
            text,
            extra = {}
        } = parameters;
    }

    let token = ctx.tg.token;

    let deleteCommand;

    if(ctx.update.message.chat.type == 'private') {
        deleteCommand = getUser({token, id: ctx.update.message.chat.id}).parameters.delete_commands;
    } else if(ctx.update.message.chat.type == `supergroup`) {
        let delete_commands = getGroup({token, id: ctx.update.message.chat.id}).parameters.delete_commands;

        deleteCommand = (true
            && delete_commands.length > 0
            && delete_commands[0].value
        );
    }

    if(!deleteCommand) {
        extra.reply_to_message_id = ctx.update.message.message_id;
    }

    return(ctx.replyWithHTML(text, extra));
}