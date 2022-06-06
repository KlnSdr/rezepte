class card {
    private text: string;
    private id: string;
    private element: HTMLDivElement | undefined;
    private technicallyDead: boolean = false;

    private customHandler: () => void;
    private hasCH: boolean;

    constructor(
        _text: string,
        _id: string,
        _customHandler: () => void = () => {},
        _hasCH: boolean = false
    ) {
        this.text = _text;
        this.id = _id;

        this.customHandler = _customHandler;
        this.hasCH = _hasCH;

        this.createElement();
    }

    private createElement() {
        this.element = document.createElement('div');
        this.element.classList.add('card');

        this.element.addEventListener('click', () => {
            if (this.hasCH) {
                this.customHandler();
            } else {
                this.openRecipe();
            }
        });

        this.element.addEventListener('contextmenu', (e: MouseEvent) => {
            e.preventDefault();
            // vibrate if possible
            navigator.vibrate(75);

            this.showDeleteButton();
        });

        const title: HTMLHeadingElement = document.createElement('h1');
        title.innerText = this.text;

        this.element.appendChild(title);
    }

    openRecipe() {
        if (this.technicallyDead) {
            return;
        }
        const state = getState();

        console.log(state[this.id]);

        setViewportContent(openRecipeView);

        const headline: HTMLInputElement = document.createElement('input');
        headline.classList.add('ganzSchwierigerWorkaroundWeißIchNicht');
        headline.placeholder = state[this.id].name;
        headline.setAttribute('disabled', '');
        document.getElementById('topNotchContent')?.appendChild(headline);
        populateRecipeView(
            state[this.id].ingredients,
            state[this.id].instructions
        );
    }

    render(parent: HTMLElement) {
        parent.appendChild(this.element!);
    }

    private showDeleteButton() {
        if (this.element!.children.length < 2) {
            const bttnDelete: HTMLButtonElement = document.createElement(
                'button'
            );
            bttnDelete.classList.add('fas', 'fa-trash');

            bttnDelete.addEventListener('click', () => {
                const state = getState();
                delete state[this.id];
                setState(state);
                this.technicallyDead = true;
                openListview();
            });

            this.element?.appendChild(bttnDelete);
        }
    }
}
