const WIDTH = 640;
const HEIGHT = 1136;

export function elementRect(width, height, left, top) {
    return `
        width:${width/WIDTH*100}%;
        height:${height/HEIGHT*100}%;
        left:${left/WIDTH*100}%;
        top:${top/HEIGHT*100}%;
    `
}