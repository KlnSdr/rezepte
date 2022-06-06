"use strict";
function getState() {
    return JSON.parse(localStorage.getItem('recipies') || '{}');
}
// TODO craft type
function setState(state) {
    localStorage.setItem('recipies', JSON.stringify(state));
}
