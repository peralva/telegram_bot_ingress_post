module.exports = async parameters => {
    if(Object.prototype.toString.call(parameters) == '[object Object]') {
        var {
            telegram
        } = parameters;
    }

    await telegram.deleteMyCommands();

    telegram.setMyCommands(
        [
            {command: 'help', description: 'Help'}
        ],
        {language_code: 'en'}
    );

    telegram.setMyCommands(
        [
            {command: 'ajuda', description: 'Ajuda'}
        ],
        {language_code: 'pt'}
    );

    telegram.setMyCommands(
        [
            {command: 'help'            , description: 'Help'},
            {command: 'list_parameters' , description: 'List parameters'},
            {command: 'delete_commands' , description: 'Enable to not keep chat command history (delete message permission required)'},
            {command: 'change_faction'  , description: 'Change faction'}
        ],
        {language_code: 'en', scope: {type: 'all_private_chats'}}
    );

    telegram.setMyCommands(
        [
            {command: 'ajuda'               , description: 'Ajuda'},
            {command: 'listar_parametros'   , description: 'Listar par\u00e2metros'},
            {command: 'apagar_comandos'     , description: 'Ative para n\u00e3o manter o hist\u00f3rico de comandos do bate-papo (necess\u00e1rio permiss\u00e3o para apagar mensagens)'},
            {command: 'alterar_faccao'      , description: 'Alterar fac\u00e7\u00e3o'}
        ],
        {language_code: 'pt', scope: {type: 'all_private_chats'}}
    );

    telegram.setMyCommands(
        [
            {command: 'new_post'        , description: 'Reply to a message with this command to put it to a vote'},
            {command: 'help'            , description: 'Help'},
            {command: 'list_parameters' , description: 'List parameters'}
        ],
        {language_code: 'en', scope: {type: 'all_group_chats'}}
    );

    telegram.setMyCommands(
        [
            {command: 'novo_post'           , description: 'Responda uma mensagem com este comando para coloc\u00e1-la em vota\u00e7\u00e3o'},
            {command: 'ajuda'               , description: 'Ajuda'},
            {command: 'listar_parametros'   , description: 'Listar par\u00e2metros'}
        ],
        {language_code: 'pt', scope: {type: 'all_group_chats'}}
    );

    telegram.setMyCommands(
        [
            {command: 'new_post'        , description: 'Reply to a message with this command to put it to a vote'},
            {command: 'help'            , description: 'Help'},
            {command: 'list_parameters' , description: 'List parameters'},
            {command: 'delete_commands' , description: 'Enable to not keep chat command history (delete message permission required)'},
            {command: 'change_votes'    , description: 'Changes the amount of votes needed to publish'},
            {command: 'link_channel'    , description: "Use to link the group to a channel. You can also use Telegram's native link"},
            {command: 'statistic'       , description: "Display group statistics"}
        ],
        {language_code: 'en', scope: {type: 'all_chat_administrators'}}
    );

    telegram.setMyCommands(
        [
            {command: 'novo_post'           , description: 'Responda uma mensagem com este comando para coloc\u00e1-la em vota\u00e7\u00e3o'},
            {command: 'ajuda'               , description: 'Ajuda'},
            {command: 'listar_parametros'   , description: 'Listar par\u00e2metros'},
            {command: 'apagar_comandos'     , description: 'Ative para n\u00e3o manter o hist\u00f3rico de comandos do bate-papo (necess\u00e1rio permiss\u00e3o para apagar mensagens)'},
            {command: 'alterar_votos'       , description: 'Altera a quantidade de votos necessários para publicar'},
            {command: 'vincular_canal'      , description: 'Use para vincular o grupo a um canal. voc\u00ea tamb\u00e9m pode usar o v\u00ednculo nativo do Telegram'},
            {command: 'estatistica'         , description: "Exibe a estat\u00edstica do grupo"}
        ],
        {language_code: 'pt', scope: {type: 'all_chat_administrators'}}
    );
}