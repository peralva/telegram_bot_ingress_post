const translateText = require('../../../utils/translateText');
const replyWithHTML = require('../utils/replyWithHTML');

module.exports = ctx => {
    let language = ctx.update.message.from.language_code;
    let text;

    if(ctx.update.message.chat.type == 'private') {
        text = (''
            + `<b>${translateText({language, text: 'List of individual commands'})}:</b>\n`
            + '\n'
            + `/change_faction: ${translateText({language, text: 'Change faction'})}.\n`
            + '\n'
            + `/delete_commands: ${translateText({language, text: 'Enable to not keep chat command history (delete message permission required)'})}.\n`
            + '\n'
            + '\n'
            + `<b>${translateText({language, text: 'For more commands, add me to a group and type /help'})}.</b>`
        );
    } else if(false
        || ctx.update.message.chat.type == 'supergroup'
        || ctx.update.message.chat.type == 'group'
    ) {
        text = (''
            + `<b>${translateText({language, text: 'Group command list'})}:</b>\n`
            + '\n'
            + `/change_votes: ${translateText({language, text: 'Changes the amount of votes needed to publish'})}.\n`
            + '\n'
            + `/delete_commands: ${translateText({language, text: 'Enable to not keep chat command history (delete message permission required)'})}.\n`
            + '\n'
            + `/new_post: ${translateText({language, text: 'Reply to a message with this command to put it to a vote'})}.\n`
            + '\n'
            + '\n'
            + `<b>${translateText({language, text: 'For more commands send me /help in private'})}.</b>`
        );
    }

    replyWithHTML({ctx, text});
}