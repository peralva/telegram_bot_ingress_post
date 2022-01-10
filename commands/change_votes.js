const translateText = require("../../../utils/translateText");
const getMessageChangeVotes = require("../utils/getMessageChangeVotes");
const getGroup = require("../utils/getGroup");
const replyWithHTML = require("../utils/replyWithHTML");

module.exports = ctx => {
    let language = ctx.update.message.from.language_code;

    if(ctx.update.message.chat.type != 'supergroup') {
        replyWithHTML({ctx, text: `${translateText({language, text: 'This command can only be used in supergroup'})}.`});

        return;
    }

    let token = ctx.tg.token;

    let group = getGroup({token, id: ctx.update.message.chat.id});

    let {enlightened, resistance} = group.parameters.votes;

    let {text, reply_markup} = getMessageChangeVotes({enlightened, resistance, language});

    replyWithHTML({ctx, text, extra: {reply_markup}});
}