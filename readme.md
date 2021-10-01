# Superhero REST API

A simple Superhero RESTful API that allows client applications to create, read, edit and delete superheroes

## End Points

### GET /heroes

The above end point returns all superheroes

### GET /heroes/id

The above end point returns a superhero based on the id provided

### POST /heroes

The above end point creates a superhero. You are required to submit the superhero data in the body of the request (as JSON) : The data includes :

- name (required)
- gender (required)
- powerLevel (required)
- comicbookType (required),
- realName (optional)

### PUT /heroes/id

The above end point updates a superhero based on the id provided. You are required to submit the new superhero data in the body of the request (as JSON) : The data could include any of the following :

- name
- gender
- powerLevel
- comicbookType
- realName

### DELETE /heroes/id

The above end point deletes a superhero based on the id provided

## Rules to Set up application

1. Clone source code by running: **npm install**
1. Ensure that you create a folder called **config**
1. Within the **config** folder, create a file called **keys.env**
1. Within the **keys.env** file, create two environment variables
   - **MONGODB_QUERY_STRING** - Assign your Database Connection String to the variable
   - PORT - Assign 3000
1. Run application by running : **npm run dev**
