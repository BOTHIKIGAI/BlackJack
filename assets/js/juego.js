/* 
2C = Two of clubs
2D = Two of fiaminds
2H = Two of Hearts
2S = Two of Spades
*/

// Colección de cartas
const deck = [];
const types = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K']

// Función para crear mazos
const crearDeck = () => {
    for (let i = 2; i < 10; i++) {
        for (let type of types) {
            deck.push(i+type)
        }
    }

    for (const type of types) {
        for (const special of specials) {
            deck.push(special + type)
        }
    }
    
}

// invoación para llamar mazo
crearDeck();