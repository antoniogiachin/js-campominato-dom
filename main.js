// Mi riferisco a bottone play
const play = document.getElementById('play');

/* ----- FUNZIONI ------ */
// Funzione per numero casuale
function casualNumber (min, max){
    return Math.floor(Math.random() * (max - min+1)+min);
}

// funzione per creazione bombe

function createBombArray(bombNumber, maxValue){

    const bombArray=[];

    while(bombArray.length < bombNumber){

        const bombId = casualNumber(1, maxValue);

        // Evito che due numeri si ripetano
        if(!bombArray.includes(bombId)){
            bombArray.push(bombId);
            
        }

    }

    console.log(bombArray);
    return bombArray;
}

// Blocco click finale
function endGameLost(valore){
    const allSquares = document.getElementsByClassName('square');
    for(let i = 0; i < allSquares.length; i++){
        // allSquares[i].removeEventListener('click', valore); -- Non so perchè non mi funziona
        allSquares[i].classList.add('remove-click');
    }
}

// Funzione che crea grid
function createGrid(value){

    // Mi riferisco a div #grid
    const gridHtml = document.getElementById('grid');

    // Array tentativi
    const tentativi =[];

    // Svuoto grid
    gridHtml.innerHTML ='';

    // Creo le bombe
    const bombe = createBombArray(16, value);
    console.log(bombe);

    // Ciclo for e creo squares a seconda del value inserito
    for(let i = 1; i <= value; i++){

        const square = document.createElement('div');

        square.classList.add('square');

        square.innerText = i;

        //funzione gestione click square
        function handleClick(){

            this.removeEventListener('click', handleClick);

            console.log(this.innerText);
            
            // Verifico presenza bombe
            if(bombe.includes(parseInt(this.innerText))){
                alert('BOOOMBAAAA!!!');
                this.classList.add('clicked-bomb');
                endGameLost(handleClick);
            } else {
                tentativi.push(this.innerText);
                this.classList.add('clicked');
            }
            console.log(tentativi);
        }

        square.addEventListener('click', handleClick);

        // dimensione a seconda di value
        if(value == 100){
            square.classList.add('sq-easy');
        } else if (value == 81){
            square.classList.add('sq-medium');
        } else {
            square.classList.add('sq-hard');
        }

        gridHtml.appendChild(square);

    }

    // Faccio scomparire messaggio benvunuto e compare griglia
    const welcomeHtml = document.getElementById('welcome');
    welcomeHtml.classList.add('d-none');
    gridHtml.classList.remove('d-none');

    
}



// Ascoltatore di eventi per play
play.addEventListener('click',

    function(){
        // Richiamo il valore
        const difficultyValue = document.getElementById('difficulty-select').value;

        createGrid(difficultyValue);

        


    }

);

