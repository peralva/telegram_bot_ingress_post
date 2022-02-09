const translateText = require("../../../utils/translateText");
const getGroup = require("../utils/getGroup");
const getParameterConfigured = require("../utils/getParameterConfigured");
const getUser = require("../utils/getUser");
const recordData = require("../utils/recordData");
const setUserData = require("../utils/setUserData");

module.exports = async ctx => {
    let language = ctx.update.message.from.language_code;
    let id = ctx.update.message.chat.id;
    let token = ctx.tg.token;

    let enabled;

    if(ctx.update.message.chat.type == 'private') {
        let parameters = getUser({token, id}).parameters;

        enabled = !parameters.delete_commands;

        parameters.delete_commands = enabled;
    } else if(ctx.update.message.chat.type == `supergroup`) {
        let delete_commands = getGroup({token, id}).parameters.delete_commands;

        let isAdministrator;

        await ctx.getChatAdministrators().then(result => {
            if(result.findIndex(element => element.user.id == ctx.update.message.from.id) > -1) {
                isAdministrator = true;
            }
        });

        if(!isAdministrator) {
            ctx.replyWithHTML(
                `${translateText({language, text: 'Only administrators can change this parameter. If you are an administrator, you need to uncheck the anonymous option so that I can identify you'})}.`,
                {reply_to_message_id: ctx.update.message.message_id}
            );

            return;
        }

        enabled = delete_commands.length == 0 || !delete_commands[0].value;

        setUserData({token, data: ctx.update.message.from});

        delete_commands.splice(
            0,
            0,
            {
                value: enabled,
                user: ctx.update.message.from.id,
                date: ctx.update.message.date
            }
        );
    }

    let text = `${translateText({language, text: 'Configuration'})} <b>${translateText({language, text: enabled ? 'enabled' : 'disabled'})}</b>.`;

    if(ctx.update.message.chat.type == `supergroup`) {
        text += getParameterConfigured({data: ctx.update.message.from});
    }

    ctx.replyWithHTML(
        text,
        {reply_to_message_id: ctx.update.message.message_id}
    );

    recordData({token});
}