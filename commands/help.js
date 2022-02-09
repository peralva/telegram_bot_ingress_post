const translateText = require('../../../utils/translateText');
const replyWithHTML = require('../utils/replyWithHTML');

module.exports = ctx => {
    let language = ctx.update.message.from.language_code;
    let text;

    if(ctx.update.message.chat.type == 'private') {
        text = (''
            + `<b>${translateText({language, text: 'List of individual commands'})}:</b>\n`
            + '\n'
            + `${translateText({language, text: '/list_parameters: List parameters'})}.\n`
            + '\n'
            + `${translateText({language, text: '/delete_commands: Enable to not keep chat command history (delete message permission required)'})}.\n`
            + '\n'
            + `${translateText({language, text: '/change_faction: Change faction'})}.\n`
            + '\n'
            + '\n'
            + `<b>${translateText({language, text: 'For more commands, add me to a group and type /help'})}.</b>`
        );
    } else if(ctx.update.message.chat.type == `supergroup`) {
        text = (''
            + `<b>${translateText({language, text: 'Group command list'})}:</b>\n`
            + '\n'
            + `${translateText({language, text: '/list_parameters: List parameters'})}.\n`
            + '\n'
            + `${translateText({language, text: '/delete_commands: Enable to not keep chat command history (delete message permission required)'})}.\n`
            + '\n'
            + `${translateText({language, text: '/change_votes: Changes the amount of votes needed to publish'})}.\n`
            + '\n'
            + `${translateText({language, text: "/link_channel: Use to link the group to a channel. You can also use Telegram's native link"})}.\n`
            + '\n'
            + `${translateText({language, text: '/new_post: Reply to a message with this command to put it to a vote'})}.\n`
            + '\n'
            + '\n'
            + `<b>${translateText({language, text: 'For more commands send me /help in private'})}.</b>`
        );
    }

    replyWithHTML({ctx, text});
}