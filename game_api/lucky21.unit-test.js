const lucky21Constructor = require('./lucky21.js');
const deckConstructor = require('./deck.js');
const dealerConstructor = require('./dealer.js');

test('a new game should have 50 cards left in the deck', () => {
  // Arrange
  let deck = deckConstructor();
  let dealer = dealerConstructor();
  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  // Assert
  expect(game.state.deck.length).toEqual(50);
});

test('a new game should have 2 drawn cards', () => {
  // Arrange
  let deck = deckConstructor();
  let dealer = dealerConstructor();
    
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  expect(game.state.cards.length).toEqual(2);
});

test('guess21OrUnder should draw the next card', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
      '05C', '01D', '09S', '10H', 
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};
  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  
  // Act
  game.guess21OrUnder(game);
  
  // Assert
  expect(game.state.cards.length).toEqual(3);
  expect(game.state.cards[2]).toEqual('01D');
});

//ISGAMEOVER TESTS.
test('isGameOver should be true for guess21OrUnder if getCardValue > 21', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
      '10C', '09D', '04S', '10H', 
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};
  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  
  // Act
  game.guess21OrUnder(game);
  let return_value = game.isGameOver(game);
  
  // Assert
  expect(game.state.cards.length).toEqual(3);
  expect(return_value).toEqual(true);
});

test('isGameOver should be true for guess21OrOver if getCardValue < 21', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
      '10C', '08D', '02S', '10H', 
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};
  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  
  // Act
  game.guess21OrOver(game);
  let return_value = game.isGameOver(game);
  
  // Assert
  expect(game.state.cards.length).toEqual(3);
  expect(return_value).toEqual(true);
});

test('isGameOver should be true for guess21OrOver if getCardValue == 21', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
      '10C', '08D', '03S', '10H', 
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};
  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  
  // Act
  game.guess21OrOver(game);
  let return_value = game.isGameOver(game);
  
  // Assert
  expect(game.state.cards.length).toEqual(3);
  expect(return_value).toEqual(true);
});

//PLAYERWON TESTS.
test('playerWon should be a win for guess21OrUnder if getCardValue == 21', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
      '10C', '09D', '02S', '10H', 
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};
  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  
  // Act
  game.guess21OrUnder(game);
  let return_value = game.playerWon(game);
  
  // Assert
  expect(game.state.cards.length).toEqual(3);
  expect(return_value).toEqual(true);
});

test('playerWon should be a win for guess21OrOver if getCardValue > 21', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
      '10C', '09D', '04S', '10H', 
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};
  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  
  // Act
  game.guess21OrUnder(game);
  let return_value = game.playerWon(game);
  
  // Assert
  expect(game.state.cards.length).toEqual(3);
  expect(return_value).toEqual(true);
});

test('playerWon should be a win for guess21OrOver if getCardValue > 21', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
      '10C', '09D', '04S', '10H', 
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};
  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  
  // Act
  game.guess21OrUnder(game);
  let return_value = game.playerWon(game);
  
  // Assert
  expect(game.state.cards.length).toEqual(3);
  expect(return_value).toEqual(true);
});

//GETCARDSVALUE TESTS.

test('getCardsValue should equal 19 after 4 draws.', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
      '04C', '02D', '09S', '04H', 
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};
  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  
  // Act
  game.guess21OrUnder(game);
  game.guess21OrUnder(game);

  let return_value = game.getCardsValue(game);
  
  // Assert
  expect(game.state.cards.length).toEqual(4);
  expect(return_value).toEqual(19);
});

//GETCARDVALUE TESTS.
test('getCardValue should equal undefined when no card is drawn.', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
      '04C', '02D', '09S', '04H', 
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};
  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  
  // Act
  let return_value = game.getCardValue(game);
  
  // Assert
  expect(game.state.cards.length).toEqual(2);
  expect(return_value).toEqual(undefined);
});

//GETOTAL TESTS.
test('getTotal should equal 19 after 4 draws.', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
      '04C', '02D', '09S', '04H', 
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};
  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  
  // Act
  game.guess21OrUnder(game);
  game.guess21OrUnder(game);

  let return_value = game.getTotal(game);
  
  // Assert
  expect(game.state.cards.length).toEqual(4);
  expect(return_value).toEqual(19);
});

//GETCARDS TESTS.
test('getCards should equal first 2 cards in deck at start.', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
      '04C', '02D', '09S', '04H', 
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};
  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  
  // Act

  let return_value = game.getCards(game);
  
  // Assert
  expect(game.state.cards.length).toEqual(2);
  expect(return_value).toEqual(['04H', '09S']);
});

test('getCards should equal first 3 cards in deck after 1 draw.', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
      '04C', '02D', '09S', '04H', 
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};
  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  
  // Act
  game.guess21OrUnder(game);
  let return_value = game.getCards(game);
  
  // Assert
  expect(game.state.cards.length).toEqual(3);
  expect(return_value).toEqual(['04H', '09S', '02D']);
});

//GETCARD TESTS.
test('getCard should equal undefined when no card is drawn.', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
      '04C', '02D', '09S', '04H', 
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};
  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  
  // Act
  let return_value = game.getCardValue(game);
  
  // Assert
  expect(game.state.cards.length).toEqual(2);
  expect(return_value).toEqual(undefined);
});

