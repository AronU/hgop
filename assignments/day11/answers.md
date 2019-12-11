What does the done parameter do?

    Whenever something fails in the API play test, done.fail is called with an error message so it's for when something goes wrong in the game.

---------------------------------------------------------------------------------------------------------

Explain why we put each consecutive call inside the onSuccess callback of the previous database call, instead of just placing them next to each other.

    When you nest functions like this it prevents it from calling the next one if the first one failed. This is done to avoid redundancy of calls to the database, since all of these three calls are to the same table so if an error occurs, it is very likely to happen again. We only send a 20 (success) status code once we have all the info we need.