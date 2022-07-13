const canvas = document.querySelector("canvas")
const [w, h] = [400, 400]
canvas.width = w
canvas.style.width = w
canvas.height = h
canvas.style.height = h
const ctx = canvas.getContext('2d')

const map = (num, origMin, origMax, targMin, targMax) => {
    const origRange = origMax - origMin
    const targRange = targMax - targMin
    return targMin + targRange * (num - origMin) / origRange
}

const iterations = 100 //Math.floor(Math.random() * 100)
let target = 16 //Math.floor(Math.random() * 1024)

const xPixel = (x, y) => {
    let a = map(x, 0, w, nav.position.x - 2/nav.currentZoom, nav.position.x + 2/nav.currentZoom)
    let b = map(y, 0, h, nav.position.y -2/nav.currentZoom, nav.position.y + 2/nav.currentZoom)
    const [hue, bright] = buildSet(0, a, b, a, b)
    ctx.fillStyle = `hsl(${hue}, 87%, ${bright ? 50 : 0}%)`
    ctx.fillRect(x, y, 1, 1)
    if (x < w) xPixel(++x, y)
}

const yPixel = y => {
    xPixel(0, y)
    if (y < h) yPixel(++y)
}

const nav = {
    currentZoom: 1,
    step: 0.1,
    ratio: 0.1,
    position: {
        x:0, y:0
    },    
    updatePosition: (moveX, moveY) => {
        nav.position.x += moveX / nav.currentZoom
        nav.position.y += moveY / nav.currentZoom
        yPixel(0)
    },    
    updateZoom: zoom => {
        nav.currentZoom += (nav.step + zoom)
        if (nav.currentZoom / nav.step > 20) nav.step *= 2
        else if (nav.current / nav.step < 5) nav.step /= 2
        target += nav.step
        yPixel(0)
    }    
}    

const buildSet = (n, a, b, realNum, imagNum) => {
    realNum = realNum * realNum - imagNum * imagNum
    imagNum = 2 * realNum * imagNum
    if(Math.abs(realNum + imagNum) > target) {
        return [map(n, 0, iterations, 0, 255), true]
    }
    if (n < iterations) {
        return buildSet(++n, a, b, realNum + a, imagNum + b)
    }
    return [0, false]
}

yPixel(0)

const navigate = e => {
    const k = e.key
    if (k === '=' || k === '+') {
        nav.updateZoom(1) 
    } else if(k === '-' ||k === '_') {
        nav.updateZoom(-1) 
    }
    if (k === 'ArrowLeft') {
        nav.updatePosition(-1, 0)
    } else if (k === 'ArrowRight') {
        nav.updatePosition(1, 0)
    }
    if (k === 'ArrowUp') {
        nav.updatePosition(0, -1)
    } else if (k === 'ArrowDown') {
        nav.updatePosition(0, 1)
    }
    yPixel(0)
}

window.addEventListener('keydown', navigate)