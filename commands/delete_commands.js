const translateText = require("../../../utils/translateText");
const recordData = require("../utils/recordData");

module.exports = async ctx => {
    let language = ctx.update.message.from.language_code;
    let token = ctx.tg.token;
    let data;
    let ok;

    if(ctx.update.message.chat.type == 'private') {
        data = global[token].users;
    } else if(false
        || ctx.update.message.chat.type == 'supergroup'
        || ctx.update.message.chat.type == 'group'
    ) {
        data = global[token].groups;
    }

    if(typeof(data[ctx.update.message.chat.id]) != 'object') {
        data[ctx.update.message.chat.id] = {};
    }

    if(typeof(data[ctx.update.message.chat.id].parameters) != 'object') {
        data[ctx.update.message.chat.id].parameters = {};
    }

    if(ctx.update.message.chat.type == 'private') {
        ok = true;
    } else if(false
        || ctx.update.message.chat.type == 'supergroup'
        || ctx.update.message.chat.type == 'group'
    ) {
        await ctx.getChatAdministrators().then(result => {
            if(result.findIndex(element => element.user.id == ctx.update.message.from.id) > -1) {
                ok = true;
            }
        });
    }

    if(!ok) {
        ctx.replyWithHTML(
            `${translateText({language, text: 'Only administrators can change this parameter. If you are an administrator, you need to uncheck the anonymous option so that I can identify you'})}.`,
            {reply_to_message_id: ctx.update.message.message_id}
        );

        return;
    }

    data[ctx.update.message.chat.id].parameters.delete_commands = !data[ctx.update.message.chat.id].parameters.delete_commands;

    ctx.replyWithHTML(
        `${translateText({language, text: 'Configuration'})} <b>${translateText({language, text: data[ctx.update.message.chat.id].parameters.delete_commands ? 'enabled' : 'disabled'})}</b>.`,
        {reply_to_message_id: ctx.update.message.message_id}
    );

    recordData({token});
}