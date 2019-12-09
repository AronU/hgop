module.exports = (context) => {
    const randomConstructor = context('random');
    const random = randomConstructor(context);
    return {
      shuffle: (deck) => {
        for (let i = 0; i < deck.length - 1; i++) {
          const j = random.randomInt(i, deck.length);
          const card = deck[j];
          const old = deck[i];
          deck[i] = card;
          deck[j] = old;
        }
      },
      draw: (deck) => deck.pop(),
    };
  };