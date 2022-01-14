const capitalize = require('../../../../utils/capitalize');
const translateText = require('../../../../utils/translateText');
const recordData = require('../../utils/recordData');
const getUser = require('../../utils/getUser');

module.exports = ctx => {
    let language = ctx.update.callback_query.from.language_code;
    let token = ctx.tg.token;
    let parameters = getUser({token, id: ctx.update.callback_query.from.id}).parameters;

    parameters.faction = ctx.update.callback_query.data;

    let text = `${translateText({language, text: 'Faction changed to'})} `;

    if(parameters.faction == 'enlightened') {
        text += '\u{1F7E2}';
    } else if(parameters.faction == 'resistance') {
        text += '\u{1F535}';
    }

    text += `<b>${capitalize({text: translateText({language, text: parameters.faction})})}</b>.`

    ctx.editMessageText(
        text,
        {parse_mode: 'HTML'}
    );

    recordData({token});
}