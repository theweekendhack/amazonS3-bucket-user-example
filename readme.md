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

The above end point updates a user based on the id provided. You are required to submit the  user data, that is require to be updated,in the body of the request (as JSON) : The data could include ANY of the following :

- firstName 
- lastName 
- gender 
- imagePath
- username 
- password

### DELETE /users/id

The above end point deletes a user based on the id provided

## Rules to Set up application

1. Clone source code by running: **git clone GITHUP_PROJECT_URL . **
2. After Cloning, re-install ALL 3rd party dependencies by running **npm install**
3. Create a folder within the project called **config**
4. Within the **config** folder, create a file called **keys.env**
5. Within the **keys.env** file, create the below environment variables :
   - **MONGODB_QUERY_STRING** - Assign your Database Connection String to the variable
   - **PORT** - Assign 5000
   - **FRONT_END_HOST_ADDRESS** - Assign the value **http://localhost:3000**  This is to indicate that your FRONT_END app will be runnng on PORT 3000
   - **AWSAccessKeyId** - Assign your AWS AccessKey ID here
   - **AWSSecretKey**- Assingn your AWS SecretKey here
   - **BUCKET_NAME**  - Assign your AWS S3 Bucket here
6. Run application by running : **npm run dev**