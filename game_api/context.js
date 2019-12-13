const express = require('express');
const config = require('./config.js');
const database = require('./database.js');
const lucky21 = require('./lucky21.js');
const {Client} = require('pg');
const deck = require('./deck.js');
const dealer = require('./dealer.js');
const server = require('./server.js');
const inject = require('./inject.js');
const random = require('./random.js');
const hotshots = require('hot-shots');
module.exports = {
  newContext: () => {
    return inject({
      'express': express,
      'config': config,
      'pgClient': Client,
      'database': database,
      'lucky21': lucky21,
      'deck': deck,
      'dealer': dealer,
      'server': server,
      'random': random,
      'hot-shots': hotshots,
    });
  },
};