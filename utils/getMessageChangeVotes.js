const translateText = require("../../../utils/translateText");

module.exports = parameters => {
    if(Object.prototype.toString.call(parameters) == '[object Object]') {
        var {
            language,
            enlightened,
            resistance
        } = parameters;
    }

    let text = (''
        + `${translateText({language, text: 'For the vote not to consider the faction, inform the amount of votes in one of the factions leave the other with'})} 0.\n`
        + '\n'
        + `<b>${translateText({language, text: 'Current vote count'})}:</b>\n`
        + `\u{1F7E2} ${translateText({language, text: 'Enlightened'})}: <b>${enlightened}</b>\n`
        + `\u{1F535} ${translateText({language, text: 'Resistance'})}: <b>${resistance}</b>`
    );

    let votes = {
        enlightened: {
            '+': enlightened + 1,
        },
        resistance: {
            '+': resistance + 1,
        }
    };

    if(enlightened > 0) {
        votes.enlightened['-'] = enlightened - 1;
    } else {
        votes.enlightened['-'] = 0;
    }

    if(resistance > 0) {
        votes.resistance['-'] = resistance - 1;
    } else {
        votes.resistance['-'] = 0;
    }

    let reply_markup = {
        inline_keyboard: [
            [
                {
                    text: `\u{1F7E2} ${translateText({language, text: 'Enlightened'})} +`,
                    callback_data: JSON.stringify(
                        {
                            change_votes: {
                                enlightened: votes.enlightened['+'],
                                resistance
                            }
                        }
                    )
                }
            ],
            [
                {
                    text: `\u{1F535} ${translateText({language, text: 'Resistance'})} +`,
                    callback_data: JSON.stringify(
                        {
                            change_votes: {
                                enlightened,
                                resistance: votes.resistance['+']
                            }
                        }
                    )
                }
            ],
            [
                {
                    text: translateText({language, text: 'Save'}),
                    callback_data: JSON.stringify(
                        {
                            change_votes: {
                                enlightened,
                                resistance,
                                save: true
                            }
                        }
                    )
                }
            ]
        ]
    };

    if(enlightened > 0) {
        reply_markup.inline_keyboard[0].splice(0, 0, {
            text: `\u{1F7E2} ${translateText({language, text: 'Enlightened'})} -`,
            callback_data: JSON.stringify(
                {
                    change_votes: {
                        enlightened: votes.enlightened['-'],
                        resistance
                    }
                }
            )
        });
    }

    if(resistance > 0) {
        reply_markup.inline_keyboard[1].splice(0, 0, {
            text: `\u{1F535} ${translateText({language, text: 'Resistance'})} -`,
            callback_data: JSON.stringify(
                {
                    change_votes: {
                        enlightened,
                        resistance: votes.resistance['-']
                    }
                }
            )
        });
    }

    return({text, reply_markup});
}