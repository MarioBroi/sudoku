//definisco le variabili din numero, casella e errore
let numSelected = null;
let tileSelected = null;
let errors = 0;
//definisco le varibili con soluzione e numeri censurati da stampare
let solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
]
let board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
]

//al load della finestra richiamo la funzione setGame
window.onload = function () {
    setGame();
}

/**
 * Crea la tabella di gioco e inserisce i numeri
 */
function setGame() {

    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        //creo un elemento div e lo assegno alla variabile number
        let number = document.createElement("div");
        //do un id alla variabile number
        number.id = i;
        //do un testo alla variabile number
        number.innerText = i;
        //aggiungo un event listener che al click seleziona il numero
        number.addEventListener("click", selectNumber);
        //aggiungo la classe number
        number.classList.add("number");
        //aggiungo la variabile number a digits in html
        document.getElementById("digits").appendChild(number);
    }

    // Board 9x9
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            //creo un elemento div e lo assegno alla variabile tile
            let tile = document.createElement("div");
            //creo un id unico dando come valore stringa l'index del primo ciclo + - + index secondo ciclo
            tile.id = r.toString() + "-" + c.toString();
            //controllo se il valore deve essere mostrato in base all'array board
            if (board[r][c] != "-") {
                //se i valori son diversi da - allora assegno il valore
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            //creo le righe di divisione dei quadrati
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            //rendo i numeri di sotto selezionaibili al click 
            tile.addEventListener("click", selectTile);
            //aggiungo la classe tile 
            tile.classList.add("tile");
            //printo tile in board
            document.getElementById("board").append(tile);
        }
    }
}
/**
 * Selezione dei numeri
 */
function selectNumber() {
    //se il numero selezionato non é nullo rimuovo la classe number-selected
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }

    numSelected = this;
    //se il numero selezionato é nullo allora aggiungo la classe number-selected
    numSelected.classList.add("number-selected");
}

/**
 * Selezione delle caselle
 */
function selectTile() {
    if (numSelected) {
        //se il testo selezionato é vuoto
        if (this.innerText != "") {
            return;
        }
        //se il testo selezionato non é vuoto 
        let coords = this.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);
        //se la soluzione corripsonde al numero selezionato
        if (solution[r][c] == numSelected.id) {
            //inserisco il testo del numero
            this.innerText = numSelected.id;
        }
        //altrimenti
        else {
            //aggiungo un errore
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
    }
}
