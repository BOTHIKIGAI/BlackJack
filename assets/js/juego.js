/* 
2C = Two of clubs
2D = Two of fiaminds
2H = Two of Hearts
2S = Two of Spades
*/

// Colección de cartas
let deck = [];
const types = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K']

let playerPoints = 0,
    computerPoints = 0

// Referencias del HTML
const btnTakeCard = document.querySelector('#btnTakeCard');
const btnStop = document.querySelector('#btnStop');
const divCartasJugador = document.querySelector('#player-cards');
const divCartasComputadora = document.querySelector('#computer-cards');
const elementCounterPlayer = document.querySelectorAll('small');

// Función para crear mazos
const crearDeck = () => {

    // create cards
    for (let i = 2; i < 10; i++) {
        for (let type of types) {
            deck.push(i+type)
        }
    }

    // create special cards
    for (const type of types) {
        for (const special of specials) {
            deck.push(special + type)
        }
    }
    
    // shuffle deck
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}

// invoación para llamar mazo
crearDeck();

// take a cart from deck
const takeCard = () => {

    if (deck.length === 0) {
        throw 'No hay cartas en el mazo';
    }
    const card = deck.pop();

    return card;

}

const valueCard = (card) => {

    const value = card.substring(0, card.length - 1);

    return isNaN(value) ? (value === 'A' ? 11 : 10) : value * 1;

}

// turno computadora

const turnComputer = (minPoint) => {

    do {
        const card = takeCard();
        computerPoints = computerPoints + valueCard(card);
        elementCounterPlayer[1].innerHTML = computerPoints
    
        const imgCard = document.createElement('img');
        imgCard.src = `assets/cartas/${card}.png`;
        imgCard.classList.add('carta');
        divCartasComputadora.append(imgCard)

        if (minPoint > 21) {
            break;
        }

    } while ((computerPoints < minPoint) && (minPoint <= 21) );
    
    return computerPoints;

}


const value = valueCard(takeCard());

// Eventos

btnTakeCard.addEventListener('click', () => {
    const card = takeCard();
    playerPoints = playerPoints + valueCard(card);
    elementCounterPlayer[0].innerHTML = playerPoints

    const imgCard = document.createElement('img');
    imgCard.src = `assets/cartas/${card}.png`;
    imgCard.classList.add('carta');
    divCartasJugador.append(imgCard)

    if (playerPoints > 21) {
        alert('Lo siento perdiste')
        btnTakeCard.disabled = true;
        turnComputer(playerPoints);
    }
    else if (playerPoints === 21) {
        if (turnComputer(playerPoints) === 21) {
            alert('Nadie gano')
        }
        else {
            alert('Ganaste')
        }
    }

});

// Detener
btnStop.addEventListener('click', () => {

    btnTakeCard.disabled = true;
    btnStop.disabled = true;

    let pointComputerStop = turnComputer(playerPoints);

    if (playerPoints === 21 && pointComputerStop === 21) {
        alert('Ninguno gano');
    }
    else if (pointComputerStop > playerPoints && pointComputerStop <= 21) {
        alert('Gano la computadora');
    }
    else if (playerPoints === computerPoints) {
        alert('Ninguno gano');
    }
    else {
        alert('Gano');
    }

});