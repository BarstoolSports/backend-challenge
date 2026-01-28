# Backend Challenge

To better assess a candidate's backend development skills, we would like to provide the following challenge. We ask that you not spend more than 4 hours on this project.

## Project Setup

1. Fork and then clone this repository to your local machine `git clone https://github.com/BarstoolSports/backend-challenge.git`
2. Install and run MongoDB (https://docs.mongodb.com/manual/administration/install-community/ or use Docker)
3. Install Node.js v20.18.0
4. Install Yarn
5. Open the project directory in a terminal and run `yarn install`

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

## Project Requirements

The goal of this project is to familiarize yourself with the backend Node.js API in this repository and then implement missing features and tests.

> The project must be completed with *Node.js v20.18.0*

1. Update `.env` to have proper Mongo connection string
2. Modify the `GET /dev/status` route to only return a `200 OK` if the server is currently connected to the database
3. Add tests for `PUT /dev/user/:id` that shows the current user must match the user id in the url in order for the update to be successful
4. Create a new module called `notes` that lets a user save notes to their account. A `Note` should have a title and a message in addition to the common properties such as id, createdAt and modifiedAt
5. Add the route `GET /dev/user/:id/notes` which should list notes for that user
6. Add a validator to `GET /dev/user/:id/notes` and ensure users can paginate, sort, and search/filter their own Notes based on message text
7. Add tests for the previous route to show that it functions correctly
8. Add a route `POST /dev/note` which should let a logged in user create a note and save it to their account
9. Add tests for the previous route to show that it functions correctly
