const translateText = require('../../../../../utils/translateText');
const getGroup = require('../../../utils/getGroup');
const getMessageVote = require('../../../utils/getMessageVote');
const getUser = require('../../../utils/getUser');
const recordData = require('../../../utils/recordData');

module.exports = async ctx => {
    let callback_query = ctx.update.callback_query;
    let language = callback_query.from.language_code;
    let token = ctx.tg.token;
    let group = getGroup({token, id: callback_query.message.chat.id})
    let message = group.messages[callback_query.message.message_id];
    let user = getUser({token, id: callback_query.from.id});

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
                if(true
                    && typeof(user.parameters.faction) != 'string'
                    && group.parameters.votes.enlightened > 0
                    && group.parameters.votes.resistance > 0
                ) {
                    url = `t.me/${ctx.botInfo.username}?start=change_faction`;
                } else {
                    user.data = {...callback_query.from};
                    delete(user.data.id);

                    message.votes.push(callback_query.from.id);

                    if(false
                        || (true
                            && (false
                                || group.parameters.votes.enlightened == 0
                                || group.parameters.votes.resistance == 0
                            )
                            && message.votes.length >= group.parameters.votes.enlightened + group.parameters.votes.resistance
                        )
                        || (true
                            && message.votes.filter(element => true
                                && typeof(global.bots[token].users[element].parameters.faction) == 'string'
                                && global.bots[token].users[element].parameters.faction == 'enlightened'
                            ).length >= group.parameters.votes.enlightened
                            && message.votes.filter(element => true
                                && typeof(global.bots[token].users[element].parameters.faction) == 'string'
                                && global.bots[token].users[element].parameters.faction == 'resistance'
                            ).length >= group.parameters.votes.resistance
                        )
                    ) {
                        let {linked_chat_id} = await ctx.getChat();
            
                        if(typeof(linked_chat_id) != 'number') {
                            text1 = (''
                                + '\n'
                                + `\n${translateText({language, text: 'Need to link the group to a channel'})}.`
                            );
                        } else {
                            await ctx.telegram.copyMessage(
                                linked_chat_id,
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
            } else {
                message.votes.splice(index, 1);
            }

            recordData({token});
        }
    }

    let {text, reply_markup} = getMessageVote({
        language,
        token,
        votes: message.votes
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