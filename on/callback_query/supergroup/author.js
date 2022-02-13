const translateText = require("../../../../../utils/translateText");
const getMessageByController = require("../../../utils/getMessageByController");
const getMessageVote = require("../../../utils/getMessageVote");
const recordData = require("../../../utils/recordData");
const setUserData = require("../../../utils/setUserData");


module.exports = ctx => {
    let callback_query = ctx.update.callback_query;
    let language = callback_query.from.language_code;
    let token = ctx.tg.token;

    if(typeof(ctx.update.callback_query.message.reply_to_message) != 'object') {
        ctx.editMessageText(
            translateText({language, text: 'Original message has been deleted'}),
            {
                parse_mode: 'HTML'
            }
        );

        return;
    }

    let message = getMessageByController({token, id_group: callback_query.message.chat.id, id_message: callback_query.message.message_id});
    message.ids.post = ctx.update.callback_query.message.reply_to_message.message_id;
    message.author = callback_query.data;
    message.votes.push(callback_query.from.id);

    setUserData({token, data: ctx.update.callback_query.from});

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