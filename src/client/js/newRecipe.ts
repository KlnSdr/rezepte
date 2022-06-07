const units: string[] = ['g', 'kg', 'Stück', 'EL', 'TL', 'Tasse', 'ml', 'l'];

function newRecipe() {
    setViewportContent(renderNewRecipe);

    const headline: HTMLInputElement = document.createElement('input');
    headline.classList.add('ganzSchwierigerWorkaroundWeißIchNicht');
    headline.placeholder = 'Neues Rezept';
    headline.setAttribute('disabled', '');
    document.getElementById('topNotchContent')?.appendChild(headline);
}

function renderNewRecipe(): HTMLDivElement {
    // TODO schöner mache, f.ex. edom?
    const container: HTMLDivElement = document.createElement('div');

    const headName: HTMLParagraphElement = document.createElement('p');
    headName.innerText = 'Name:';
    container.appendChild(headName);

    const inName: HTMLInputElement = document.createElement('input');
    inName.type = 'text';
    inName.id = 'recipeName';
    container.appendChild(inName);

    const headZuber: HTMLParagraphElement = document.createElement('p');
    headZuber.innerText = 'Zubereitung:';
    container.appendChild(headZuber);

    const taZuber: HTMLTextAreaElement = document.createElement('textarea');
    taZuber.rows = 5;
    taZuber.id = 'taInstructions';
    container.appendChild(taZuber);

    const headZutaten: HTMLParagraphElement = document.createElement('p');
    headZutaten.innerText = 'Zutaten:';
    container.appendChild(headZutaten);

    const tableZutatens: HTMLTableElement = document.createElement('table');
    tableZutatens.id = 'tableZutatens';
    container.appendChild(tableZutatens);

    const trHeadZutaten: HTMLTableRowElement = document.createElement('tr');
    tableZutatens.appendChild(trHeadZutaten);
    ['Name', 'Menge', 'Einheit'].forEach((column: string) => {
        const td: HTMLTableCellElement = document.createElement('td');
        td.innerText = column;
        trHeadZutaten.appendChild(td);
    });

    newZutat(tableZutatens);

    const bttnNewZutat: HTMLButtonElement = document.createElement('button');
    bttnNewZutat.classList.add('fas', 'fa-plus');
    bttnNewZutat.addEventListener('click', () => {
        newZutat();
    });
    container.appendChild(bttnNewZutat);

    const tablePersonen: HTMLTableElement = document.createElement('table');
    container.appendChild(tablePersonen);

    const trPersonen: HTMLTableRowElement = document.createElement('tr');
    tablePersonen.appendChild(trPersonen);

    const tdInputPersonen: HTMLTableCellElement = document.createElement('td');
    trPersonen.appendChild(tdInputPersonen);

    const inputPersonen: HTMLInputElement = document.createElement('input');
    inputPersonen.type = 'number';
    inputPersonen.value = '4';
    inputPersonen.id = 'anzahlPersonen';
    tdInputPersonen.appendChild(inputPersonen);

    const tdPersonenText: HTMLTableCellElement = document.createElement('td');
    tdPersonenText.innerText = 'Personen';
    trPersonen.appendChild(tdPersonenText);

    trPersonen.appendChild(document.createElement('td'));

    const tableSaveAbort: HTMLTableElement = document.createElement('table');
    container.appendChild(tableSaveAbort);

    const trSaveAbort: HTMLTableRowElement = document.createElement('tr');
    tableSaveAbort.appendChild(trSaveAbort);

    const tdAbort: HTMLTableCellElement = document.createElement('td');
    trSaveAbort.appendChild(tdAbort);

    const bttnAbort: HTMLButtonElement = document.createElement('button');
    bttnAbort.classList.add('fas', 'fa-times');
    bttnAbort.addEventListener('click', () => {
        openListview();
    });
    tdAbort.appendChild(bttnAbort);

    const tdSave: HTMLTableCellElement = document.createElement('td');
    trSaveAbort.appendChild(tdSave);

    const bttnSave: HTMLButtonElement = document.createElement('button');
    bttnSave.classList.add('fas', 'fa-save');
    bttnSave.addEventListener('click', () => {
        saveRecipe();
    });
    tdSave.appendChild(bttnSave);

    return container;
}

function newZutat(parent: HTMLTableElement | undefined = undefined) {
    const tr: HTMLTableRowElement = document.createElement('tr');

    const tdName: HTMLTableCellElement = document.createElement('td');
    const inputName: HTMLInputElement = document.createElement('input');
    inputName.classList.add('zutatName');
    tdName.appendChild(inputName);
    tr.appendChild(tdName);

    const tdAmount: HTMLTableCellElement = document.createElement('td');
    const inputAmount: HTMLInputElement = document.createElement('input');
    inputAmount.type = 'number';
    inputAmount.step = '.01';
    inputAmount.classList.add('zutatMenge');
    tdAmount.appendChild(inputAmount);
    tr.appendChild(tdAmount);

    const tdUnit: HTMLTableCellElement = document.createElement('td');
    const selectUnit: HTMLSelectElement = document.createElement('select');
    units.forEach((unit: string) => {
        const option: HTMLOptionElement = document.createElement('option');
        option.value = units.indexOf(unit).toString();
        option.innerText = unit;
        selectUnit.appendChild(option);
    });
    selectUnit.classList.add('zutatEinheit');
    tdUnit.appendChild(selectUnit);
    tr.appendChild(tdUnit);

    if (parent !== undefined) {
        parent.appendChild(tr);
    } else {
        document.getElementById('tableZutatens')?.appendChild(tr);
    }
}

function saveRecipe(isUpdate: boolean = false, id: string = '') {
    console.log('saving...');

    const recipe: {
        [key: string]:
            | string
            | { name: string; amount: number; unit: string }[];
    } = {
        name: (document.getElementById('recipeName') as HTMLInputElement).value,
        instructions: (document.getElementById(
            'taInstructions'
        ) as HTMLTextAreaElement).value,
        ingredients: getIngredients(),
    };

    const state = getState();
    if (!isUpdate) {
        id = (() => {
            let doesExist = true;
            let id: string = '';
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

function getIngredients(): { name: string; amount: number; unit: string }[] {
    let ingredients: { name: string; amount: number; unit: string }[] = [];

    const anzahlPersonen: number = parseInt(
        (document.getElementById('anzahlPersonen') as HTMLInputElement).value
    );

    const names: HTMLInputElement[] = Array.from(
        document.getElementsByClassName('zutatName')
    ) as HTMLInputElement[];
    const amounts: HTMLInputElement[] = Array.from(
        document.getElementsByClassName('zutatMenge')
    ) as HTMLInputElement[];
    const _units: HTMLInputElement[] = Array.from(
        document.getElementsByClassName('zutatEinheit')
    ) as HTMLInputElement[];

    for (let i = 0; i < names.length; i++) {
        ingredients.push({
            name: names[i].value,
            amount: parseInt(amounts[i].value) / anzahlPersonen,
            unit: units[parseInt(_units[i].value)],
        });
    }

    return ingredients;
}
