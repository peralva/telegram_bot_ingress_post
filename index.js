const fs = require('fs');
const deleteCommands = require('./utils/deleteCommands');

const index = bot => {
    global[bot.telegram.token] = {};

    if(fs.existsSync('./data.json')) {
        global[bot.telegram.token] = JSON.parse(fs.readFileSync('./data.json'));
    } else {
        global[bot.telegram.token] = {
            users: {},
            groups: {}
        };
    }

    // require('./utils/setCommands')({telegram: bot.telegram});

    bot.start(                      ctx => {require('./commands/start'          )(ctx); deleteCommands({ctx});  });

    bot.help(                       ctx => {require('./commands/help'           )(ctx); deleteCommands({ctx});  });
    bot.command('ajuda',            ctx => {require('./commands/help'           )(ctx); deleteCommands({ctx});  });

    bot.command('change_faction',   ctx => {require('./commands/change_faction' )(ctx); deleteCommands({ctx});  });
    bot.command('alterar_faccao',   ctx => {require('./commands/change_faction' )(ctx); deleteCommands({ctx});  });

    bot.command('change_votes',     ctx => {require('./commands/change_votes'   )(ctx); deleteCommands({ctx});  });
    bot.command('alterar_votos',    ctx => {require('./commands/change_votes'   )(ctx); deleteCommands({ctx});  });

    bot.command('delete_commands',  ctx => {require('./commands/delete_commands')(ctx);                         });
    bot.command('apagar_comandos',  ctx => {require('./commands/delete_commands')(ctx);                         });

    bot.command('new_post',         ctx => {require('./commands/new_post'       )(ctx); deleteCommands({ctx});  });
    bot.command('novo_post',        ctx => {require('./commands/new_post'       )(ctx); deleteCommands({ctx});  });

    bot.on('callback_query', require('./on/callback_query'));
}

module.exports = index;

if(process.env.NODE_ENV == 'developer') {
    const { Telegraf } = require('telegraf');

    let token = process.cwd();
    token = token.substring(token.length, token.length - 45).replace('_', ':');

    const bot = new Telegraf(token);

    index(bot);

    bot.launch();
    console.log('Bot launched.');
}