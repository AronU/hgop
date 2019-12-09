const deckConstructor = require('./deck.js');

// Deck tests
test('The Deck should contain 52 cards', () => {
  // Arange
  const deck = deckConstructor();

  // Act
  // Assert
  expect(deck.length).toEqual(52);
});

test('The first card in the deck should be 01H', () => {
  // Arange
  const deck = deckConstructor();

  // Act
  // Assert
  expect(deck[0]).toEqual('01H');
});

test('The last card in the deck should be 01H', () => {
  // Arange
  const deck = deckConstructor();

  // Act
  // Assert
  expect(deck[51]).toEqual('13S');
});