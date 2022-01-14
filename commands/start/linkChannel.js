const translateText = require("../../../../utils/translateText");
const getGroup = require("../../utils/getGroup");
const replyWithHTML = require("../../utils/replyWithHTML");
const generateToken = require("../../utils/generateToken");
const recordData = require("../../utils/recordData");

module.exports = async parameters => {
    if(Object.prototype.toString.call(parameters) == '[object Object]') {
        var {
            ctx,
            startPayload
        } = parameters;
    }

    let language = ctx.update.message.from.language_code;
    let token = ctx.tg.token;
    let group = getGroup({token, id: startPayload});

    let isAdministrator;

    await ctx.telegram.getChatAdministrators(startPayload).then(result => {
        if(result.findIndex(element => element.user.id == ctx.update.message.from.id) > -1) {
            isAdministrator = true;
        }
    });

    if(!isAdministrator) {
        replyWithHTML({
            ctx,
            text: (''
                + `${translateText({language, text: "Group"})}: <b>${group.data.title}</b>\n`
                + '\n'
                + `${translateText({language, text: 'Only administrators can change this parameter. If you are an administrator, you need to uncheck the anonymous option so that I can identify you'})}.
            `)
        });

        return;
    }

    group.parameters.link_channel = {
        token: generateToken({numberCharacters: 40}),
        user: ctx.update.message.from.id
    };

    replyWithHTML({ctx, text: `/link_group ${group.parameters.link_channel.token}`}).then(result =>
        ctx.replyWithHTML(
            (''
                + `${translateText({language, text: "Group"})}: <b>${group.data.title}</b>\n`
                + '\n'
                + `${translateText({language, text: "Add me to the channel and then forward this message that I'm replying to the channel. If you give me permission to delete channel messages, I will delete the forwarded message immediately. If you prefer, you can delete the message as soon as you forward it and you can also forward it silently, unchecking the bell, so subscribers don't receive the notification"})}.`
            ),
            {reply_to_message_id: result.message_id}
        )
    );

    recordData({token});
}