# Backend Challenge

To better assess a candidate's backend development skills, we would like to provide the following challenge. We ask that you not spend more than 4 hours on this project.

## Project Requirements

The goal of this project is to familiarize yourself with the backend Node.js API in this repository and then implement missing features and tests.

> The project must be completed with *Node.js v14* or later

1. Modify the `GET /dev/status` route to only return a `200 OK` if the server is currently connected to the database
2. Add a test for `PUT /dev/user/:id` that shows the current user must match the user id in the url in order for the update to be successful
3. Create a new module called `notes` that lets a user a save notes to their account. A `Note` should simply have a title and a message in addition to the common properties such as id, createdAt and modifiedAt.
4. Add the route `GET /dev/user/:id/notes` which should list all notes for that user. Remember to ensure the user id in the url matches the current user making the request
5. Add a test for the previous route to show that it works correctly
6. Add a route `POST /dev/note` which should let a logged in user create a note and save it to their account

## Project Setup

1. Clone this repository to your local machine `git clone https://github.com/BarstoolSports/backend-challenge.git`
2. Install and run MongoDB https://docs.mongodb.com/manual/administration/install-community/
3. Install Node.js v14 from https://nodejs.org
4. Install Yarn v1.22 from https://yarnpkg.com/en/
5. Open the project diretory in a terminal and run `yarn install`
6. run `npx husky install`

### Run the Tests

If the project is setup correctly you should be able to run the existing set of tests:

```
yarn test
```

### Run the Server

After ensuring the tests are running correctly, start the app:

```
yarn start
```

If the server starts up successfully you will see a log in the console letting you know the server is running and listening on port 3000. Open the `/dev/status` route to confirm: http://localhost:3000/dev/status
