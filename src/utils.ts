export function fontSize(size: number) {
    let res = size / 100;
    let clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (!clientWidth) return size;
    let fontSize = 100 * (clientWidth / 1920);
    return res * fontSize;
}

export function getRandomHexColor() {
    return '#' + Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0').toUpperCase();
}