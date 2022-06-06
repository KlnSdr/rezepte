function getState() {
    return JSON.parse(localStorage.getItem('recipies') || '{}');
}

// TODO craft type
function setState(state: any) {
    localStorage.setItem('recipies', JSON.stringify(state));
}
