module.exports = parameters => {
    if(Object.prototype.toString.call(parameters) == '[object Object]') {
        var {
            faction,
            withoutFaction = true
        } = parameters;
    }

    let data = {
        enlightened: `\u{1F7E2}`,
        resistance: `\u{1F535}`
    };

    if(faction) {
        return(data[faction]);
    } else {
        if(withoutFaction) {
            return(`\u{26AA}`);
        } else {
            return(``);
        }
    }
}