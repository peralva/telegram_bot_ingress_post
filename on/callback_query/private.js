const capitalize = require('../../../../utils/capitalize');
const translateText = require('../../../../utils/translateText');
const recordData = require('../../utils/recordData');
const getUser = require('../../utils/getUser');
const getFactionIcon = require('../../utils/getFactionIcon');

module.exports = ctx => {
    let language = ctx.update.callback_query.from.language_code;
    let token = ctx.tg.token;
    let parameters = getUser({token, id: ctx.update.callback_query.from.id}).parameters;

    parameters.faction = ctx.update.callback_query.data;

    ctx.editMessageText(
        `${translateText({language, text: 'Faction changed to'})} ${getFactionIcon({faction: parameters.faction})}<b>${capitalize({text: translateText({language, text: parameters.faction})})}</b>.`,
        {parse_mode: 'HTML'}
    );

    recordData({token});
}