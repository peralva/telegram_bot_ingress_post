const translateText = require("../../../utils/translateText");
const getUser = require("./getUser");

module.exports = parameters => {
    if(Object.prototype.toString.call(parameters) == '[object Object]') {
        var {
            token,
            language,
            message
        } = parameters;
    }

    let user = getUser({token, id: message.author});

    let text = `${translateText({language, text: 'Author'})}: `;

    if(typeof(user.parameters.faction) == 'string') {
        if(user.parameters.faction == 'enlightened') {
            text += '\u{1F7E2} ';
        } else if(user.parameters.faction == 'resistance') {
            text += '\u{1F535} ';
        }
    }

    text += `<b>${!user.data.is_bot ? `<a href="tg://user?id=${user.data.id}">${user.data.first_name}</a>` : translateText({language, text: "Anonymous"})}</b>`;

    for(let i = 0; i < message.votes.length; i++) {
        let user = getUser({token, id: message.votes[i]});

        if(i == 0) {
            text += (''
                + '\n'
                + `\n<b>${translateText({language, text: 'Reviewers'})}:</b>`
            );
        }

        text += `\n`;

        if(typeof(user.parameters.faction) == 'string') {
            if(user.parameters.faction == 'enlightened') {
                text += '\u{1F7E2} ';
            } else if(user.parameters.faction == 'resistance') {
                text += '\u{1F535} ';
            }
        } else {
            text += '\u{26AA} ';
        }

        text += `<b>${i + 1}</b> - ${!user.data.is_bot ? `<a href="tg://user?id=${user.data.id}">${user.data.first_name}</a>` : translateText({language, text: "Anonymous"})}`;
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