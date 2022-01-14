const translateText = require("../../../utils/translateText");
const replyWithHTML = require("../utils/replyWithHTML");

module.exports = ctx => {
    let language = ctx.update.message.from.language_code;

    if(ctx.update.message.chat.type != 'supergroup') {
        replyWithHTML({ctx, text: `${translateText({language, text: 'This command can only be used in supergroup'})}.`});

        return;
    }

    replyWithHTML({
        ctx,
        text: `${translateText({language, text: 'Click the button below to link a channel'})}.`,
        extra: {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: translateText({language, text: 'Link Channel'}),
                            callback_data: '{"link_channel": true}'
                        }
                    ]
                ]
            }
        }
    });
}