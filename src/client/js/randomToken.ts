function generateToken(len: number = 8): string {
    const min: number = 33; // !
    const max: number = 126; // ~

    return String.fromCharCode(
        ...Array.from(Array(len)).map(() => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        })
    );
}
