const MAX_TRIES = 10
const MAX_COLORS_COMBIATIONS = 4
const colors = ["white", "blue", "fuchsia", "red", "orange", "yellow", "green", "aqua"]

function generateMasterColors (colorsArray) {
    const array = []
    for (i=1; i<=MAX_COLORS_COMBIATIONS; i++) {
        const pos = Math.round(Math.random() * (colors.length - 1))
        array.push(colorsArray[pos])
    }
    return array
}

function compareColors(userArray, masterArray) {
    const array = []

    for (i in userArray) {
        if (masterArray.some(e => e == userArray[i])) {
            if (userArray[i] == masterArray[i]) array.push("black")
            else array.push("white")
        } else {
            array.push("gray")
        }
    }

    return array
}

const masterArray = generateMasterColors(colors)
const userArray = ["white", "blue", "fuchsia", "red"]
const resultArray = compareColors(userArray, masterArray)

console.log("Master Array", masterArray)
console.log("User Array  ", userArray)
console.log("Result Array",resultArray)

