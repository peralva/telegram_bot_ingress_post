const translateText = require('../../../../../utils/translateText');
const getGroup = require('../../../utils/getGroup');
const getMessageVote = require('../../../utils/getMessageVote');
const getUser = require('../../../utils/getUser');
const getMessageByController = require('../../../utils/getMessageByController');
const setUserData = require('../../../utils/setUserData');
const recordData = require('../../../utils/recordData');

module.exports = async ctx => {
    let callback_query = ctx.update.callback_query;
    let language = callback_query.from.language_code;
    let token = ctx.tg.token;
    let parameters = getGroup({token, id: callback_query.message.chat.id}).parameters;
    let message = getMessageByController({token, id_group: callback_query.message.chat.id, id_message: callback_query.message.message_id});

    let answerCbQueryText = '';
    let url = '';
    let text1 = '';
    let button = true;

    if(message.posted) {
        answerCbQueryText = `${translateText({language, text: 'Message already posted'})}.`;
        button = false;

        text1 = (''
            + '\n'
            + `\n<b>${translateText({language, text: 'Published post'})}</b>`
        );
    } else {
        if(typeof(ctx.update.callback_query.message.reply_to_message) != 'object') {
            button = false;

            text1 = (''
                + '\n'
                + `\n${translateText({language, text: 'Original message has been deleted'})}.`
            );
        } else {
            let index = message.votes.indexOf(callback_query.from.id);

            if(index == -1) {
                if(callback_query.from.is_bot) {
                    answerCbQueryText = `${translateText({language, text: "You are anonymous and cannot vote"})}.`
                } else {
                    if(false
                        || parameters.votes.length == 0
                        || (true
                            && parameters.votes[0].value.enlightened == 0
                            && parameters.votes[0].value.resistance == 0
                        )
                    ) {
                        text1 = (''
                            + '\n'
                            + `\n${translateText({language, text: 'Vote parameter not configured. Type /change_votes to configure'})}.`
                        );
                    } else if(true
                        && typeof(getUser({token, id: callback_query.from.id}).parameters.faction) != 'string'
                        && parameters.votes[0].value.enlightened > 0
                        && parameters.votes[0].value.resistance > 0
                    ) {
                        url = `t.me/${ctx.botInfo.username}?start=changeFaction`;
                    } else {
                        setUserData({token, data: callback_query.from});

                        message.votes.push(callback_query.from.id);

                        let votes = message.votes.reduce(
                            (acc, cur) => {
                                let faction = getUser({token, id: cur}).parameters.faction;

                                if(typeof(faction) == 'string') {
                                    if(faction == 'enlightened') {
                                        acc.enlightened++;
                                    } else if(faction == 'resistance') {
                                        acc.resistance++;
                                    }
                                }

                                return(acc);
                            },
                            {enlightened: 0, resistance: 0}
                        )

                        if(true
                            && message.votes.includes(message.author)
                            && (false
                                || (true
                                    && (false
                                        || parameters.votes[0].value.enlightened == 0
                                        || parameters.votes[0].value.resistance == 0
                                    )
                                    && message.votes.length >= parameters.votes[0].value.enlightened + parameters.votes[0].value.resistance
                                )
                                || (true
                                    && votes.enlightened >= parameters.votes[0].value.enlightened
                                    && votes.resistance >= parameters.votes[0].value.resistance
                                )
                            )
                        ) {
                            let administratorVoted;

                            await ctx.getChatAdministrators().then(result => {
                                if(result.findIndex(element => message.votes.includes(element.user.id)) > -1) {
                                    administratorVoted = true;
                                }
                            });

                            if(administratorVoted) {
                                let {linked_chat_id} = await ctx.getChat();
                    
                                if(true
                                    && parameters.channels.length == 0
                                    && typeof(linked_chat_id) != 'number'
                                ) {
                                    text1 = (''
                                        + '\n'
                                        + `\n${translateText({language, text: 'Need to link the group to a channel. Use the /link_channel command or use the native Telegram link'})}.`
                                    );
                                } else {
                                    await ctx.telegram.copyMessage(
                                        parameters.channels.length > 0 ? parameters.channels[0].value : linked_chat_id,
                                        callback_query.message.chat.id,
                                        ctx.update.callback_query.message.reply_to_message.message_id
                                    ).then(() => {
                                        text1 = (''
                                            + '\n'
                                            + `\n<b>${translateText({language, text: 'Published post'})}</b>`
                                        );

                                        message.posted = true;
                                        button = false;
                                    }).catch(err => {
                                        if(!err.response.ok) {
                                            if(err.response.error_code == 403) {
                                                text1 = (''
                                                    + '\n'
                                                    + `\n${translateText({language, text: 'I need to be a channel member to post messages'})}.`
                                                );
                                            } else if(err.response.error_code == 400) {
                                                text1 = (''
                                                    + '\n'
                                                    + `\n${translateText({language, text: "I'm not allowed to post messages on the channel"})}.`
                                                );
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    }
                }
            } else {
                message.votes.splice(index, 1);
            }

            recordData({token});
        }
    }

    let {text, reply_markup} = getMessageVote({
        language,
        token,
        message
    });

    ctx.editMessageText(
        text + text1,
        {
            parse_mode: 'HTML',
            reply_markup: button ? reply_markup : {}
        }
    ).catch(err => {});

    ctx.answerCbQuery(
        answerCbQueryText,
        {
            show_alert: true,
            url
        }
    );

    if(!button) {
        ctx.unpinChatMessage().catch(err => {
            if(true
                && !err.response.ok
                && err.response.error_code == 400
            ) {
                ctx.replyWithHTML(
                    `${translateText({language, text: "I'm not allowed to pin messages"})}.`,
                    {reply_to_message_id: callback_query.message.message_id}
                );
            }
        });
    }
}