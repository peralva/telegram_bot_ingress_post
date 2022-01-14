const translateText = require("../../../../../utils/translateText");
const getMessage = require("../../../utils/getMessage");
const getMessageVote = require("../../../utils/getMessageVote");
const recordData = require("../../../utils/recordData");

module.exports = ctx => {
    let callback_query = ctx.update.callback_query;
    let language = callback_query.from.language_code;
    let token = ctx.tg.token;

    let message = getMessage({token, id_group: callback_query.message.chat.id, id_message: callback_query.message.message_id});
    message.author = callback_query.data;
    message.votes.push(callback_query.from.id);

    let {text, reply_markup} = getMessageVote({language, token, message});

    ctx.editMessageText(
        text,
        {
            parse_mode: 'HTML',
            reply_markup
        }
    );

    ctx.pinChatMessage(callback_query.message.message_id).catch(err => {
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

    recordData({token});

    ctx.answerCbQuery();
}