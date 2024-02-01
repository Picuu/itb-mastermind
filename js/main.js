const MAX_TRIES = 10
const MAX_COLORS_COMBIATIONS = 4
const colors = ["white", "blue", "fuchsia", "red", "orange", "yellow", "green", "aqua"]
const GRAY = "gray"
const WHITE = "white"
const BLACK = "black"

let tries = 0;
// let aciertos = 0; // No es necesario ¿?

function init() {
    // 1. Genera el código random del master
    const masterArray = generateMasterColors(colors)
    const userArray = ["blue", "green", "blue", "green"]
    const resultArray = compareColors(userArray, masterArray)

    console.log("Master Array", masterArray)
    console.log("User Array  ", userArray)
    console.log("Result Array",resultArray)

    // 2. Crea todas las filas según el número de intentos.
    createRows(MAX_TRIES)

    // Listener del botón Comprobar
    const checkButton = document.getElementById("checkButton")
    checkButton.addEventListener("click", () => Comprobar(masterArray))

    youWin()
}

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
        if (!colorsInMaster.some(e => e == masterArray[i])) {
            colorsInMaster.push(masterArray[i])
        }

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

function createRows(maxTries) {
    const container = document.getElementById("Result")

    for (i=1; i<=maxTries; i++) {
        /* Template con el código HTML que corresponde a cada fila de juego/intento. */
        const ROW_RESULT = `<div class="rowResult w100 flex wrap">
            <div id="userCombiRow${i}" class="rowUserCombi w75 flex wrap">
            <div class="w25">
                <div class="celUserCombi flex"></div>
            </div>
            <div class="w25">
                <div class="celUserCombi flex"></div>
            </div>
            <div class="w25">
                <div class="celUserCombi flex"></div>
            </div>
            <div class="w25">
                <div class="celUserCombi flex"></div>
            </div>
            </div>
            <div id="cercleResult${i}" class="rowCercleResult w25 flex wrap center">
            <div class="w40 h40">
                    <div class="cercleResult flex"></div>
            </div>
            <div class="w40 h40">
                <div class="cercleResult flex"></div>
            </div>
            <div class="w40 h40">
                <div class="cercleResult flex"></div>
            </div>
            <div class="w40 h40">
                <div class="cercleResult flex"></div>
            </div>
            <div>
        </div>`;
        
        container.innerHTML += ROW_RESULT
    }
}

/** Procedimiento que se ejecuta cada vez que el usuario selecciona un color, hasta el número máximo de colores permitidos en la combinación. */
function añadeColor(color) {
    const $combiText = document.getElementById("combiText")
    const userColors = $combiText.value.split("-")

    if (userColors.length == MAX_COLORS_COMBIATIONS) return
    if (!$combiText.value) return $combiText.value += color

    $combiText.value += `-${color}`
}


/* Llamaremos a esta función desde el botón HTML de la página para comprobar la propuesta de combinación que nos ha introducido el usuario.
Informamos al usuario del resultado y del número de intentos que lleva*/
function Comprobar(masterArray) {
    const $combiText = document.getElementById("combiText")
    const userColors = $combiText.value.split("-")

    if (!userColors || userColors.length < 4) return

    $combiText.value = ""

    tries++
    const tryRow = document.getElementById(`userCombiRow${tries}`)
    const resultRow = document.getElementById(`cercleResult${tries}`)

    const resultColors = compareColors(userColors, masterArray)

    for (const i in userColors) {
        const colorBox = tryRow.querySelector(`div:nth-child(${parseInt(i)+1}) > div.celUserCombi`)
        colorBox.style.backgroundColor = `var(--${userColors[i]})`

        const resultCercle = resultRow.querySelector(`div:nth-child(${parseInt(i)+1}) > div.cercleResult`)
        resultCercle.style.backgroundColor = resultColors[i]
    }

    updateTries(userColors, masterArray, resultColors)
}

function updateTries(userArray, masterArray, resultArray) {
    if (resultArray.every(e => e == "white")) {
            youWin()
            return
        }

    if (tries == MAX_TRIES) {
        gameOver()
        return
    }

    const triesInfo = document.getElementById("info")
    triesInfo.textContent = `INCORRECTO! Intento número ${tries}, sigui probando :D`
}

function youWin() {
    confetti()
}

function gameOver() {

}

