const translateText = require("../../../utils/translateText");
const replyWithHTML = require("../utils/replyWithHTML");

module.exports = ctx => {
    let language = ctx.update.message.from.language_code;

    if(ctx.update.message.chat.type != 'supergroup') {
        replyWithHTML({ctx, text: `${translateText({language, text: 'This command can only be used in supergroup'})}.`});

        return;
    }

    ctx.replyWithHTML(`/link_group ${ctx.update.message.chat.id}`).then(result => {
        ctx.replyWithHTML(
            `${translateText({language, text: "Add me to the channel and then forward this message that I'm replying to the channel. If you give me permission to delete channel messages, I will delete the forwarded message immediately. If you prefer, you can delete the message as soon as you forward it and you can also forward it silently, unchecking the bell, so subscribers don't receive the notification"})}.`,
            {reply_to_message_id: result.message_id}
        );
    });
}