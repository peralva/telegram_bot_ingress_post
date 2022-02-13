const translateText = require("../../../utils/translateText");
const getMessageByController = require("../utils/getMessageByController");
const getMessageVote = require("../utils/getMessageVote");
const recordData = require("../utils/recordData");
const replyWithHTML = require("../utils/replyWithHTML");
const setUserData = require("../utils/setUserData");

module.exports = ctx => {
    let language = ctx.update.message.from.language_code;
    let token = ctx.tg.token;

    if(ctx.update.message.chat.type != 'supergroup') {
        replyWithHTML({
            ctx,
            text: `${translateText({language, text: 'This command can only be used in supergroup'})}.`
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

    if(false
        || ctx.update.message.reply_to_message.from.id == 777000
        || ctx.update.message.reply_to_message.from.is_bot
    ) {
        ctx.update.message.reply_to_message.from = ctx.update.message.from;
    } else if(ctx.update.message.from.is_bot) {
        ctx.update.message.from = ctx.update.message.reply_to_message.from;
    }

    if(true
        && ctx.update.message.from.is_bot
        && ctx.update.message.reply_to_message.from.is_bot
    ) {
        replyWithHTML({
            ctx,
            text: `${translateText({language, text: "An anonymous user cannot author a post"})}.`
        });

        return;
    }

    if(ctx.update.message.from.id == ctx.update.message.reply_to_message.from.id) {
        setUserData({token, data: ctx.update.message.from});

        let {text, reply_markup} = getMessageVote({
            language,
            token,
            message: {
                author: ctx.update.message.from.id,
                votes: [ctx.update.message.from.id]
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

            let message = getMessageByController({
                token,
                id_group: ctx.update.message.chat.id,
                id_message: result.message_id
            });

            message.ids.post = ctx.update.message.reply_to_message.message_id;
            message.author = ctx.update.message.from.id;
            message.votes.push(ctx.update.message.from.id);

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