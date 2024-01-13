const MAX_TRIES = 10
const MAX_COLORS_COMBIATIONS = 4
const colors = ["white", "blue", "fuchsia", "red", "orange", "yellow", "green", "aqua"]
const GRAY = "gray"
const WHITE = "white"
const BLACK = "black"

function generateMasterColors (colorsArray) {
    const array = []
    for (i=1; i<=MAX_COLORS_COMBIATIONS; i++) {
        const pos = Math.round(Math.random() * (colors.length - 1))
        array.push(colorsArray[pos])
    }
    return array
}

function compareColors(userArray, masterArray) {
    
    const colorsInMaster = []
    const colorsAmountInMaster = []

    for (let i in masterArray) {
        if (!colorsInMaster.some(e => e == masterArray[i])) colorsInMaster.push(masterArray[i])

        const index = colorsInMaster.indexOf(masterArray[i])
        if (isNaN(colorsAmountInMaster[index])) colorsAmountInMaster[index] = 1
        else colorsAmountInMaster[index]++
    }

    return createResultArray(userArray, masterArray, colorsInMaster, colorsAmountInMaster)
}

function createResultArray(userArray, masterArray, colorsInMaster, colorsAmountInMaster) {
    const result = []

    for (let i in userArray) {
        let pushResult = GRAY

        if (masterArray.some(e => e == userArray[i])) {
            const colorIndex = colorsInMaster.indexOf(userArray[i])
            if (colorsAmountInMaster[colorIndex] != 0) {
                colorsAmountInMaster[colorIndex]--
                if (userArray[i] == masterArray[i]) pushResult = BLACK
                else pushResult = WHITE
            }
        }

        result.push(pushResult)
    }

    return result
}

// const masterArray = generateMasterColors(colors)
const masterArray = ["blue", "white", "green", "yellow"]
const userArray = ["blue", "green", "blue", "green"]
const resultArray = compareColors(userArray, masterArray)

console.log("Master Array", masterArray)
console.log("User Array  ", userArray)
console.log("Result Array",resultArray)

