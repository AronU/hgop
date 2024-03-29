const helper = require('./server.lib-test.js');

const timeout = 300000;
const gameCount = 10000;

const playGames = (url, count, done) => {
  if (count === 0) {
    done();
    return;
  }

  // Creating a callback that works the same way as done in Jest. 
  const playGameCallback = () => {
    playGames(url, count - 1, done);
  };
  playGameCallback.fail = done.fail;

  helper.playGame(url, playGameCallback);
};

test('play ' + gameCount + ' games within ' + ((timeout / 1000)/60) + ' minutes', function(done) {
  playGames(process.env.API_URL, gameCount, done);
}, timeout);