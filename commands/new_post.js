const translateText = require("../../../utils/translateText");
const getGroup = require("../utils/getGroup");
const getMessageVote = require("../utils/getMessageVote");
const recordData = require("../utils/recordData");
const replyWithHTML = require("../utils/replyWithHTML");
const setUserData = require("../utils/setUserData");

module.exports = ctx => {
    let language = ctx.update.message.from.language_code;
    let token = ctx.tg.token;

    if(ctx.update.message.chat.type != 'supergroup') {
        replyWithHTML({ctx, text: `${translateText({language, text: 'This command can only be used in supergroup'})}.`});

        return;
    }

    let group = getGroup({token, id: ctx.update.message.chat.id});

    if(false
        || group.parameters.votes.length == 0
        || (true
            && group.parameters.votes[0].value.enlightened == 0
            && group.parameters.votes[0].value.resistance == 0
        )
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

    if(ctx.update.message.from.id == ctx.update.message.reply_to_message.from.id) {
        setUserData({token, data: ctx.update.message.from});

        let {text, reply_markup} = getMessageVote({
            language,
            token,
            post: {
                author: ctx.update.message.from.id,
                votes: []
            }
        });

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
                author: ctx.update.message.from.id,
                votes: []
            };

            recordData({token});
        });
    } else {
        ctx.replyWithHTML(
            `${translateText({language, text: "Who is the author of the post"})}?`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: ctx.update.message.reply_to_message.from.first_name,
                                callback_data: JSON.stringify(
                                    {
                                        author: ctx.update.message.reply_to_message.from.id
                                    }
                                )
                            },
                            {
                                text: ctx.update.message.from.first_name,
                                callback_data: JSON.stringify(
                                    {
                                        author: ctx.update.message.from.id
                                    }
                                )
                            }
                        ]
                    ]
                },
                reply_to_message_id: ctx.update.message.reply_to_message.message_id
            }
        );

        setUserData({token, data: ctx.update.message.from});
        setUserData({token, data: ctx.update.message.reply_to_message.from});

        recordData({token});
    }
}