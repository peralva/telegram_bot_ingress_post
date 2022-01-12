const getGroup = require("../utils/getGroup");
const recordData = require("../utils/recordData");

module.exports = async ctx => {
    let erroDelete = '';

    let token = ctx.tg.token;

    let text = ctx.update.channel_post.text.trim().split(' ')

    if(true
        && text.length >= 2
        && text[0] == '/link_group'
        && typeof(global.bots[token].groups[text[1]]) == 'object'
    ) {
        await ctx.deleteMessage(ctx.update.channel_post.message_id).catch(() => {
            erroDelete = ` However, I could not clear the channel command message.`;
        });

        ctx.telegram.sendMessage(
            text[1],
            `<b>${ctx.update.channel_post.chat.title}</b> channel linked.${erroDelete}`,
            {parse_mode: 'HTML'}
        );

        let group = getGroup({token, id: text[1]});
        group.parameters.channels[0] = {
            value: ctx.update.channel_post.chat.id,
            date: ctx.update.channel_post.date
        };

        recordData({token});
    }
}