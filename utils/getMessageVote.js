const translateText = require("../../../utils/translateText");
const getFactionIcon = require("./getFactionIcon");
const getUser = require("./getUser");
const getUserName = require("./getUserName");

module.exports = parameters => {
    if(Object.prototype.toString.call(parameters) == '[object Object]') {
        var {
            token,
            language,
            message
        } = parameters;
    }

    let user = getUser({token, id: message.author});

    let text = `${translateText({language, text: 'Author'})}: <b>${getUserName({data: user.data, lastName: true})}</b>`;

    for(let i = 0; i < message.votes.length; i++) {
        let user = getUser({token, id: message.votes[i]});

        if(i == 0) {
            text += (''
                + '\n'
                + `\n<b>${translateText({language, text: 'Reviewers'})}:</b>`
            );
        }

        text += `\n`;
        text += `${getFactionIcon({faction: user.parameters.faction})} <b>${i + 1}</b> - ${getUserName({data: user.data})}`;
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