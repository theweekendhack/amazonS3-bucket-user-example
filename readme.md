# user REST API

A simple user RESTful API that allows client applications to create, read, edit and delete users

## End Points

### GET /users

The above end point returns all users

### GET /users/id

The above end point returns a user based on the id provided

### POST /users

The above end point creates a user. You are required to submit the user data in the body of the request (as JSON) : The data includes :

- firstName (required)
- lastName (required)
- gender (required)
- imagePath (required),
- username (required)
- password (required)

### PUT /users/id

The above end point updates a user based on the id provided. You are required to submit the new user data in the body of the request (as JSON) : The data could include any of the following :

- firstName (required)
- lastName (required)
- gender (required)
- imagePath (required),
- username (required)
- password (required)

### DELETE /users/id

The above end point deletes a user based on the id provided

## Rules to Set up application

1. Clone source code by running: **npm install**
1. Ensure that you create a folder called **config**
1. Within the **config** folder, create a file called **keys.env**
1. Within the **keys.env** file, create two environment variables
   - **MONGODB_QUERY_STRING** - Assign your Database Connection String to the variable
   - PORT - Assign 3000
1. Run application by running : **npm run dev**
