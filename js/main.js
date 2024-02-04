const MAX_TRIES = 10
const MAX_COLORS_COMBINATIONS = 4
const colors = ["white", "blue", "fuchsia", "red", "orange", "yellow", "green", "aqua"]
const GRAY = "gray"
const WHITE = "white"
const BLACK = "black"

let tries = 0;
// let aciertos = 0; // No es necesario ¿?

function init() {
    // 1. Genera el código random del master
    // const masterArray = generateMasterColors(colors)
    const masterArray = ["red", "red", "red", "red"]

    console.log("Master Array", masterArray)

    // 2. Crea todas las filas según el número de intentos.
    createRows(MAX_TRIES)

    // Listener del botón Comprobar
    const checkButton = document.getElementById("checkButton")
    checkButton.addEventListener("click", () => Comprobar(masterArray))

    const remainingTries = document.getElementById("remainingTries")
    remainingTries.textContent = MAX_TRIES
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
    const container = document.getElementById("content")

    for (i=1; i<=maxTries; i++) {
        /* Template con el código HTML que corresponde a cada fila de juego/intento. */
        const ROW_RESULT = `
        <div class="row" id="row${i}">
            <div class="user-combination">
                <div class="cell"></div>
                <div class="cell"></div>
                <div class="cell"></div>
                <div class="cell"></div>
            </div>
            <div class="result" id="result${i}">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
            </div>
        </div>`;
        
        container.innerHTML += ROW_RESULT
    }
}

/** Procedimiento que se ejecuta cada vez que el usuario selecciona un color, hasta el número máximo de colores permitidos en la combinación. */
function añadeColor(color) {
    const userCombinationText = document.getElementById("userCombinationText")
    const userColors = userCombinationText.value.split("-")

    if (userColors.length == MAX_COLORS_COMBINATIONS) return
    if (!userCombinationText.value) return userCombinationText.value += color

    userCombinationText.value += `-${color}`
}

/* Llamaremos a esta función desde el botón HTML de la página para comprobar la propuesta de combinación que nos ha introducido el usuario.
Informamos al usuario del resultado y del número de intentos que lleva*/
function Comprobar(masterArray) {
    const userCombinationText = document.getElementById("userCombinationText")
    const userColors = userCombinationText.value.split("-")

    if (!userColors || userColors.length < 4) return

    userCombinationText.value = ""

    tries++
    const tryRow = document.getElementById(`row${tries}`)
    const resultRow = document.getElementById(`result${tries}`)

    const resultColors = compareColors(userColors, masterArray)

    for (const i in userColors) {
        const colorBox = tryRow.querySelector(`.user-combination > .cell:nth-child(${parseInt(i)+1})`)
        colorBox.style.backgroundColor = `var(--${userColors[i]})`

        const resultCircle = resultRow.querySelector(`.result > .circle:nth-child(${parseInt(i)+1})`)
        resultCircle.style.backgroundColor = resultColors[i]
    }

    updateTries(userColors, masterArray, resultColors)
}

function updateTries(resultArray) {
    const remainingTries = document.getElementById("remainingTries")
    remainingTries.textContent = MAX_TRIES - tries

    if (resultArray.every(e => e == "black")) {
            setTimeout(() => youWin(), 100) 
            return
        }

    if (tries == MAX_TRIES) {
        gameOver()
        return
    }
}

function youWin() {
    const winDialog = document.getElementById("winDialog")
    winDialog.showModal()
    
    const confettiDuration = Date.now() + 500;
    (function frame() {
        confetti({ particleCount: 7, angle: 60, spread: 55, origin: { x: 0 } })
        confetti({ particleCount: 7, angle: 120, spread: 55, origin: { x: 1 } })

        if (Date.now() < confettiDuration) requestAnimationFrame(frame)
    }())

    setTimeout(() => {
         confetti({ particleCount: 100, startVelocity: 30, spread: 360, origin: { x: .35, y: .60 } })
         confetti({ particleCount: 100, startVelocity: 30, spread: 360, origin: { x: .5, y: .25 } })
         confetti({ particleCount: 100, startVelocity: 30, spread: 360, origin: { x: .65, y: .60 } })
    }, 1500)
}

function gameOver() {
    const gameOverDialog = document.getElementById("gameOverDialog")
    gameOverDialog.showModal()
}

function closeModal(id) {
    const dialog = document.getElementById(id)
    dialog.close()
}
