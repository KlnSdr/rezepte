"use strict";
function search(searchTerm) {
    Array.from(document.getElementById('viewport').children[0].children).forEach((child) => {
        if (child.innerText.includes(searchTerm)) {
            child.classList.remove('ghost');
        }
        else {
            child.classList.add('ghost');
        }
    });
}
