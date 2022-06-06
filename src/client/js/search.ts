function search(searchTerm: string) {
    (Array.from(
        document.getElementById('viewport')!.children[0]!.children
    ) as HTMLDivElement[]).forEach((child: HTMLDivElement) => {
        if (child.innerText.includes(searchTerm)) {
            child.classList.remove('ghost');
        } else {
            child.classList.add('ghost');
        }
    });
}
