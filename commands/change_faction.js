const capitalize = require("../../../utils/capitalize");
const translateText = require("../../../utils/translateText");
const getUser = require("../utils/getUser");
const recordData = require("../utils/recordData");
const replyWithHTML = require("../utils/replyWithHTML");

module.exports = ctx => {
    let language = ctx.update.message.from.language_code;

    if(ctx.update.message.chat.type != 'private') {
        replyWithHTML({ctx, text: `${translateText({language, text: 'This command can only be used in private'})}.`});

        return;
    }

    let token = ctx.tg.token;

    let parameters = getUser({token, id: ctx.update.message.from.id}).parameters;

    let reply_markup;
    let text;

    if(typeof(parameters.faction) == 'string') {
        if(parameters.faction == 'enlightened') {
            parameters.faction = 'resistance';
        } else if(parameters.faction == 'resistance') {
            parameters.faction = 'enlightened';
        }

        reply_markup = {};
        text = `${translateText({language, text: 'Faction changed to'})} <b>${capitalize({text: translateText({language, text: parameters.faction})})}</b>.`;

        recordData({token});
    } else {
        reply_markup = {
            inline_keyboard: [
                [
                    {
                        text: translateText({language, text: 'Enlightened'}),
                        callback_data: 'enlightened'
                    },
                    {
                        text: translateText({language, text: 'Resistance'}),
                        callback_data: 'resistance'
                    }
                ]
            ]
        };

        text = `<b>${translateText({language, text: 'Choose the faction'})}:</b>`;
    }

    replyWithHTML({
        ctx,
        text,
        extra: {
            reply_markup
        }
    });
}