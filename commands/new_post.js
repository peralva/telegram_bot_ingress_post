const translateText = require("../../../utils/translateText");
const getGroup = require("../utils/getGroup");
const getMessageVote = require("../utils/getMessageVote");
const recordData = require("../utils/recordData");
const replyWithHTML = require("../utils/replyWithHTML");

module.exports = ctx => {
    let language = ctx.update.message.from.language_code;
    let token = ctx.tg.token;

    if(ctx.update.message.chat.type != 'supergroup') {
        replyWithHTML({ctx, text: `${translateText({language, text: 'This command can only be used in supergroup'})}.`});

        return;
    }

    let group = getGroup({token, id: ctx.update.message.chat.id});

    if(true
        && group.parameters.votes.enlightened == 0
        && group.parameters.votes.resistance == 0
    ) {
        replyWithHTML({
            ctx,
            text: `${translateText({language, text: 'Vote parameter not configured. Type /change_votes to configure'})}.`
        });

        return;
    }

    if(typeof(ctx.update.message.reply_to_message) != 'object') {
        replyWithHTML({
            ctx,
            text: `${translateText({language, text: 'It is necessary to reply to the message that will be put to the vote'})}.`
        });

        return;
    }

    if(ctx.update.message.reply_to_message.from.id == ctx.botInfo.id) {
        replyWithHTML({
            ctx,
            text: `${translateText({language, text: "Can't put my message to vote"})}.`
        });

        return;
    }

    let {text, reply_markup} = getMessageVote({language})

    ctx.replyWithHTML(
        text,
        {
            reply_markup,
            reply_to_message_id: ctx.update.message.reply_to_message.message_id
        }
    ).then(result => {
        ctx.pinChatMessage(result.message_id).catch(err => {
            if(true
                && !err.response.ok
                && err.response.error_code == 400
            ) {
                ctx.replyWithHTML(
                    `${translateText({language, text: "I'm not allowed to pin messages"})}.`,
                    {reply_to_message_id: result.message_id}
                );
            }
        });

        group.messages[result.message_id] = {
            votes: []
        };

        recordData({token});
    });
}