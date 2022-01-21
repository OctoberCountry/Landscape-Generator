const colorPalettes = [
    {
        Name: "LimeBlue",
        Theme: "Toxic",
        Colors: [[73, 72, 75], [110, 50, 70], [163, 41, 52], [182, 52, 42], [199, 72, 36]]
    },
    {
        Name: "Rosy",
        Theme: "Fire & Ice",
        Colors: [[349, 100, 90], [349, 100, 78], [349, 100, 65], [343, 79, 36], [343, 75, 20]]
    },
    {
        Name: "OrangePurple",
        Theme: "Toxic",
        Colors: [[37, 100, 50], [26, 100, 50], [273, 68, 59], [270, 73, 35], [271, 100, 14]]
    },
    {
        Name: "Blues",
        Theme: "Fire & Ice",
        Colors: [[190, 77, 88], [189, 75, 75], [190, 100, 42], [201, 100, 36], [239, 94, 19]]
    },
    {
        Name: "Oranges",
        Theme: "Fire & Ice",
        Colors: [[51, 55, 82], [40, 97, 64], [31, 100, 48], [358, 97, 31], [201, 100, 14], [240, 100, 27]]
    },
    {
        Name: "BoldRetro", //Salmon-violet-blue
        Theme: "Retro",
        Colors: [[22, 69, 69], [9, 66, 66], [304, 16, 33], [199, 35, 54], [214, 22, 48]]
    },
    {
        Name: "Retro Fall",
        Theme: "Retro",
        Colors: [[14, 41, 47], [24, 49, 55], [43, 67, 60], [85, 18, 53], [104, 15, 44]]
    },
    {
        Name: "Coffee", //White, light brown, dark brown, teal, cornflower
        Theme: "Retro",
        Colors: [[0, 0, 92], [26, 34, 72], [17, 36, 49], [177, 44, 40], [212, 31, 27]]
    },
    {
        Name: "RetroGreenPink",
        Theme: "Toxic",
        Colors: [[320, 51, 50], [331, 64, 64], [64, 56, 48], [80, 59, 42], [157, 56, 33]]
    },
    {
        Name: "Toxic green",
        Theme: "Toxic",
        Colors: [[60, 97, 60], [75, 70, 52], [79, 71, 48], [154, 100, 54], [169, 95, 43]]
    }
]

//Color idea: "Fire (oranges)", "Ice" blues, "Toxic" (purple or greenish)
//Let user pick between three themes containing different palettes: Retro, Fire&Ice, Toxic

const alienButton = document.getElementById("AlienButton")
alienButton.addEventListener("click", drawAlienCity)

const mountainsButton = document.getElementById("MountainsButton")
mountainsButton.addEventListener("click", drawMountains)

const cityButton = document.getElementById("CityButton")
cityButton.addEventListener("click", drawCity)

let buildingArray = []

function setup() {
    createCanvas(800, 500)
    document.getElementsByTagName("canvas")
    canvas.classList.add("canvas")
    noLoop()
}

function draw() {
    colorMode(HSL)
    drawAlienCity()
}

//Main landscape types:

function drawAlienCity() {
    background("white")
    buildingArray = []
    let activePalette = colorPalettes[floor(random(colorPalettes.length))].Colors
    drawGradient(activePalette[4], activePalette[2], "x")
    drawGrain(activePalette[4])
    drawStars(random(500, 2000))
    //Draw a random number of moons from 1-3
    let moonCount = random(3)
    for (let i = 0; i < moonCount; i++) {
        let moonPos = [random(50, width - 50), random(50, 300)]
        drawMoon([60, 0, 90], random(75, 125), moonPos)
    }
    //Draw a random number of layers (hills or buildings).
    let layerCount = floor(random(1, 6))
    for (let i = 1; i < layerCount; i++) {
        if (random() < 0.4) {
            drawHills(random(100), 0.003, 400 / i, activePalette[i - 1])
        }
        else {
            createBuildings([0, 50 / i], [50 / i, 70 / i], [100 / i, 250 / i], activePalette[i - 1])

        }
    }
    drawHaze(activePalette[2])
    for (building of buildingArray) {
        drawBuilding(building)
        drawDome(building)
        drawEye(building, activePalette[2], activePalette[3])

    }
    drawHaze(activePalette[1])
}

function drawMountains() {
    //Drawing a mountainscape
    background("white")
    buildingArray = []
    let retroPalette = colorPalettes.filter(x => x.Theme !== "Toxic")
    let activePalette = retroPalette[floor(random(retroPalette.length))].Colors
    let sunPos = [random(50, width - 50), random(50, 200)]
    //background(activePalette[1])
    drawRadialGradient(activePalette[0], activePalette[1], sunPos)
    drawSun([60, 70, 90], random(50, 250), sunPos)
    let layerCount = floor(random(1, 6))
    for (let i = 1; i < layerCount; i++) {
        drawHills(random(10000), random(0.001, 0.015), 500 / i, activePalette[i])
    }
}

