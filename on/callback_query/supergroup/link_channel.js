const recordData = require("../../../utils/recordData");
const setGroupData = require("../../../utils/setGroupData");

module.exports = ctx => {
    let token = ctx.tg.token;

    setGroupData({token, data: ctx.update.callback_query.message.chat});

    ctx.answerCbQuery(
        '',
        {
            url: `t.me/${ctx.botInfo.username}?start=linkChannel_${ctx.update.callback_query.message.chat.id}`
        }
    );

    recordData({token});
}