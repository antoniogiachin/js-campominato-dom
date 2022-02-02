const playButton = document.getElementById('play');

play.addEventListener('click',

    function(){

        // Mi riferisco al valore difficoltà
        const difficultyValue = document.getElementById('difficulty-select').value;

        

        createGrid(difficultyValue);


    }


);

// Funzione generale creazione e gestione grid
function createGrid(value){

    const gridHtml = document.getElementById('grid');

    // Genero array bombe
    const bombe = arrayBomb(value);
    console.log(bombe);

    //Array tentativi
    const tentativi =[];
    
    // Svuoto html
    gridHtml.innerHTML='';

    for(let i = 1; i <= value; i++){

        const square = document.createElement('div');

        square.classList.add('square');

        if(value == 100){
            square.classList.add('sq-easy');
        } else if (value == 81){
            square.classList.add('sq-medium');
        } else {
            square.classList.add('sq-hard');
        }
        
        square.innerText = i;

        gridHtml.appendChild(square);

        square.addEventListener('click', clickHandler);

    }

    // Funzione gestione click
    function clickHandler(){
        
        this.removeEventListener('click', clickHandler);

        // Se prendo bomba
        if(bombe.includes(parseInt(this.innerText))){
            alert('BOOOOM!!!');

            //Aggiungo colore rosso e rimuovo click
            this.classList.add('clicked-bomb');
            const allSquares = document.getElementsByClassName('square');
            for(let i = 0; i < allSquares.length; i++){
                // allSquares[i].removeEventListener('click', valore); -- Non so perchè non mi funziona
                allSquares[i].classList.add('remove-click');

                console.log(parseInt(allSquares[i].innerText));

                if(bombe.includes((parseInt(allSquares[i].innerText)))){
                    allSquares[i].classList.add('clicked-bomb');
                }

            }   
            
            //Creo e inietto recap
            const recapHtml = document.createElement('h4');
            recapHtml.innerText = `Sei sopravvissuto a: ${tentativi.length} tentativi, forse la prossima volta sarai più fortunato!`;
            gridHtml.append(recapHtml);



        } else {
            this.classList.add('clicked');
            tentativi.push(this.innerText);
        }    
        console.log(tentativi.length);
    }
}



// funzione numero random
function randomNumber(min, max){
    return Math.floor(Math.random() * (max - min+1)+min);
}

// funzione creazione array bombe
function arrayBomb(value){
    
    const arrayBomb =[];

    while(arrayBomb.length < 16){
         const bombId = randomNumber(1 , value);

        if(!arrayBomb.includes(bombId)){
            arrayBomb.push(bombId);
        }    
    }

    return arrayBomb;

}