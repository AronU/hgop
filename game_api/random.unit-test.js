// Random value min test
test('random should return an int that is more than or equal to the min value parameter for randomInt()', () => {
    // Arrange
    const random = require('./random')();
  
    // Act
    const number = random.randomInt(5, 10);
  
    // Assert
    expect(number).toBeGreaterThanOrEqual(5);
  });
  
  // Random value max test
  test('random should return an int that is less than or equal to the max value parameter for randomInt()', () => {
    // Arrange
    const random = require('./random')();
  
    // Act
    const number = random.randomInt(0, 5);
  
    // Assert
    expect(number).toBeLessThanOrEqual(5);
  });
  
  // Random override test
  test('random should return a value of 1 after overriding the randomInt() fucntion', () => {
    // Arrange
    const random = require('./random')();
    random.randomInt = (min, max) => {
      return 1;
    };
  
    // Act
    const number = random.randomInt(1, 2);
  
    // Assert
    expect(number).toEqual(1);
  });