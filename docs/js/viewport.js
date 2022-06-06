"use strict";
function setViewportContent(renderFunction) {
    document.getElementById('viewport').innerHTML = '';
    document.getElementById('topNotchContent').innerHTML = '';
    document.getElementById('viewport').appendChild(renderFunction());
}
