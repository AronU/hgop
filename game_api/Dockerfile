# The FROM instruction initializes a new build stage and sets the Base Image for subsequent instructions.
FROM node:erbium
# Set the working directory to /code
WORKDIR /code
# The COPY instruction copies new files or directories from <src>(aka. first file) and adds them to the filesystem of the container at the path <dest>(aka. second file).
COPY package.json package.json
# The RUN instruction will execute any commands in a new layer on top of the current image and commit the results.
RUN npm install --production
# This skips the test files because we have a .dockerignore file defined
COPY *.js ./

CMD sleep 10
# Give postgres time to setup before we try to migrate.
CMD npm run migratedb:pg
# CMD will be overridden when running the container with alternative arguments(app.js).
CMD node app.js