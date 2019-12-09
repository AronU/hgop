function newRandom(randomReturnValues) {
    let i = 0;
    return {
      randomInt: (min, max) => {
        return randomReturnValues[i++];
      },
    };
  }
  
  test('dealer should shuffle cards', () => {
    // Arrange
    const dependencies = {
      'random': () => newRandom([2, 1]),
    };
    const newDealer = require('./dealer.js');
    const dealer = newDealer((name) => {
      return dependencies[name];
    });
    const deck = ['a', 'b', 'c'];
  
    // Act
    dealer.shuffle(deck);
  
    // Assert
    expect(deck).toEqual(['c', 'b', 'a']);
  });