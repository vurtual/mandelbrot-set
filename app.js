const canvas = document.querySelector("canvas")
const [w, h] = [window.innerWidth, window.innerHeight]
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

const iterations = Math.floor(Math.random() * 100)
const target = Math.floor(Math.random() * 1024)


const xPixel = (x, y) => {
    let a = map(x, 0, w, -2, 2)
    let b = map(y, 0, h, -2, 2)
    const [hue, bright] = buildSet(0, a, b, a, b)
    ctx.fillStyle = `hsl(${hue}, 87%, ${bright ? 50 : 0}%)`
    ctx.fillRect(x, y, 1, 1)
    if (x < w) xPixel(++x, y)
}

const yPixel = y => {
    xPixel(0, y)
    if (y < h) yPixel(++y)
}

const buildSet = (n, a, b, realNum, imagNum) => {
    realNum = realNum * realNum - imagNum * imagNum
    imagNum = 2 * realNum * imagNum
    if(Math.abs(realNum + imagNum) > 512) {
        return [map(n, 0, iterations, 0, 255), true]
    }
    if (n < iterations) {
        return buildSet(++n, a, b, realNum + a, imagNum + b)
    }
    return [0, false]
}

yPixel(0)