function drawCity() {
    //Drawing a skyscraper skyline
    background("white")
    buildingArray = []
    let cityPalette = colorPalettes.filter(x => x.Theme !== "Retro")
    let activePalette = cityPalette[floor(random(cityPalette.length))].Colors
    drawGradient(activePalette[0], activePalette[2], "y")
    if (random() < 0.5) {
        let moonPos = [random(50, width - 50), random(50, 300)]
        drawSun([60, 0, 90], random(75, 125), moonPos)
    }
    let layerCount = floor(random(2, 5))
    for (let i = 1; i <= layerCount; i++) {
        createBuildings([0, 50 / i], [25, 40], [150 / i, 350 / i], activePalette[i])
    }
    drawHaze(activePalette[1])
    for (building of buildingArray) {
        drawBuilding(building)
        let rand = random()
        if (rand < 0.3) {
            drawDome(building)
            drawHorizontalWindows(building)
        }
        else if (rand < 0.5) {
            drawSpire(building)
            drawVerticalWindows(building)
        }
        else if (rand < 0.7) {
            drawTriangle(building)
            drawWindows(building)
        }
        else {
            drawPyramid(building)
            drawWindows(building)
        }
    }
    drawBase(activePalette[layerCount])

    drawHaze(activePalette[4])
}

//Helper drawing functions:

function drawHills(offset, inc, horizon, color) {

    stroke(color[0], color[1], color[2], 1)
    for (let x = 0; x < width; x++) {
        let y = noise(offset) * horizon
        line(x, height, x, height - y)
        offset = offset + inc
    }
}

function drawStars(count = 1500) {
    stroke(262, 100, 90)
    for (let i = 0; i < count; i++) {
        strokeWeight(random(3))
        point(random(width), random(height))
    }
}

function drawSun(color, diameter, pos) {
    fill(color[0], color[1], color[2])
    noStroke()
    circle(pos[0], pos[1], diameter)
}

function drawMoon(color, diameter, pos) {
    drawShine(diameter, pos)
    fill((color[0], color[1], color[2]))
    noStroke()
    circle(pos[0], pos[1], diameter)
    let smallSize = diameter / 15
    for (let i = 0; i < diameter * 20; i++) {
        let x = random(pos[0] - diameter / 2, pos[0] + diameter / 2)
        let y = random(pos[1] - diameter / 2, pos[1] + diameter / 2)
        if (insideCircle(x, y, diameter, pos)) {
            fill(color[0], color[1], color[2] + random(-10), 0.3)
            noStroke()
            circle(x, y, smallSize)
        }
    }
}

function drawShine(diameter, pos) {
    let c1 = color(255, 255, 255, 100)
    let c2 = color(255, 255, 255, 0)
    let step = 1 / (diameter * 2)
    noFill()
    for (let i = 0; i < diameter * 2; i++) {
        stroke(lerpColor(c1, c2, step * i))
        circle(pos[0], pos[1], i)
    }
}

function insideCircle(x, y, diameter, pos) {
    let a = Math.abs(x - pos[0]) + ((diameter / 15) / 2) // the 3 is the diameter of the smaller circle.
    let b = Math.abs(y - pos[1]) + ((diameter / 15) / 2)
    if ((a ** 2 + b ** 2) < (diameter / 2) ** 2) {
        return true
    }
    else {
        return false
    }
}

function drawHaze(color) {
    strokeWeight(3)
    strokeCap(ROUND)
    for (let i = 0; i < 500; i++) {
        stroke(color[0], color[1] - random(5), color[2] - random(5), 0.1)
        let x1 = random(-100, width + 100)
        let x2 = x1 + random(30, 200)
        let y = random(height)
        line(x1, y, x2, y)
    }
}

function drawGrain(color) {
    strokeWeight(10)
    for (let i = 0; i < 25000; i++) {
        stroke(color[0], color[1], color[2], 0.3)
        point(random(width), random(height))
    }
}

function drawGradient(color1, color2, axis = x) {
    let c1 = color(color1[0], color1[1], color1[2])
    let c2 = color(color2[0], color2[1], color2[2])
    let step = 1 / width
    if (axis === "x") {
        for (let i = 0; i < width; i++) {
            stroke(lerpColor(c1, c2, step * i))
            line(i, 0, i, height)
        }
    }
    if (axis === "y") {
        for (let i = 0; i < width; i++) {
            stroke(lerpColor(c1, c2, step * i))
            line(0, i, width, i)
        }
    }
}

function drawRadialGradient(color1, color2, pos = [400, 250]) {
    let c1 = color(color1[0], color1[1], color1[2])
    let c2 = color(color2[0], color2[1], color2[2])
    let x, y
    x = Math.abs(pos[0] - width / 2) + width / 2
    y = Math.abs(pos[1] - height / 2) + height / 2
    let c = Math.sqrt(x ** 2 + y ** 2)
    let step = 1 / c
    noFill()
    for (let i = 0; i < c * 2; i++) {
        stroke(lerpColor(c1, c2, step * i))
        circle(pos[0], pos[1], i)
    }
}

