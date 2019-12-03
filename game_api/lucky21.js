module.exports = (deck, dealer) => {
    dealer.shuffle(deck);
    let card0 = dealer.draw(deck);
    let card1 = dealer.draw(deck);
    let state = {
        deck: deck,
        dealer: dealer,
        cards: [
            card0,
            card1,
        ],
        // The card that the player thinks will exceed 21.
        card: undefined,
    };
    return {
        state: state,
        // Is the game over (true or false).
        isGameOver: (game, guess) => {
            if (game.getTotal <= 21 && guess == 'over') {
                return true
            }
            else if (game.getTotal > 21 && guess == 'under') {
                return true
            }
            else {
                return false
            }
        },
        // Has the player won (true or false).
        playerWon: (game, guess) => {
            if (game.getTotal > 21 && guess == 'over') {
                return true
            }
            else if (game.getTotal == 21 && guess == 'under') {
                return true
            }
            else {
                return false
            }
        },
        // The highest score the cards can yield without going over 21 (integer).
        getCardsValue: (game) => {
            if (game.state.card == undefined) {
                return game.getCardValue(game);
            } else {
                let overallTotal = game.getCardValue(game);
                let CardsValue = overallTotal - game.getCardValue;
                return CardsValue;
            }
        },
        // The value of the card that should exceed 21 if it exists (integer or undefined).
        getCardValue: (game) => {
            if (game.state.card != undefined) {
                card_value = parseInt(game.state.card.slice(0, -1));
            } else {
                card_value = game.state.card;
            }
            return card_value;
        },
        getTotal: (game) => {
            var Total = 0;
            for (let index = 0; index < game.state.cards.length; index++) {
                var x = parseInt(game.state.cards[index].slice(0, -1));
                if (x > 10) {
                    x = 10;
                }
                Total += x;
            };
            return Total;
        },
        // The player's cards (array of strings).
        getCards: (game) => {
            return game.state.cards;
        },
        // The player's card (string or undefined).
        getCard: (game) => {
            return game.state.card;
        },
        // Player action (void).
        guess21OrUnder: (game) => {
            let new_card = game.state.dealer.draw(game.state.deck);
            game.state.cards.push(new_card);
            
        },
        // Player action (void).
        guessOver21: (game) => {
            let last_card = game.state.dealer.draw(game.state.deck);
            game.state.card = last_card;
        },
    };
};