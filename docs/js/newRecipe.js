"use strict";
const units = ['g', 'kg', 'Stück', 'EL', 'TL', 'Tasse', 'ml', 'l'];
function newRecipe() {
    var _a;
    setViewportContent(renderNewRecipe);
    const headline = document.createElement('input');
    headline.classList.add('ganzSchwierigerWorkaroundWeißIchNicht');
    headline.placeholder = 'Neues Rezept';
    headline.setAttribute('disabled', '');
    (_a = document.getElementById('topNotchContent')) === null || _a === void 0 ? void 0 : _a.appendChild(headline);
}
function renderNewRecipe() {
    // TODO schöner mache, f.ex. edom?
    const container = document.createElement('div');
    const headName = document.createElement('p');
    headName.innerText = 'Name:';
    container.appendChild(headName);
    const inName = document.createElement('input');
    inName.type = 'text';
    inName.id = 'recipeName';
    container.appendChild(inName);
    const headZuber = document.createElement('p');
    headZuber.innerText = 'Zubereitung:';
    container.appendChild(headZuber);
    const taZuber = document.createElement('textarea');
    taZuber.rows = 5;
    taZuber.id = 'taInstructions';
    container.appendChild(taZuber);
    const headZutaten = document.createElement('p');
    headZutaten.innerText = 'Zutaten:';
    container.appendChild(headZutaten);
    const tableZutatens = document.createElement('table');
    tableZutatens.id = 'tableZutatens';
    container.appendChild(tableZutatens);
    const trHeadZutaten = document.createElement('tr');
    tableZutatens.appendChild(trHeadZutaten);
    ['Name', 'Menge', 'Einheit'].forEach((column) => {
        const td = document.createElement('td');
        td.innerText = column;
        trHeadZutaten.appendChild(td);
    });
    newZutat(tableZutatens);
    const bttnNewZutat = document.createElement('button');
    bttnNewZutat.classList.add('fas', 'fa-plus');
    bttnNewZutat.addEventListener('click', () => {
        newZutat();
    });
    container.appendChild(bttnNewZutat);
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
    const tableSaveAbort = document.createElement('table');
    container.appendChild(tableSaveAbort);
    const trSaveAbort = document.createElement('tr');
    tableSaveAbort.appendChild(trSaveAbort);
    const tdAbort = document.createElement('td');
    trSaveAbort.appendChild(tdAbort);
    const bttnAbort = document.createElement('button');
    bttnAbort.classList.add('fas', 'fa-times');
    bttnAbort.addEventListener('click', () => {
        openListview();
    });
    tdAbort.appendChild(bttnAbort);
    const tdSave = document.createElement('td');
    trSaveAbort.appendChild(tdSave);
    const bttnSave = document.createElement('button');
    bttnSave.classList.add('fas', 'fa-save');
    bttnSave.addEventListener('click', () => {
        saveRecipe();
    });
    tdSave.appendChild(bttnSave);
    return container;
}
function newZutat(parent = undefined) {
    var _a;
    const tr = document.createElement('tr');
    const tdName = document.createElement('td');
    const inputName = document.createElement('input');
    inputName.classList.add('zutatName');
    tdName.appendChild(inputName);
    tr.appendChild(tdName);
    const tdAmount = document.createElement('td');
    const inputAmount = document.createElement('input');
    inputAmount.type = 'number';
    inputAmount.step = '.01';
    inputAmount.classList.add('zutatMenge');
    tdAmount.appendChild(inputAmount);
    tr.appendChild(tdAmount);
    const tdUnit = document.createElement('td');
    const selectUnit = document.createElement('select');
    units.forEach((unit) => {
        const option = document.createElement('option');
        option.value = units.indexOf(unit).toString();
        option.innerText = unit;
        selectUnit.appendChild(option);
    });
    selectUnit.classList.add('zutatEinheit');
    tdUnit.appendChild(selectUnit);
    tr.appendChild(tdUnit);
    if (parent !== undefined) {
        parent.appendChild(tr);
    }
    else {
        (_a = document.getElementById('tableZutatens')) === null || _a === void 0 ? void 0 : _a.appendChild(tr);
    }
}
function saveRecipe(isUpdate = false, id = '') {
    console.log('saving...');
    const recipe = {
        name: document.getElementById('recipeName').value,
        instructions: document.getElementById('taInstructions').value,
        ingredients: getIngredients(),
    };
    const state = getState();
    if (!isUpdate) {
        id = (() => {
            let doesExist = true;
            let id = '';
            while (doesExist) {
                id = generateToken();
                doesExist = !(state[id] === undefined);
            }
            return id;
        })();
    }
    state[id] = recipe;
    setState(state);
    console.log(recipe);
    console.log('done!');
    openListview();
}
function getIngredients() {
    let ingredients = [];
    const anzahlPersonen = parseInt(document.getElementById('anzahlPersonen').value);
    const names = Array.from(document.getElementsByClassName('zutatName'));
    const amounts = Array.from(document.getElementsByClassName('zutatMenge'));
    const _units = Array.from(document.getElementsByClassName('zutatEinheit'));
    for (let i = 0; i < names.length; i++) {
        ingredients.push({
            name: names[i].value,
            amount: parseInt(amounts[i].value) / anzahlPersonen,
            unit: units[parseInt(_units[i].value)],
        });
    }
    return ingredients;
}
