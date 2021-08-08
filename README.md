# Ryde Back-end Developer Test

## Context

Build a RESTful API that canget/create/update/delete user data from apersistence database

### User Model

```
{
  "id": "xxx", // user ID
  "name": "test", // user name
  "dob": "", // date of birth
  "address": "", // user address
  "description": "", // user description
  "createdAt": "" // user created date
}
```

## Structure

Docker is used to create and containerise the microservices:

1. Express app (image: node)
2. Mongo (image: mongo)

We initialise an Express instance, and then environment variables, middlewares, routes, and finally error handlers. We then make the Express server listen on port 8000.

We then initialise the Database connection.

The flow of API calls goes as such:

- Request > Middleware > Error handler if path not found (404 error)/invalid request parameters (400 error) > Service method > Respective Controller methods > Error handler to handle any 5xx errors > Response

- Only unit and functional tests with happy paths are implemented. These are to test the expected flows of the controller methods and endpoints respectively. After each test, cleanup logic is implement to not clutter the database with test data

## Setup

1. Ensure that Docker is installed and running
2. Run `npm start` to build the Docker image (if not done so), and spin up the relevant containers
3. Run `npm run cli:db` to open MongoDB on CLI (for debugging purposes)
4. Ensure that both database and express server is up before running test scripts or calling API endpoints (look for log statement that show database is running)

```
Connected to mongo db at: mongodb://mongo:27017/ryde
```

5. Run `npm run test:unit` to run unit tests
6. Run `npm run test:functional` to run functional tests

## My Comments

- The application is default to run on `localhost:8000`
- `.env.example` file is created solely for structure. No environment variables are used for ease of grading
- Comments to Advanced requirements are added below in the section
- Request and Response body structures are defined in the DTO files (e.g. `user.dto.ts`)
- I have implemented unit and functional tests with happy paths only which are working fine. I did not implement edge cases (e.g. invalid parameter, getting a non-existing user etc.). These are easily implemented which the similar logic and structure presented in the current tests.

## Requirements

### Functionality

- The API should follow typical RESTful API design pattern.
- The data should be saved in the DB.
- Provide proper unit test.
- Provide proper API document.

### Tech stack

- We use Python, Nodejs, Go & PHP
- Use any framework.
- Use any DB. NoSQL DB is preferred.

### Bonus

- Write clear documentation on how it’s designed and how to run the code.
- Write good in-code comments.
- Write good commit messages.

### Advanced requirements

These are used for some further challenges. You can safely skip them but feel free to try out.

- Provide a complete user auth (authentication/authorization/etc.) strategy, such as OAuth.
  - Use libraries like `passport` for authentication
  - Use libraries like `express-jwt` & `jsonwebtoken` for JWT strategies
  - Use libraries like `bcrypt` & `crypto` for encrypting sensitive information like passwords
- Provide a complete logging (when/how/etc.) strategy.
  - Store daily logs into a `.logs` folder in root
  - Separate out log message based on `Log.info`, `Log.error` etc
  - Either clear out logs every month/quarterly/bi-annually/annually
  - Consider storing log files on persistent storage services like AWS S3
- Imagine we have a new requirement right now that the user instances need to link to each other, i.e., a list of “followers/following” or “friends”. Can you find out how you would design the model structure and what API you would build for querying or modifying it?
  - Mongo provides a native `_id` property with each document (i.e. with each user entry)
  - We can create a collection `Friends` with the attributes `userFromId` and `userToId`, to show a simple relationship between User A and User B
  - You might be tempted to nest the user's followers data in the User schema and have `friends` as an array of userIds, or create a new collection with the same structure, but I feel that this approach is faster for querying
- Related to the requirement above, suppose the address of user now includes a geographic coordinate(i.e., latitude and longitude), can you build an API that, given a user name, return the nearby friends.
  - In the `User` collection, add new attributes latitude and longitude
  - In this `Friends` collection, add a new attribute distance and calculate distance using the 2 coordinates before adding a new document to the collection
  - Create an index on distance in `Friends`, so that when we query the n nearest friends, indexing speeds up the process.

## Routes

Structure of full URL: `<host-name>:<port>/api/v1/<end-point>`

- e.g. `localhost:8000/api/v1/user`

```sh
+--------+--------------+
  Method | URI
+--------+--------------+
  GET    | /             (test route)
         |
  POST   | /user
  GET    | /user/:id
  PATCH  | /user/:id
  DELETE | /user/:id
```

## What We Care About

Feel free to use any open-source library as you see fit, but remember that we are
evaluating your coding skills and problem solving skills.

Here’s what you should aim for:

- Good use of API design best practices.
- Good testing approach.
- Extensible code.

## FAQ

Where should I send back the result when I’m done?

- Create a Git repo and send us the link.

What if I have a question?

- You can always contact us.
