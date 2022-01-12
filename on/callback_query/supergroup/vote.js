const translateText = require('../../../../../utils/translateText');
const getGroup = require('../../../utils/getGroup');
const getMessageVote = require('../../../utils/getMessageVote');
const getUser = require('../../../utils/getUser');
const setUserData = require('../../../utils/setUserData');
const recordData = require('../../../utils/recordData');

module.exports = async ctx => {
    let callback_query = ctx.update.callback_query;
    let language = callback_query.from.language_code;
    let token = ctx.tg.token;
    let group = getGroup({token, id: callback_query.message.chat.id})
    let post = group.messages[callback_query.message.message_id];
    let user = getUser({token, id: callback_query.from.id});

    let answerCbQueryText = '';
    let url = '';
    let text1 = '';
    let button = true;

    if(post.posted) {
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
            let index = post.votes.indexOf(callback_query.from.id);

            if(index == -1) {
                if(false
                    || group.parameters.votes.length == 0
                    || (true
                        && group.parameters.votes[0].value.enlightened == 0
                        && group.parameters.votes[0].value.resistance == 0
                    )
                ) {
                    text1 = (''
                        + '\n'
                        + `\n${translateText({language, text: 'Vote parameter not configured. Type /change_votes to configure'})}.`
                    );
                } else if(true
                    && typeof(user.parameters.faction) != 'string'
                    && group.parameters.votes[0].value.enlightened > 0
                    && group.parameters.votes[0].value.resistance > 0
                ) {
                    url = `t.me/${ctx.botInfo.username}?start=change_faction`;
                } else {
                    setUserData({token, data: callback_query.from});

                    post.votes.push(callback_query.from.id);

                    if(true
                        && post.votes.includes(post.author)
                        && (false
                            || (true
                                && (false
                                    || group.parameters.votes[0].value.enlightened == 0
                                    || group.parameters.votes[0].value.resistance == 0
                                )
                                && post.votes.length >= group.parameters.votes[0].value.enlightened + group.parameters.votes[0].value.resistance
                            )
                            || (true
                                && post.votes.filter(element => true
                                    && typeof(global.bots[token].users[element].parameters.faction) == 'string'
                                    && global.bots[token].users[element].parameters.faction == 'enlightened'
                                ).length >= group.parameters.votes[0].value.enlightened
                                && post.votes.filter(element => true
                                    && typeof(global.bots[token].users[element].parameters.faction) == 'string'
                                    && global.bots[token].users[element].parameters.faction == 'resistance'
                                ).length >= group.parameters.votes[0].value.resistance
                            )
                        )
                    ) {
                        let administratorVoted;

                        await ctx.getChatAdministrators().then(result => {
                            if(result.findIndex(element => post.votes.includes(element.user.id)) > -1) {
                                administratorVoted = true;
                            }
                        });

                        if(administratorVoted) {
                            let {linked_chat_id} = await ctx.getChat();
                
                            if(true
                                && group.parameters.channels.length == 0
                                && typeof(linked_chat_id) != 'number'
                            ) {
                                text1 = (''
                                    + '\n'
                                    + `\n${translateText({language, text: 'Need to link the group to a channel. Use the /link_channel command or use the native Telegram link'})}.`
                                );
                            } else {
                                await ctx.telegram.copyMessage(
                                    group.parameters.channels.length > 0 ? group.parameters.channels[0].value : linked_chat_id,
                                    callback_query.message.chat.id,
                                    ctx.update.callback_query.message.reply_to_message.message_id
                                ).then(() => {
                                    text1 = (''
                                        + '\n'
                                        + `\n<b>${translateText({language, text: 'Published post'})}</b>`
                                    );

                                    post.posted = true;
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
            } else {
                post.votes.splice(index, 1);
            }

            recordData({token});
        }
    }

    let {text, reply_markup} = getMessageVote({
        language,
        token,
        post
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