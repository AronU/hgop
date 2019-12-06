let context = require('./context.js').newContext();
let randomConstructor = require('./random.js');
let Random = randomConstructor(context);

test('Random int should equal 1', () => {
    // Act
    let randomInt = Random.randomInt(1, 1);

    // Assert
    expect(randomInt).toEqual(1);
});

test('Random int should always return a number', () => {
    // Act
    let randomInt = Random.randomInt(10, 20);

    // Assert
    expect(typeof randomInt).toEqual('number');
});

test('Random int should be on the given number range, 10-20', () => {
    // Act
    let randomInt = Random.randomInt(10, 20);

    // Assert
    expect(randomInt).toBeLessThanOrEqual(20);
    expect(randomInt).toBeGreaterThanOrEqual(10);
});