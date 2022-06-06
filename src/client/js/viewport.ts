function setViewportContent(renderFunction: () => HTMLElement) {
    document.getElementById('viewport')!.innerHTML = '';
    document.getElementById('topNotchContent')!.innerHTML = '';
    document.getElementById('viewport')!.appendChild(renderFunction());
}
