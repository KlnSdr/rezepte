function openListview() {
    setViewportContent(renderListview);
}

function renderListview(): HTMLDivElement {
    const container: HTMLDivElement = document.createElement('div');

    const searchBar: HTMLInputElement = document.createElement('input');
    searchBar.id = 'searchBar';
    searchBar.type = 'search';
    searchBar.placeholder = 'Suche...';
    searchBar.addEventListener('input', () => {
        search(searchBar.value);
    });
    document.getElementById('topNotchContent')!.appendChild(searchBar);

    const state = getState();

    /*
    for (let i = 0; i < 10; i++) {
        new card(i.toString()).render(container);
    }*/

    Object.keys(state).forEach((id: string) => {
        new card(state[id].name, id).render(container);
    });

    if (container.children.length === 0) {
        const tutCard: card = new card(
            'Erstelle dein erstes Rezept',
            '',
            () => {
                newRecipe();
            },
            true
        );
        tutCard.render(container);
    }

    return container;
}
