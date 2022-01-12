const translateText = require("../../../utils/translateText");
const getUser = require("./getUser");

module.exports = parameters => {
    if(Object.prototype.toString.call(parameters) == '[object Object]') {
        var {
            language,
            post,
            token
        } = parameters;
    }

    let user = getUser({token, id: post.author})

    let text = `${translateText({language, text: 'Author'})}: `;

    if(typeof(user.parameters.faction) == 'string') {
        if(user.parameters.faction == 'enlightened') {
            text += '\u{1F7E2} ';
        } else if(user.parameters.faction == 'resistance') {
            text += '\u{1F535} ';
        }
    }

    text += `<b>${user.data.first_name}</b>`;

    for(let i = 0; i < post.votes.length; i++) {
        let faction = getUser({token, id: post.votes[i]}).parameters.faction;

        if(i == 0) {
            text += (''
                + '\n'
                + `\n<b>${translateText({language, text: 'Reviewers'})}:</b>`
            );
        }

        text += `\n`;

        if(typeof(faction) == 'string') {
            if(faction == 'enlightened') {
                text += '\u{1F7E2} ';
            } else if(faction == 'resistance') {
                text += '\u{1F535} ';
            }
        } else {
            text += '\u{26AA} ';
        }

        text += `<b>${i + 1}</b> - <a href="tg://user?id=${post.votes[i]}">${global.bots[token].users[post.votes[i]].data.first_name}</a>`;
    }

    return({
        text,
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: translateText({language, text: 'Vote / Remove Vote'}),
                        callback_data: '{"vote": true}'
                    }
                ]
            ]
        }
    });
}