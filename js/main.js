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
