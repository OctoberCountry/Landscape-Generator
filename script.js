//To do

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
    }
]
//Fix: Monochrome/duochrome works best!

//Color idea: "Fire (oranges)", "Ice" blues, "Toxic" (purple or greenish)
//Let user pick between three themes containing different palettes: Retro, Fire&Ice, Toxic

const alienButton = document.getElementById("AlienButton")
alienButton.addEventListener("click", drawAlienCity)

const mountainsButton = document.getElementById("MountainsButton")
mountainsButton.addEventListener("click", drawMountains)

const cityButton = document.getElementById("CityButton")
cityButton.addEventListener("click", drawCity)

const randomButton = document.getElementById("RandomButton")
randomButton.addEventListener("click", drawRandom)

//Add a random button that mixes all styles.

let buildingArray = []

function setup() {
    createCanvas(800, 500)
    let myCanvas = document.getElementsByTagName("canvas")
    canvas.classList.add("canvas")

    noLoop()

}

function draw() {
    colorMode(HSL)
    drawAlienCity()
}

//Main landscape types:

function drawAlienCity() {
    buildingArray = []
    let activePalette = colorPalettes[floor(random(colorPalettes.length))].Colors
    // if (random() < 0.2) {
    //     activePalette = activePalette.reverse()
    // }
    drawGradient(activePalette[4], activePalette[2], "x")
    drawGrain(activePalette[4])
    drawStars(random(500, 2000))
    let moonPos = [random(50, width - 50), random(50, 200)]
    drawMoon([60, 0, 90], random(75, 125), moonPos)
    moonPos = [random(50, width - 50), random(50, 200)]
    drawMoon([60, 0, 90], random(75, 125), moonPos)
    drawHills(random(100), 0.005, 400, activePalette[2])
    // createBuildings([0, 5], [10, 25], [150, 350], activePalette.Colors[2])
    // for (building of buildingArray) {
    //     drawBuilding(building)
    //     drawDome(building)
    // }
    drawHaze(activePalette[2])
    createBuildings([0, 15], [15, 35], [100, 250], activePalette[1])
    for (building of buildingArray) {
        drawBuilding(building)
        drawDome(building)

    }
    let length = buildingArray.length
    drawHaze(activePalette[1])
    createBuildings([15, 50], [30, 60], [50, 150], activePalette[0])
    for (let i = length; i < buildingArray.length; i++) {//building of buildingArray) {
        drawBuilding(buildingArray[i])
        drawDome(buildingArray[i])
        drawEye(buildingArray[i], activePalette[2], activePalette[3])
    }
    drawHills(random(100), 0.003, 100, activePalette[0])
}

function drawMountains() {
    //Drawing a mountainscape
    buildingArray = []
    let retroPalette = colorPalettes.filter(x => x.Theme !== "Toxic")
    console.log(retroPalette)
    let activePalette = retroPalette[floor(random(retroPalette.length))].Colors
    colorMode(HSL)
    //background(activePalette[4])
    //drawGradient(activePalette[4], activePalette[1], "y")
    let sunPos = [random(50, width - 50), random(50, 200)]
    drawRadialGradient(activePalette[0], activePalette[1], sunPos)
    drawSun([60, 70, 90], random(50, 250), sunPos)
    // drawHills(random(10000), 0.001, 500, activePalette[1])
    // drawHills(random(10000), 0.005, 400, activePalette[2])
    // drawHills(random(10000), 0.01, 300, activePalette[3])
    // drawHills(random(10000), 0.02, 200, activePalette[4])
    drawHills(random(10000), random(0.001, 0.015), 500, activePalette[1])
    drawHills(random(10000), random(0.001, 0.015), 400, activePalette[2])
    drawHills(random(10000), random(0.001, 0.015), 300, activePalette[3])
    drawHills(random(10000), random(0.001, 0.015), 200, activePalette[4])
}

