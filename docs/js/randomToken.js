"use strict";
function generateToken(len = 8) {
    const min = 33; // !
    const max = 126; // ~
    return String.fromCharCode(...Array.from(Array(len)).map(() => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }));
}
