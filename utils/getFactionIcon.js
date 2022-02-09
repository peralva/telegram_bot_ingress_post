module.exports = parameters => {
    if(Object.prototype.toString.call(parameters) == '[object Object]') {
        var {
            faction
        } = parameters;
    }

    let data = {
        enlightened: `\u{1F7E2}`,
        resistance: `\u{1F535}`
    };

    if(faction) {
        return(data[faction]);
    } else {
        return(`\u{26AA}`);
    }
}