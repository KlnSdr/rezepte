function openRecipeView(): HTMLElement {
    const container: HTMLDivElement = document.createElement('div');

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
            li.innerText = `${zutat.name}: ${zutat.amount} ${zutat.unit}`;
            document.getElementById('ulZutaten')?.appendChild(li);
        }
    );

    document.getElementById('pInstructions')!.innerText = instructions;
}
