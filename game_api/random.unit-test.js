let context = require('./context.js').newContext();
let randomConstructor = require('./random.js');

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
    let newRandom = randomConstructor(context);
    newRandom.randomInt(1, 10);

    // Act
    let randomInt = newRandom.randomInt(1, 10);

    // Assert
    expect(randomInt).toEqual('number');
});