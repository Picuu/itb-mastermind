const MAX_TRIES = 10
const MAX_COLORS_COMBIATIONS = 4
const colors = ["white", "blue", "fuchsia", "red", "orange", "yellow", "green", "aqua"]
const GRAY = "gray"
const WHITE = "white"
const BLACK = "black"

let tries = 0;
let aciertos = 0;

function init() {
    const masterArray = generateMasterColors(colors)
    const userArray = ["blue", "green", "blue", "green"]
    const resultArray = compareColors(userArray, masterArray)

    console.log("Master Array", masterArray)
    console.log("User Array  ", userArray)
    console.log("Result Array",resultArray)

    //1. Genera el código random del master

    //2. Crea todas las filas según el número de intentos.
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


/* Llamaremos a esta función desde el botón HTML de la página para comprobar la propuesta de combinación que nos ha
introducido el usuario.
Informamos al usuario del resultado y del número de intentos que lleva*/
function Comprobar() {
}

/** Procedimiento que se ejecuta cada vez que el usuario selecciona un color, hasta el número máximo de colores permitidos en la combinación. */
function añadeColor(color) {
   
}


/** Template con el código HTML que corresponde a cada fila de juego/intento. */
const ROW_RESULT = `<div class="rowResult w100 flex wrap">
    <div class="rowUserCombi w75 flex wrap">
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
    </div>alis/Mastermind_CODIGO
    <div class="rowCercleResult w25 flex wrap center">
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