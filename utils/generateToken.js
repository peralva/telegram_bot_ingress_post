module.exports = parameters => {
    if(Object.prototype.toString.call(parameters) == '[object Object]') {
        var {
            numberCharacters
        } = parameters;
    }

    returnFunction = '';

    let previousCharacter = '';

    for(let i = 0; i < numberCharacters; i++) {
        let currentCharacter;

        if(Math.floor(Math.random() * (1 - 0 + 1)) + 0) {
            currentCharacter = String.fromCharCode(Math.floor(Math.random() * (122 - 97 + 1)) + 97);

            if(Math.floor(Math.random() * (1 - 0 + 1)) + 0) {
                currentCharacter = currentCharacter.toUpperCase();
            }
        } else {
            currentCharacter = String(Math.floor(Math.random() * (9 - 0 + 1)) + 0);
        }

        if(currentCharacter != previousCharacter) {
            previousCharacter = currentCharacter;

            returnFunction += currentCharacter;
        } else {
            i--;
        }
    }

    return(returnFunction);
}