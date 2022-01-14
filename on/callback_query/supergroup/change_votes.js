const translateText = require('../../../../../utils/translateText');
const getGroup = require('../../../utils/getGroup');
const getMessageChangeVotes = require('../../../utils/getMessageChangeVotes');
const recordData = require('../../../utils/recordData');
const setUserData = require('../../../utils/setUserData');

module.exports = async ctx => {
    let language = ctx.update.callback_query.from.language_code;
    let token = ctx.tg.token;

    let isAdministrator;

    await ctx.getChatAdministrators().then(result => {
        if(result.findIndex(element => element.user.id == ctx.update.callback_query.from.id) > -1) {
            isAdministrator = true;
        }
    });

    if(!isAdministrator) {
        ctx.answerCbQuery(
            `${translateText({language, text: 'Only administrators can change this parameter. If you are an administrator, you need to uncheck the anonymous option so that I can identify you'})}.`,
            {show_alert: true}
        );

        return;
    }

    let {enlightened, resistance, save}  = ctx.update.callback_query.data;

    if(save) {
        let votes = getGroup({token, id: ctx.update.callback_query.message.chat.id}).parameters.votes;

        if(false
            || votes.length == 0
            || votes[0].value.enlightened != enlightened
            || votes[0].value.resistance != resistance
        ) {
            setUserData({token, data: ctx.update.callback_query.from});

            votes.splice(
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
                + `<b>${translateText({language, text: 'Number of votes changed'})}.</b>\n`
                    + '\n'
                    + `\u{1F7E2} ${translateText({language, text: 'Enlightened'})}: <b>${enlightened}</b>\n`
                    + `\u{1F535} ${translateText({language, text: 'Resistance'})}: <b>${resistance}</b>`
                ),
                {parse_mode: 'HTML'}
            );
    
            recordData({token});
        } else {
            ctx.editMessageText(
                (''
                    + `<b>${translateText({language, text: 'Without changes. current data'})}:</b>\n`
                    + '\n'
                    + `\u{1F7E2} ${translateText({language, text: 'Enlightened'})}: <b>${enlightened}</b>\n`
                    + `\u{1F535} ${translateText({language, text: 'Resistance'})}: <b>${resistance}</b>`
                ),
                {parse_mode: 'HTML'}
            );
        }
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
}