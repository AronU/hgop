let context = require('./context.js').newContext();
let deckConstructor = require('./deck.js');
let dealerConstructor = require('./dealer.js');

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
    let newDealer = require('./dealer.js');
    let dealer = newDealer((name) => {
        return dependencies[name];
    });
    let deck = ['a', 'b', 'c'];

    // Act
    dealer.shuffle(deck);

    // Assert
    expect(deck).toEqual(['c', 'b', 'a']);
});

test('Edge case test of empty deck', () => {
    // Arrange
    let dependencies = {
        'random': () => newRandom([2, 1]),
    };
    let newDealer = require('./dealer.js');
    let dealer = newDealer((name) => {
        return dependencies[name];
    });
    let deck = [];

    // Act
    dealer.shuffle(deck);

    // Assert
    expect(deck).toEqual([]);
});

test('Dealer should draw the next card', () => {
    // Arrange
    let dependencies = {
        'random': () => newRandom([2, 1]),
    };
    let newDealer = require('./dealer.js');
    let dealer = newDealer((name) => {
        return dependencies[name];
    });
    let deck = ['c', 'b', 'a'];

    // Act
    let drawnCard = dealer.draw(deck);

    // Assert
    expect(drawnCard).toEqual('a');
});

test('Dealer should return empty if deck is empty', () => {
    // Arrange
    let dependencies = {
        'random': () => newRandom([2, 1]),
    };
    let newDealer = require('./dealer.js');
    let dealer = newDealer((name) => {
        return dependencies[name];
    });
    let deck = [];

    // Act
    let drawnCard = dealer.draw(deck);

    // Assert
    expect(drawnCard).toEqual(null);
});