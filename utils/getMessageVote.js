const translateText = require("../../../utils/translateText");

module.exports = parameters => {
    if(Object.prototype.toString.call(parameters) == '[object Object]') {
        var {
            language,
            votes = [],
            token
        } = parameters;
    }

    let text = `${translateText({language, text: 'Number of votes'})}: <b>${votes.length}</b>`;

    for(let i = 0; i < votes.length; i++) {
        if(i == 0) {
            text += (''
                + '\n'
                + `\n<b>${translateText({language, text: 'Reviewers'})}:</b>`
            );
        }

        text += `\n<a href="tg://user?id=${votes[i]}">${global[token].users[votes[i]].data.first_name}</a>`;
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