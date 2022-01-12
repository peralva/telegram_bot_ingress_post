const translateText = require("../../../utils/translateText");
const getGroup = require("../utils/getGroup");
const getUser = require("../utils/getUser");
const recordData = require("../utils/recordData");
const setUserData = require("../utils/setUserData");

module.exports = async ctx => {
    let language = ctx.update.message.from.language_code;
    let id = ctx.update.message.chat.id;
    let token = ctx.tg.token;

    let enabled;

    if(ctx.update.message.chat.type == 'private') {
        let user = getUser({token, id});

        enabled = !user.parameters.delete_commands;

        user.parameters.delete_commands = enabled;
    } else if(ctx.update.message.chat.type.includes('group')) {
        let group = getGroup({token, id});

        let ok;

        await ctx.getChatAdministrators().then(result => {
            if(result.findIndex(element => element.user.id == ctx.update.message.from.id) > -1) {
                ok = true;
            }
        });

        if(!ok) {
            ctx.replyWithHTML(
                `${translateText({language, text: 'Only administrators can change this parameter. If you are an administrator, you need to uncheck the anonymous option so that I can identify you'})}.`,
                {reply_to_message_id: ctx.update.message.message_id}
            );

            return;
        }

        enabled = group.parameters.delete_commands.length == 0 || !group.parameters.delete_commands[0].value;

        setUserData({token, data: ctx.update.message.from});

        group.parameters.delete_commands.splice(
            0,
            0,
            {
                value: enabled,
                user: ctx.update.message.from.id,
                date: ctx.update.message.date
            }
        );
    }

    ctx.replyWithHTML(
        `${translateText({language, text: 'Configuration'})} <b>${translateText({language, text: enabled ? 'enabled' : 'disabled'})}</b>.`,
        {reply_to_message_id: ctx.update.message.message_id}
    );

    recordData({token});
}