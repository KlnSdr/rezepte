"use strict";
function openRecipeView() {
    const container = document.createElement('div');
    const ul = document.createElement('ul');
    ul.id = 'ulZutaten';
    container.appendChild(ul);
    container.appendChild(document.createElement('hr'));
    const pInstructions = document.createElement('p');
    pInstructions.id = 'pInstructions';
    container.appendChild(pInstructions);
    return container;
}
function populateRecipeView(ingredients, instructions) {
    ingredients.forEach((zutat) => {
        var _a;
        const li = document.createElement('li');
        li.innerText = `${zutat.name}: ${zutat.amount} ${zutat.unit}`;
        (_a = document.getElementById('ulZutaten')) === null || _a === void 0 ? void 0 : _a.appendChild(li);
    });
    document.getElementById('pInstructions').innerText = instructions;
}
