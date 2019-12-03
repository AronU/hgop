# The FROM instruction initializes a new build stage and sets the Base Image for subsequent instructions.
FROM node:erbium
# Set the working directory to /code
WORKDIR /code
# The COPY instruction copies new files or directories from <src>(aka. first file) and adds them to the filesystem of the container at the path <dest>(aka. second file).
COPY package.json package.json
# The RUN instruction will execute any commands in a new layer on top of the current image and commit the results.
RUN npm install
# The COPY instruction copies new files or directories from <src>(aka. first file) and adds them to the filesystem of the container at the path <dest>(aka. second file).
COPY database.js database.js
# The COPY instruction copies new files or directories from <src>(aka. first file) and adds them to the filesystem of the container at the path <dest>(aka. second file).
COPY app.js app.js
# CMD will be overridden when running the container with alternative arguments(app.js).
CMD node app.js