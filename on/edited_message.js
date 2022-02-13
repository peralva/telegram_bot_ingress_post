const getMessagesByPost = require("../utils/getMessagesByPost");
const getMessageVote = require("../utils/getMessageVote");
const setUserData = require("../utils/setUserData");

module.exports = ctx => {
    let token = ctx.tg.token;
    let language = ctx.update.edited_message.from.language_code;

    let messages = getMessagesByPost({token, id_group: ctx.update.edited_message.chat.id, id_message: ctx.update.edited_message.message_id});

    for(let i = 0; i < messages.length; i++) {
        if(!messages[i].posted) {
            setUserData({token, data: ctx.update.edited_message.from});

            messages[i].votes = [ctx.update.edited_message.from.id];

            let {text, reply_markup} = getMessageVote({language, token, message: messages[i]});

            ctx.telegram.editMessageText(
                ctx.update.edited_message.chat.id,
                messages[i].ids.controller,
                ``,
                text,
                {
                    parse_mode: 'HTML',
                    reply_markup
                }
            );
        }
    }
}