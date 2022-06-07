"use strict";
function openRecipeView() {
    const container = document.createElement('div');
    const tablePersonen = document.createElement('table');
    container.appendChild(tablePersonen);
    const trPersonen = document.createElement('tr');
    tablePersonen.appendChild(trPersonen);
    const tdInputPersonen = document.createElement('td');
    trPersonen.appendChild(tdInputPersonen);
    const inputPersonen = document.createElement('input');
    inputPersonen.type = 'number';
    inputPersonen.value = '4';
    inputPersonen.id = 'anzahlPersonen';
    tdInputPersonen.appendChild(inputPersonen);
    const tdPersonenText = document.createElement('td');
    tdPersonenText.innerText = 'Personen';
    trPersonen.appendChild(tdPersonenText);
    trPersonen.appendChild(document.createElement('td'));
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
        li.innerText = `${zutat.name}: ${zutat.amount *
            parseInt(document.getElementById('anzahlPersonen').value)} ${zutat.unit}`;
        (_a = document.getElementById('ulZutaten')) === null || _a === void 0 ? void 0 : _a.appendChild(li);
    });
    document.getElementById('pInstructions').innerText = instructions;
}
