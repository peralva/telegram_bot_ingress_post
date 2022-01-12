const translateText = require('../../../../../utils/translateText');
const getGroup = require('../../../utils/getGroup');
const getMessageChangeVotes = require('../../../utils/getMessageChangeVotes');
const recordData = require('../../../utils/recordData');
const setUserData = require('../../../utils/setUserData');

module.exports = ctx => {
    let language = ctx.update.callback_query.from.language_code;
    let token = ctx.tg.token;

    let group = getGroup({token, id: ctx.update.callback_query.message.chat.id})

    ctx.getChatAdministrators().then(result => {
        if(result.findIndex(element => element.user.id == ctx.update.callback_query.from.id) == -1) {
            ctx.answerCbQuery(
                `${translateText({language, text: 'Only administrators can change this parameter. If you are an administrator, you need to uncheck the anonymous option so that I can identify you'})}.`,
                {show_alert: true}
            );

            return;
        }

        let {enlightened, resistance, save}  = ctx.update.callback_query.data;

        if(save) {
            setUserData({token, data: ctx.update.callback_query.from});

            group.parameters.votes.splice(
                0,
                0,
                {
                    value: {enlightened, resistance},
                    user: ctx.update.callback_query.from.id,
                    date: new Date()
                }
            );

            ctx.editMessageText(
                (''
                    + `${translateText({language, text: 'Number of votes changed'})}.\n`
                    + '\n'
                    + `\u{1F7E2} ${translateText({language, text: 'Enlightened'})}: <b>${enlightened}</b>\n`
                    + `\u{1F535} ${translateText({language, text: 'Resistance'})}: <b>${resistance}</b>`
                ),
                {parse_mode: 'HTML'}
            );

            recordData({token});
        } else {
            let {text, reply_markup} = getMessageChangeVotes({
                enlightened,
                resistance,
                language
            });

            ctx.editMessageText(
                text,
                {
                    parse_mode: 'HTML',
                    reply_markup
                }
            );

            ctx.answerCbQuery();
        }
    });
}