const colorPalettes = [
    //All color palettes going from lighter to darker
    {
        "Name": "LimeBlue",
        "Colors": [[73, 72, 75], [110, 50, 70], [163, 41, 52], [182, 52, 42], [199, 72, 36]]
    },
    {
        "Name": "Rosy",
        "Colors": [[349, 100, 90], [349, 100, 78], [349, 100, 65], [343, 79, 36], [343, 75, 20]]
    },
    {
        "Name": "OrangePurple",
        "Colors": [[37, 100, 50], [26, 100, 50], [273, 68, 59], [270, 73, 35], [271, 100, 14]]
    },
    {
        "Name": "Blues",
        "Colors": [[239, 94, 19], [201, 100, 36], [190, 100, 42], [189, 75, 75], [190, 77, 88]]
    },
    {
        "Name": "Oranges",
        "Colors": [[51, 55, 82], [40, 97, 64], [31, 100, 48], [358, 97, 31], [201, 100, 14]]
    }
]

function setup() {
    createCanvas(800, 500)

    noLoop()

}

function draw() {
    colorMode(HSL)
    drawAlienCity()
}

//Main landscape types:

function drawAlienCity() {
    colorMode(HSL)
    let activeColor = colorPalettes[floor(random(5))]
    background(activeColor.Colors[4])
    //grainyBackground()
    drawStars()
    drawMoon([60, 100, 90], 75)
    //stripedBackground(waterColors[8])

    drawBuildings(1, [10, 20], [150, 350], activeColor.Colors[3])
    //stripedBackground(waterColors[7])
    //drawBuildings(1, [15, 25], [100, 250], waterColors[3])

    //stripedBackground(waterColors[6])
    drawBuildings(1, [20, 40], [50, 150], activeColor.Colors[2])
    drawHills(10, 0.005, 150, activeColor.Colors[1])
}

function drawMountains() {
    //Drawing a mountainscape
    colorMode(HSL)
    background(200, 66, 20)
    drawMoon([60, 100, 90], 75)
    drawBackground(1, 0.001, 500, [40, 80, 50])
    drawBackground(10, 0.005, 400, [25, 80, 50])
    drawBackground(40, 0.01, 300, [15, 80, 50])
    drawBackground(300, 0.02, 200, [5, 80, 50])
    drawBackground(500, 0.2, 150, [100, 80, 10])
}

function drawCity() {
    //Drawing a futuristic skyscraper skyline
    colorMode(HSL)
    background(200, 50, 0)
    starryBackground()
    drawMoon([60, 100, 90], 75)
    stripedBackground()
    drawSkyScrapers(1, [5, 15], [200, 350], [252, 35, 75])
    stripedBackground()
    drawSkyScrapers(1, [10, 20], [100, 250], [252, 45, 65])
    stripedBackground()
    drawSkyScrapers(0, [20, 40], [50, 150], [252, 55, 55])
}

//Helper drawing functions:

function drawHills(offset, inc, horizon, color) {

    stroke(color[0], color[1], color[2])
    for (let x = 0; x < width; x++) {
        let y = noise(offset) * horizon
        line(x, height, x, height - y)
        offset = offset + inc
        console.log("drawing perlin")
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

function drawBuildings(distance, wideRange, tallRange, color) {
    for (let i = 0; i < width; i = i + distance) {
        fill(color[0], color[1], random(color[2] - 3, color[2] + 3))
        let wide = random(wideRange[0], wideRange[1])
        let tall = random(tallRange[0], tallRange[1])
        rect(i, height - tall, wide, tall)
        drawDome(i, height - tall, wide)
        //drawWindows(i, height - tall, wide, tall)

        i = i + wide
    }
    //To do: Store buildings in array/object to access later for animmating/adding windows/features

}


function drawDome(x, y, wide) {
    //fill(buildingColor)
    noStroke()
    circle(x + wide / 2, y, wide)
}