function drawCity() {
    //Drawing a futuristic skyscraper skyline
    buildingArray = []
    let cityPalette = colorPalettes.filter(x => x.Theme !== "Retro")
    let activePalette = cityPalette[floor(random(cityPalette.length))].Colors
    colorMode(HSL)
    drawGradient(activePalette[0], activePalette[2], "y")
    createBuildings([0, 30], [25, 40], [200, 400], activePalette[3])
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
    drawHaze(activePalette[1])
    drawHaze(activePalette[4])
    createBuildings([0, 0], [40, 60], [50, 250], activePalette[4])

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

    // fill(activePalette[0])
    // rect(0, height - 30, width, 30)
}

function drawGrotto() {
    //Stalactites (upside down buildings)
    //Flowing water/ground

}

function drawRandom() {
    buildingArray = []
    let activePalette = colorPalettes[floor(random(colorPalettes.length))].Colors
    drawColors(activePalette)
    ///Create a random background

    // Create a number of random layers - hills or buildings
    // If buildings, determine roofs and windows for each


    // drawRadialGradient(activePalette.Colors[0], activePalette.Colors[3])
    // createBuildings([0, 5], [20, 40], [200, 350], activePalette.Colors[1])
    // for (building of buildingArray) {
    //     drawBuilding(building)
    // }

}

//Helper drawing functions:

// Change to calculate different perlin values when drawing anew
function drawHills(offset, inc, horizon, color) {

    stroke(color[0], color[1], color[2], 1)
    for (let x = 0; x < width; x++) {
        let y = noise(offset) * horizon
        line(x, height, x, height - y)
        offset = offset + inc
    }
}

function drawStars(count = 1500) {
    //Drawing 2000 stars with the user set size.

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
    //To do: Draw a textured moon of many dots inside the diameter of the moon size.
    fill((color[0], color[1], color[2]))
    noStroke()
    //stroke(color[0], color[1], color[2])
    circle(pos[0], pos[1], diameter)
    let smallSize = diameter / 15
    for (let i = 0; i < diameter * 20; i++) {
        let x = random(pos[0] - diameter / 2, pos[0] + diameter / 2)
        let y = random(pos[1] - diameter / 2, pos[1] + diameter / 2)
        if (insideCircle(x, y, diameter, pos)) {
            fill(color[0], color[1], color[2] + random(-15), 0.3)
            noStroke()
            circle(x, y, smallSize)
        }
    }
}

function insideCircle(x, y, diameter, pos) {
    let a = Math.abs(x - pos[0]) + ((diameter / 15) / 2) // the 3 is the diameter of the smaller circle.
    let b = Math.abs(y - pos[1]) + ((diameter / 15) / 2)
    // let c = Math.sqrt(a ** 2 + b ** 2)
    // if (diameter > c) {
    //     //if ((diameter / 2) + (diameter / 2) > c) {
    //     return true
    // }
    // else {
    //     return false
    // }
    if ((a ** 2 + b ** 2) < (diameter / 2) ** 2) {
        return true
    }
    else {
        return false
    }
    //     (x - center_x)² + (y - center_y)² < radius²
}

function drawHaze(color) {

    strokeWeight(3)
    strokeCap(ROUND)
    //rect(0, 0, width, height)
    //stroke(262, 100, 90, 10)
    for (let i = 0; i < 500; i++) {
        stroke(color[0], color[1] - random(5), color[2] - random(5), 0.1)
        //point(random(width), random(height))
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
    y = Math.abs(pos[0] - height / 2) + height / 2
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

//Change this to draw windows on a single building that is passed as argument + color palette
//Add different window types
function drawWindows(building) {
    if (!building.hasWindows) {
        let windowSize = 5
        let cols = building.width / windowSize - 2//(wide - (windowSize * 2)) / windowSize
        let rows = building.height / windowSize - 2//(tall - (windowSize * 2)) / windowSize
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
        let rows = building.height / windowSize - 2//(tall - (windowSize * 2)) / windowSize
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
        let cols = floor(building.width / windowSize) - 2//(tall - (windowSize * 2)) / windowSize
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
// Draws a dome on top of a single passed building
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
