function newRandom(randomReturnValues) {
    let i = 0;
    return {
        randomInt: (min, max) => {
            return randomReturnValues[i++];
        }
    };
}

test('dealer should should shuffle cards', () => {
    // Arrange
    let dependencies = {
        'random': () => newRandom([2, 1]),
    };
    let newDeck = require('./deck.js');
    let deck = newDeck((name) => {
        return dependencies[name];
    });

    // Act
    expectedDeck = [
        '01H', '02H', '03H', '04H', '05H', '06H', '07H', '08H', '09H', '10H', '11H', '12H', '13H', // Hearts
        '01C', '02C', '03C', '04C', '05C', '06C', '07C', '08C', '09C', '10C', '11C', '12C', '13C', // Clubs
        '01D', '02D', '03D', '04D', '05D', '06D', '07D', '08D', '09D', '10D', '11D', '12D', '13D', // Diamonds
        '01S', '02S', '03S', '04S', '05S', '06S', '07S', '08S', '09S', '10S', '11S', '12S', '13S', // Spades
      ];

    // Assert
    expect(deck).toEqual(expectedDeck);
});



let deckConstructor = context('deck');
let deck = deckConstructor(context);