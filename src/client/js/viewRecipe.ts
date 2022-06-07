function openRecipeView(): HTMLElement {
    const container: HTMLDivElement = document.createElement('div');

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

    const ul: HTMLUListElement = document.createElement('ul');
    ul.id = 'ulZutaten';
    container.appendChild(ul);

    container.appendChild(document.createElement('hr'));

    const pInstructions: HTMLParagraphElement = document.createElement('p');
    pInstructions.id = 'pInstructions';
    container.appendChild(pInstructions);

    return container;
}

function populateRecipeView(
    ingredients: { name: string; amount: number; unit: string }[],
    instructions: string
) {
    ingredients.forEach(
        (zutat: { name: string; amount: number; unit: string }) => {
            const li: HTMLLIElement = document.createElement('li');
            li.innerText = `${zutat.name}: ${
                zutat.amount *
                parseInt(
                    (document.getElementById(
                        'anzahlPersonen'
                    ) as HTMLInputElement).value
                )
            } ${zutat.unit}`;
            document.getElementById('ulZutaten')?.appendChild(li);
        }
    );

    document.getElementById('pInstructions')!.innerText = instructions;
}
