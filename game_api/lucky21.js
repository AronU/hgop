module.exports = (context) => {
    let deckConstructor = context('deck');
    let deck = deckConstructor(context);
    
    let dealerConstructor = context('dealer');
    let dealer = dealerConstructor(context);
    
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
        // Is the game finished.
        isGameOver: (game, guess) => {
            if (game.state.card != undefined) {
                // Player has guessed over 21 so the card is no loger undefined and the game ends no mater what
                return true;
            }
            else {
                // Player has guessed 21 or under so we need to check the Total and if is under or 21 so the game ends
                if (game.getTotal(game) >= 21) {
                    return true;
                }
            }
            return false;
        },
        // Has the player won (true or false).
        playerWon: (game, guess) => {
            if (game.state.card != undefined) {
                // Player has guessed over 21 so we need to check the Total and if is grater then 21 the player wins the game
                if (game.getTotal(game) > 21) {
                    return true;
                }
            }
            else {
                // Player has guessed 21 or under so we need to check the Total and if is 21 the player wins the game
                if (game.getTotal(game) == 21) {
                    return true;
                }
            }
            return false;
        },
        // The highest score the cards can yield without going over 21 (integer).
        getCardsValue: (game) => {
            if (game.state.card == undefined) {
                let total = 0;
                let amtOfAces = 0;
                for (let index = 0; index < game.state.cards.length; index++) {
                    var card_value = parseInt(game.state.cards[index].slice(0, -1));
                    if (card_value == 1) {
                        amtOfAces++;
                    } else if (card_value > 10) {
                        total = total + 10;
                    } else {
                        total = total + card_value;
                    }
                }
                if (amtOfAces > 0) {
                    let potentialTotal = total + 11 + amtOfAces - 1;
                    if (potentialTotal <= 21) {
                        total = potentialTotal;
                    } else {
                        total = total + amtOfAces;
                    }
                }               
                return total;
            } else {
                let overallTotal = game.getTotal(game);
                let CardsValue = overallTotal - game.getCardValue(game);
                return CardsValue;
            }
        },
        // The value of the card that should exceed 21 if it exists (integer or undefined).
        getCardValue: (game) => {
            if (game.state.card != undefined) {
                card_value = parseInt(game.state.card.slice(0, -1));
                if (card_value > 10) {
                    card_value = 10;
                } else if (card_value == 1) {//If we have an Ace we want it to be 11. 
                    card_value = 11;
                }
            } else {
                card_value = game.state.card;
            }
            return card_value;
        },
        // The cards value + the card value if it exits (integer).
        getTotal: (game) => {
            var Total = 0;
            // check for each card in cards and add it to the Total
            for (let index = 0; index < game.state.cards.length; index++) {
                var x = parseInt(game.state.cards[index].slice(0, -1));
                // if the card is a roal one it is just 10
                if (x > 10) {
                    x = 10;
                }
                Total += x;
            };
            // it getCardValue is not undifined the add the value to the Total as well
            if(game.getCardValue(game) != undefined) {
                return Total + game.getCardValue(game);
            }
            return Total;
        },
        // The player's cards (array of strings).
        getCards: (game) => {
            // retruns the value of the cards
            return game.state.cards;
        },
        // The player's card (string or undefined).
        getCard: (game) => {
            // retruns the value of the card
            return game.state.card;
        },
        // Player action (void).
        guess21OrUnder: (game) => {
            // the card is drawn and add it to the Cards array
            game.state.cards.push(game.state.dealer.draw(game.state.deck));
        },
        // Player action (void).
        guessOver21: (game) => {
            // the card is drawn and add it to the card
            game.state.card = game.state.dealer.draw(game.state.deck);
            //  and add it to the Cards array
            // game.state.cards.push(game.state.card);
        },

        getState: (game) => {
            return {
                cards: game.state.cards,
                cardsValue: game.getCardsValue(game),
                card: game.state.card,
                cardValue: game.getCardValue(game),
                total: game.getTotal(game),
                gameOver: game.isGameOver(game),
                playerWon: game.playerWon(game),
            };
        },
    };
};