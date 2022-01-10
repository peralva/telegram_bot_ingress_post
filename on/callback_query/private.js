const capitalize = require('../../../../utils/capitalize');
const translateText = require('../../../../utils/translateText');
const recordData = require('../../utils/recordData');
const getUser = require('../../utils/getUser');

module.exports = ctx => {
    let language = ctx.update.callback_query.from.language_code;
    let token = ctx.tg.token;
    let user = getUser({token, id: ctx.update.callback_query.from.id});

    user.parameters.faction = ctx.update.callback_query.data;

    ctx.editMessageText(
        `${translateText({language, text: 'Faction changed to'})} <b>${capitalize({text: translateText({language, text: user.parameters.faction})})}</b>.`,
        {parse_mode: 'HTML'}
    );

    recordData({token});
}