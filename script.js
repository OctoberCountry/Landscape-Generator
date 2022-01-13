const colorPalettes = [
    //All color palettes going from lighter to darker
    {
        //Very hot for Alien
        "Name": "LimeBlue",
        "Colors": [[73, 72, 75], [110, 50, 70], [163, 41, 52], [182, 52, 42], [199, 72, 36]]
    },
    {
        "Name": "Rosy",
        "Colors": [[349, 100, 90], [349, 100, 78], [349, 100, 65], [343, 79, 36], [343, 75, 20]]
    },
    {
        //This isn't so hot
        "Name": "OrangePurple",
        "Colors": [[37, 100, 50], [26, 100, 50], [273, 68, 59], [270, 73, 35], [271, 100, 14]]
    },
    {
        //Very hot for icy mountains
        "Name": "Blues",
        "Colors": [[239, 94, 19], [201, 100, 36], [190, 100, 42], [189, 75, 75], [190, 77, 88]]
    },
    {
        //Needs fixing
        "Name": "Oranges",
        "Colors": [[51, 55, 82], [40, 97, 64], [31, 100, 48], [358, 97, 31], [201, 100, 14]]
    }
]

//Color idead: "Fire (oranges)", "Ice" blues, "Toxic" (purple or greenish)

const alienButton = document.getElementById("AlienButton")
alienButton.addEventListener("click", drawAlienCity)

const mountainsButton = document.getElementById("MountainsButton")
mountainsButton.addEventListener("click", drawMountains)

const cityButton = document.getElementById("CityButton")
cityButton.addEventListener("click", drawCity)

const testButton = document.getElementById("TestButton")
testButton.addEventListener("click", drawTest)

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
    let activePalette = colorPalettes[floor(random(5))]
    background(activePalette.Colors[3])
    drawGrain(activePalette.Colors[4])
    drawStars()
    drawMoon([60, 100, 90], random(75, 125))
    drawHaze(activePalette.Colors[3])
    drawMoon([60, 100, 90], random(75, 125))
    createBuildings(1, [10, 20], [150, 350], activePalette.Colors[2])
    for (building of buildingArray) {
        drawBuilding(building)
        //drawDome(building)
    }
    drawHaze(activePalette.Colors[2])
    createBuildings(1, [15, 25], [100, 250], activePalette.Colors[1])
    for (building of buildingArray) {
        drawBuilding(building)
        //drawDome(building)
    }
    drawHaze(activePalette.Colors[1])
    createBuildings(1, [20, 40], [50, 150], activePalette.Colors[0])
    for (building of buildingArray) {
        drawBuilding(building)
        drawDome(building)
    }
    //drawHills(10, 0.005, 150, activePalette.Colors[1])
}

function drawMountains() {
    //Drawing a mountainscape
    buildingArray = []
    let activePalette = colorPalettes[floor(random(5))]
    colorMode(HSL)
    //background(activePalette.Colors[4])
    drawGradient(activePalette.Colors[4], activePalette.Colors[1], "y")

    drawMoon([60, 100, 90], random(50, 250))
    drawHills(1, 0.001, 500, activePalette.Colors[3])
    drawHills(10, 0.005, 400, activePalette.Colors[2])
    drawHills(40, 0.01, 300, activePalette.Colors[1])
    drawHills(300, 0.02, 200, activePalette.Colors[0])
}

function drawCity() {
    //Drawing a futuristic skyscraper skyline
    buildingArray = []
    let activePalette = colorPalettes[floor(random(5))]
    colorMode(HSL)
    background(activePalette.Colors[4])
    drawHaze(activePalette.Colors[3])
    drawMoon([60, 100, 90], 75)
    createBuildings(1, [20, 40], [200, 350], activePalette.Colors[1])
    for (building of buildingArray) {
        drawBuilding(building)
        let rand = random()
        if (rand < 0.3) {
            drawDome(building)
        }
        else if (rand < 0.5) {
            drawSpire(building)
        }
        else if (rand < 0.7) {
            drawTriangle(building)
        }
        else {
            drawPyramid(building)
        }
        drawHorizontalWindows(building)
    }
    createBuildings(5, [30, 50], [100, 250], activePalette.Colors[2])

    for (building of buildingArray) {
        drawBuilding(building)
        let rand = random()
        if (rand > 0.3) {
            drawDome(building)
        }
        else if (rand > 0.5) {
            drawSpire(building)
        }
        else if (rand > 7) {
            drawTriangle(building)
        }
        else {
            drawPyramid(building)
        }
        drawVerticalWindows(building)
    }
}

function drawGrotto() {
    //Stalactites (upside down buildings)
    //Flowing water/ground

}

function drawTest() {
    buildingArray = []
    let activePalette = colorPalettes[floor(random(5))]
    background("white")

    background(activePalette.Colors[4])
    createBuildings(1, [20, 40], [200, 350], activePalette.Colors[1])
    for (building of buildingArray) {
        drawBuilding(building)
    }
}

//Helper drawing functions:

// Change to calculate different perlin values when drawing anew
function drawHills(offset, inc, horizon, color) {

    stroke(color[0], color[1], color[2])
    for (let x = 0; x < width; x++) {
        let y = noise(offset) * horizon
        line(x, height, x, height - y)
        offset = offset + inc
    }
}

function drawStars(weight = 3) {
    //Drawing 2000 stars with the user set size.
    strokeWeight(weight)
    stroke(262, 100, 90)
    for (let i = 0; i < 2000; i++) {
        point(random(width), random(height))
    }
}

function drawMoon(color, size) {
    let x = random(50, width - 50)
    let y = random(50, 200)
    fill((color[0], color[1], color[2]))
    noStroke()
    circle(x, y, size)
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
    for (let i = 0; i < 50000; i++) {
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

function createBuildings(distance, wideRange, tallRange, color) {
    for (let i = 0; i < width; i = i + distance) {
        //Sets the individual color with a slight variation in the lightness value of the passed HSL color.
        let thisColor = [color[0], color[1], random(color[2] - 3, color[2] + 3)]
        let wide = floor(random(wideRange[0], wideRange[1]))
        let tall = floor(random(tallRange[0], tallRange[1]))
        //Adding the building to an array of all buildings
        buildingArray.push({ x: i, y: height - tall, width: wide, height: tall, color: thisColor, hasDome: false, hasWindows: false })
        i = i + wide

    }
}

function drawBuilding(building) {
    fill(building.color)
    noStroke()
    rect(building.x, building.y, building.width, building.height)
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
                stroke(building.color)
                strokeWeight(1)
                fill("yellow")
                rect(building.x + (i * windowSize), building.y + (j * windowSize), windowSize, windowSize)
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