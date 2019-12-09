module.exports = function(context) {
    const Client = context('pgClient');
    const configConstructor = context('config');
    const config = configConstructor(context);

    function getClient() {
        return new Client({
            host: config.pgHost,
            user: config.pgUser,
            password: config.pgPassword,
            database: config.pgDatabase,
        });
    }

    setTimeout(() => {
      let client = getClient();
      client.connect((err) => {
          if (err) {
              console.log('failed to connect to postgres!');
          } else {
              console.log('successfully connected to postgres!');
              client.query('CREATE TABLE IF NOT EXISTS GameResult (ID SERIAL PRIMARY KEY, Won BOOL NOT NULL, Score INT NOT NULL, Total INT NOT NULL, InsertDate TIMESTAMP NOT NULL);', (err) => {
                  if (err) {
                      console.log('error creating game result table!')
                  } else {
                      console.log('successfully created game result table!')
                  }
                  client.end();
              });
          }
      });
    }, 5000);

    return {
        insertResult: (won, score, total, onSuccess, onError) => {
            let client = getClient();
            client.connect((err) => {
                if (err) {
                    onError(err);
                    client.end();
                } else {
                    const query = {
                        text: 'INSERT INTO GameResult(Won, Score, Total, InsertDate) VALUES($1, $2, $3, CURRENT_TIMESTAMP);',
                        values: [won, score, total],
                    }
                    client.query(query, (err) => {
                        if (err) {
                            onError(err);
                        } else {
                            onSuccess();
                        }
                        client.end();
                    });
                }
            });
            return;
        },
        // Should call onSuccess with integer.
        getTotalNumberOfGames: (onSuccess, onError) => {
            var client = getClient();
            client.connect(() => {
                let count = 0;
                const query = {
                    text: 'SELECT * FROM GameResult;',
                    rowMode: 'array'
                }
                client.query(query, (err, res) => {
                    onGet(res.rows.map(row => {
                        return {
                            ID: row[0],
                            Won: row[1],
                            Score: row[2],
                            Total: row[3],
                            InsertDate: row[4]
                        }
                    }));
                    client.end();
                });
            });
            return;
        },
        // Should call onSuccess with integer.
        getTotalNumberOfWins: (onSuccess, onError) => {
            onSuccess(0)
            // TODO week 3
        },
        // Should call onSuccess with integer.
        getTotalNumberOf21: (onSuccess, onError) => {
            onSuccess(0)
            // TODO week 3
        },
    }
}