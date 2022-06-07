"use strict";
class card {
    constructor(_text, _id, _customHandler = () => { }, _hasCH = false) {
        this.technicallyDead = false;
        this.text = _text;
        this.id = _id;
        this.customHandler = _customHandler;
        this.hasCH = _hasCH;
        this.createElement();
    }
    createElement() {
        this.element = document.createElement('div');
        this.element.classList.add('card');
        this.element.addEventListener('click', () => {
            if (this.hasCH) {
                this.customHandler();
            }
            else {
                this.openRecipe();
            }
        });
        this.element.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            // vibrate if possible
            navigator.vibrate(75);
            this.showDeleteButton();
        });
        const title = document.createElement('h1');
        title.innerText = this.text;
        this.element.appendChild(title);
    }
    openRecipe() {
        var _a;
        if (this.technicallyDead) {
            return;
        }
        const state = getState();
        console.log(state[this.id]);
        setViewportContent(openRecipeView);
        const headline = document.createElement('input');
        headline.classList.add('ganzSchwierigerWorkaroundWeißIchNicht');
        headline.placeholder = state[this.id].name;
        headline.setAttribute('disabled', '');
        (_a = document.getElementById('topNotchContent')) === null || _a === void 0 ? void 0 : _a.appendChild(headline);
        populateRecipeView(state[this.id].ingredients, state[this.id].instructions);
        document.getElementById('anzahlPersonen').addEventListener('input', () => {
            document.getElementById('ulZutaten').innerHTML = '';
            populateRecipeView(state[this.id].ingredients, state[this.id].instructions);
        });
    }
    render(parent) {
        parent.appendChild(this.element);
    }
    showDeleteButton() {
        var _a;
        if (this.element.children.length < 2) {
            const bttnDelete = document.createElement('button');
            bttnDelete.classList.add('fas', 'fa-trash');
            bttnDelete.addEventListener('click', () => {
                const state = getState();
                delete state[this.id];
                setState(state);
                this.technicallyDead = true;
                openListview();
            });
            (_a = this.element) === null || _a === void 0 ? void 0 : _a.appendChild(bttnDelete);
        }
    }
}
