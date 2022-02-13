const fs = require('fs');
const deleteCommands = require('./utils/deleteCommands');

const fixDatabase = token => {
    global.bots[token].groups.forEach(element => element.messages.forEach(element => {
        if(element.id) {
            element.ids = {
                controller: element.id
            };

            delete(element.id);
        }
    }));

    require('./utils/recordData')({token});
}

const index = bot => {
    if(typeof(global.bots) != 'object') {
        global.bots = {};
    }

    if(fs.existsSync(`${__dirname}/data.json`)) {
        global.bots[bot.telegram.token] = require(`${__dirname}/data.json`);
    } else {
        global.bots[bot.telegram.token] = {};
    }

    // require('./utils/setCommands')({telegram: bot.telegram});
    // fixDatabase(bot.telegram.token);

    bot.start(                          ctx => {require('./commands/start'          )(ctx); deleteCommands({ctx});  });

    bot.help(                           ctx => {require('./commands/help'           )(ctx); deleteCommands({ctx});  });
    bot.command('ajuda',                ctx => {require('./commands/help'           )(ctx); deleteCommands({ctx});  });

    bot.command('change_faction',       ctx => {require('./commands/change_faction' )(ctx); deleteCommands({ctx});  });
    bot.command('alterar_faccao',       ctx => {require('./commands/change_faction' )(ctx); deleteCommands({ctx});  });

    bot.command('change_votes',         ctx => {require('./commands/change_votes'   )(ctx); deleteCommands({ctx});  });
    bot.command('alterar_votos',        ctx => {require('./commands/change_votes'   )(ctx); deleteCommands({ctx});  });

    bot.command('delete_commands',      ctx => {require('./commands/delete_commands')(ctx);                         });
    bot.command('apagar_comandos',      ctx => {require('./commands/delete_commands')(ctx);                         });

    bot.command('link_channel',         ctx => {require('./commands/link_channel'   )(ctx); deleteCommands({ctx});  });
    bot.command('vincular_canal',       ctx => {require('./commands/link_channel'   )(ctx); deleteCommands({ctx});  });

    bot.command('new_post',             ctx => {require('./commands/new_post'       )(ctx); deleteCommands({ctx});  });
    bot.command('novo_post',            ctx => {require('./commands/new_post'       )(ctx); deleteCommands({ctx});  });

    bot.command('list_parameters',      ctx => {require('./commands/list_parameters')(ctx); deleteCommands({ctx});  });
    bot.command('listar_parametros',    ctx => {require('./commands/list_parameters')(ctx); deleteCommands({ctx});  });

    bot.command('statistic',            ctx => {require('./commands/statistic'      )(ctx); deleteCommands({ctx});  });
    bot.command('estatistica',          ctx => {require('./commands/statistic'      )(ctx); deleteCommands({ctx});  });

    bot.on('callback_query',    require('./on/callback_query' ));
    bot.on('channel_post',      require('./on/channel_post'   ));
    bot.on('edited_message',    require('./on/edited_message' ));
}

module.exports = index;

if(process.env.NODE_ENV == 'developer') {
    const { Telegraf } = require('telegraf');

    let token = __dirname.substring(__dirname.lastIndexOf('\\') + 1).replace('_', ':');

    const bot = new Telegraf(token);

    index(bot);

    bot.launch();
    console.log('Bot launched.');
}