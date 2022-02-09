const capitalize = require("../../../utils/capitalize");
const translateText = require("../../../utils/translateText");
const getChannel = require("../utils/getChannel");
const getFactionIcon = require("../utils/getFactionIcon");
const getUserName = require("../utils/getUserName");
const getGroup = require("../utils/getGroup");
const getUser = require("../utils/getUser");
const replyWithHTML = require("../utils/replyWithHTML");

module.exports = ctx => {
    let language = ctx.update.message.from.language_code;
    let token = ctx.tg.token;
    let id = ctx.update.message.chat.id;

    let parameters;
    let text = `<b>${translateText({language, text: `Current parameters`})}:</b>\n\n`;

    if(ctx.update.message.chat.type == 'private') {
        parameters = getUser({token, id}).parameters;

        text += (``
            + `<b>${translateText({language, text: `Delete commands`})}:</b> ${parameters.delete_commands ? translateText({language, text: `Enabled`}) : translateText({language, text: `Disabled`})}\n`
            + `<b>${translateText({language, text: `Faction`})}:</b> ${parameters.faction ? `${getFactionIcon({faction: parameters.faction})} ${capitalize({text: translateText({language, text: parameters.faction})})}` : translateText({language, text: `Not configured`})}`
        );
    } else if(ctx.update.message.chat.type == 'supergroup') {
        parameters = getGroup({token, id}).parameters;

        text += `<b>${translateText({language, text: `Delete commands`})}:</b> `;

        if(true
            && parameters.delete_commands.length > 0
            && parameters.delete_commands[0].value
        ) {
            text += translateText({language, text: `Enabled`});
        } else {
            text += translateText({language, text: `Disabled`});
        }

        text += '\n';

        if(parameters.delete_commands.length > 0) {
            let data = getUser({token, id: parameters.delete_commands[0].user}).data;

            text += (``
                + `${translateText({language, text: `Configured by`})} ${getUserName({data, lastName: true})}\n`
                + `${translateText({language, text: `Date`})}: ${new Date(parameters.delete_commands[0].date * 1000).toLocaleString()}\n`
            );
        }

        text += `\n<b>${translateText({language, text: `Number of votes`})}:</b>`;

        if(parameters.votes.length > 0) {
            for(let faction in parameters.votes[0].value) {
                text += `\n${capitalize({text: translateText({language, text: faction})})}: ${parameters.votes[0].value[faction]}`;
            }

            let data = getUser({token, id: parameters.votes[0].user}).data;

            text += (``
                + `\n${translateText({language, text: `Configured by`})} ${getUserName({data, lastName: true})}`
                + `\n${translateText({language, text: `Date`})}: ${new Date(parameters.votes[0].date).toLocaleString()}`
            );
        } else {
            text += (``
                + `\n${translateText({language, text: `Enlightened`})}: 0`
                + `\n${translateText({language, text: `Resistance`})}: 0`
            );
        }

        if(parameters.channels.length > 0) {
            let userData = getUser({token, id: parameters.channels[0].user}).data;
            let channelData  = getChannel({token, id: parameters.channels[0].value}).data;

            text += (``
                + `\n\n`
                + `<b>${translateText({language, text: `Linked channels`})}:</b> ${channelData.username ? `@${channelData.username}` : channelData.title}\n`
                + `${translateText({language, text: `Configured by`})} ${getUserName({data: userData, lastName: true})}\n`
                + `${translateText({language, text: `Date`})}: ${new Date(parameters.channels[0].date * 1000).toLocaleString()}`
            );
        }
    }

    replyWithHTML({
        ctx,
        text
    });
}