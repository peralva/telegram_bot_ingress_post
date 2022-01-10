const fs = require('fs');

module.exports = parameters => {
    if(Object.prototype.toString.call(parameters) == '[object Object]') {
        var {
            token
        } = parameters;
    }

    let date = new Date();

    let year = String(date.getFullYear());
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if(month < 10) {
        month = `0${month}`;
    } else {
        month = String(month);
    }

    if(day < 10) {
        day = `0${day}`;
    } else {
        day = String(day);
    }

    const pathData = `./data.json`;
    const pathBackupDirectoryData = `../../../backups/telegram_bots/bots/${token.replace(':', '_')}`;
    const backupFileData = `data - ${year}-${month}-${day}.json`;

    if(!fs.existsSync(pathBackupDirectoryData)) {
        fs.mkdirSync(pathBackupDirectoryData, {recursive: true});
    }

    if(fs.existsSync(pathData)) {
        fs.copyFileSync(pathData, `${pathBackupDirectoryData}/${backupFileData}`);
    }

    fs.writeFileSync(pathData, JSON.stringify(global[token], null, '    '));
}