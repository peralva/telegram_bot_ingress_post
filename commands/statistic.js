const translateText = require("../../../utils/translateText");
const getGroup = require("../utils/getGroup");
const getUser = require("../utils/getUser");
const getUserName = require("../utils/getUserName");
const replyWithHTML = require("../utils/replyWithHTML");

module.exports = ctx => {
    let language = ctx.update.message.from.language_code;

    if(ctx.update.message.chat.type != 'supergroup') {
        replyWithHTML({ctx, text: `${translateText({language, text: 'This command can only be used in supergroup'})}.`});
        return;
    }

    let token = ctx.tg.token;

    let messages = getGroup({token, id: ctx.update.message.chat.id}).messages.filter(element => element.posted);

    if(messages.length == 0) {
        replyWithHTML({ctx, text: `<b>${translateText({language, text: `No messages posted`})}.</b>`});
        return;
    }

    let authors = [];
    let reviewers = [];

    for(let i = 0; i < messages.length; i++) {
        let author = authors.find(element => element.id == messages[i].author);

        if(author) {
            author.count++;
        } else {
            authors.push({
                id: messages[i].author,
                count: 1
            });
        }

        for(let j = 0; j < messages[i].votes.length; j++) {
            let reviewer = reviewers.find(element => element.id == messages[i].votes[j]);

            if(reviewer) {
                reviewer.count++;
            } else {
                reviewers.push({
                    id: messages[i].votes[j],
                    count: 1
                });
            }
        }
    }

    authors.sort((a, b) => {
        if(a.count < b.count) {
            return(1);
        } else if(a.count > b.count) {
            return(-1);
        } else {
            return(0);
        }
    });

    reviewers.sort((a, b) => {
        if(a.count < b.count) {
            return(1);
        } else if(a.count > b.count) {
            return(-1);
        } else {
            return(0);
        }
    });

    let text = (``
        + `<b>${translateText({language, text: `Total messages posted`})}:</b> ${messages.length}\n`
        + `\n`
        + `<b>${translateText({language, text: `Authors`})}:</b>`
    );

    for(let i = 0; i < authors.length; i++) {
        text += '\n';

        for(let j = String(authors[i].count).length; j < String(messages.length).length; j++) {
            text += `0`;
        }

        text += `${authors[i].count} (`;

        for(let j = (authors[i].count / messages.length * 100).toFixed(0).length; j < 3; j++) {
            text += `0`;
        }

        text += `${(authors[i].count / messages.length * 100).toFixed(0)}%) ${getUserName({data: getUser({token, id: authors[i].id}).data})}`;
    }

    text += (``
        + `\n\n`
        + `<b>${translateText({language, text: `Reviewers`})}:</b>`
    );

    for(let i = 0; i < reviewers.length; i++) {
        text += '\n';

        for(let j = String(reviewers[i].count).length; j < String(messages.length).length; j++) {
            text += `0`;
        }

        text += `${reviewers[i].count} (`;

        for(let j = (reviewers[i].count / messages.length * 100).toFixed(0).length; j < 3; j++) {
            text += `0`;
        }

        text += `${(reviewers[i].count / messages.length * 100).toFixed(0)}%) ${getUserName({data: getUser({token, id: reviewers[i].id}).data})}`;
    }

    replyWithHTML({ctx, text});
}