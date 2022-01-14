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

    let votes = getGroup({token, id: ctx.update.message.chat.id}).parameters.votes;

    let enlightened;
    let resistance;

    if(votes.length > 0) {
        ({enlightened, resistance} = votes[0].value);
    } else {
        enlightened = resistance = 0;
    }

    let {text, reply_markup} = getMessageChangeVotes({enlightened, resistance, language});

    replyWithHTML({ctx, text, extra: {reply_markup}});
}