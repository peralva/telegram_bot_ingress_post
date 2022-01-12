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

    let text = `${translateText({language, text: 'Author'})}: <b>${user.data.first_name}</b>`;

    for(let i = 0; i < post.votes.length; i++) {
        if(i == 0) {
            text += (''
                + '\n'
                + `\n<b>${translateText({language, text: 'Reviewers'})}:</b>`
            );
        }

        text += `\n${i + 1} - <a href="tg://user?id=${post.votes[i]}">${global.bots[token].users[post.votes[i]].data.first_name}</a>`;
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