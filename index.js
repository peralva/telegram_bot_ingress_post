const fs = require('fs');
const deleteCommands = require('./utils/deleteCommands');

const index = bot => {
    if(typeof(global.bots) != 'object') {
        global.bots = {};
    }

    global.bots[bot.telegram.token] = {};

    if(fs.existsSync(`${__dirname}/data.json`)) {
        global.bots[bot.telegram.token] = require(`${__dirname}/data.json`);
    } else {
        global.bots[bot.telegram.token] = {};
    }

    // require('./utils/setCommands')({telegram: bot.telegram});

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

    bot.on('callback_query',    require('./on/callback_query' ));
    bot.on('channel_post',      require('./on/channel_post'   ));
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