function createBuildings(distanceRange, wideRange, tallRange, color) {
    for (let i = 0; i < width; i) {
        //Sets the individual color with a slight variation in the lightness value of the passed HSL color.
        let distance = random(distanceRange[0], distanceRange[1])
        let thisColor = [color[0], color[1], random(color[2] - 3, color[2] + 3)]
        let wide = floor(random(wideRange[0], wideRange[1]))
        let tall = floor(random(tallRange[0], tallRange[1]))
        //Adding the building to an array of all buildings
        buildingArray.push({ x: i, y: height - tall, width: wide, height: tall, color: thisColor, hasDome: false, hasWindows: false, drawn: false })
        i = i + wide + distance
    }
}

function drawBuilding(building) {
    if (!building.drawn) {
        fill(building.color)
        noStroke()
        rect(building.x, building.y, building.width, building.height)
        building.drawn = true
    }
}

function drawBase(color) {
    for (let i = 0; i < 10; i++) {
        let blockHeight = random(5, 25)
        let blockWidth = width / 10
        fill(color)
        noStroke()
        rect(i * blockWidth, height - blockHeight, blockWidth, blockHeight)
    }
}

function drawWindows(building) {
    if (!building.hasWindows) {
        let windowSize = 5
        let cols = building.width / windowSize - 2
        let rows = building.height / windowSize - 2
        for (let i = 1; i < cols; i++) {
            for (let j = 1; j < rows; j++) {
                if (random() > 0.5) {
                    stroke(building.color)
                    strokeWeight(1)
                    fill("yellow")
                    rect(building.x + (i * windowSize), building.y + (j * windowSize), windowSize, windowSize)
                }
            }
        }
        building.hasWindows = true
    }
}

function drawHorizontalWindows(building) {
    if (!building.hasWindows) {
        let windowSize = 5
        let rows = building.height / windowSize - 2
        let length = building.width - (windowSize * 2)
        for (let j = 1; j < rows; j++) {
            stroke(building.color)
            strokeWeight(3)
            fill("yellow")
            rect(building.x + windowSize, building.y + (j * windowSize), length, windowSize)
        }
    }
    building.hasWindows = true
}

function drawVerticalWindows(building) {
    if (!building.hasWindows) {
        let windowSize = 5
        let cols = floor(building.width / windowSize) - 2
        let height = building.height - (windowSize * 2)
        let offset = ((building.width - (cols * windowSize))) / 2
        for (let j = 0; j < cols; j++) {
            stroke(building.color)
            strokeWeight(3)
            fill("yellow")
            rect(building.x + (j * windowSize) + offset, building.y + windowSize, windowSize, height)
        }
    }
    building.hasWindows = true
}

function drawSpire(building) {
    if (!building.hasDome) {
        let lineX = random(building.x, building.x + building.width)
        strokeWeight(2)
        stroke(building.color)
        line(lineX, building.y, lineX, building.y - random(10, 30))
        strokeWeight(1)
        building.hasDome = true
    }
}

function drawDome(building) {
    if (!building.hasDome) {
        noStroke()
        fill(building.color)
        circle(building.x + building.width / 2, building.y, building.width)
        building.hasDome = true
    }
}

function drawPyramid(building) {
    if (!building.hasDome) {
        let stepWidth = 5
        let stepHeight = 10
        noStroke()
        fill(building.color)
        let pyrWidth = building.width - (stepWidth * 2)
        let reps = 1
        while (pyrWidth > 5) {
            rect(building.x + stepWidth * reps, building.y - stepHeight * reps, pyrWidth, stepHeight)
            pyrWidth -= 10
            reps += 1
        }
        building.hasDome = true
    }
}

function drawTriangle(building) {
    if (!building.hasDome) {
        noStroke()
        fill(building.color)
        triangle(building.x, building.y, building.x + building.width, building.y, + random(building.x, building.x + building.width), building.y - random(20, 40))
        building.hasDome = true
    }
}

function changeHeight(building) {
    let change = random(-5, 5)
    building.height += change
    building.y += change
}

function drawEye(building, color1, color2) {
    if (building.hasDome) {
        noStroke()
        fill(color1)
        circle(building.x + building.width / 2, building.y, building.width * 0.7)
        fill(color2)
        circle(building.x + building.width / 2, building.y, building.width * 0.4)
        building.hasDome = true
    }
}

function drawColors(palette) {
    noStroke()
    for (let i = 0; i < 5; i++) {
        fill(palette[i])
        rect(0, (height / 5) * i, width, height)
    }
}

function drawRandom() {
    buildingArray = []
    let activePalette = colorPalettes[floor(random(colorPalettes.length))].Colors
    drawColors(activePalette)
}