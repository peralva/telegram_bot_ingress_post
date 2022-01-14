const translateText = require("../../../utils/translateText");
const getParameterConfigured = require("../utils/getParameterConfigured");
const getUser = require("../utils/getUser");
const recordData = require("../utils/recordData");

module.exports = async ctx => {
    let erroDelete = '';

    let token = ctx.tg.token;

    if(typeof(ctx.update.channel_post.text) != 'string') {
        return;
    }

    let text = ctx.update.channel_post.text.trim().split(' ')

    if(text[0] != '/link_group') {
        return;
    }

    await ctx.deleteMessage(ctx.update.channel_post.message_id).catch(() => {
        erroDelete = ` However, I could not clear the channel command message.`;
    });

    if(text.length < 2) {
        return;
    }

    let group = global.bots[token].groups.find(element => true
        && typeof(element.parameters.link_channel) == 'object'
        && element.parameters.link_channel.token == text[1]
    );

    if(typeof(group) != 'object') {
        return;
    }

    let data = getUser({token, id: group.parameters.link_channel.user}).data;

    ctx.telegram.sendMessage(
        group.data.id,
        (''
            + `${translateText({
                language: data.language_code,
                text: '<b>{{channel}}</b> channel linked',
                variables: {
                    channel: ctx.update.channel_post.chat.title
                }
            })}.${erroDelete}`
            + getParameterConfigured({data})
        ),
        {parse_mode: 'HTML'}
    );

    group.parameters.channels.splice(
        0,
        0,
        {
            value: ctx.update.channel_post.chat.id,
            user: group.parameters.link_channel.user,
            date: ctx.update.channel_post.date
        }
    );

    delete(group.parameters.link_channel);

    recordData({token});
}