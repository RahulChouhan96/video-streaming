# Video Streaming App

This app contains only backend at the moment. I have created it using Nodejs, ExpressJS, MongoDB, Mongoose etc.



## Install Dependencies

After cloning the app in local environment. Install depenedencies using command `npm install`.


## Connect with Database

1. I have used MongoDB database here. You can create a DB in your local environment named `practice`.
2. In order to generate data in DB, I have written a script in `create-data.js`. Import it an call the `createData` function anywhere you want.
3. It will create a new file with name `data.json`. It will have 1000 video documents with different combination of data like private, name, url, thumbnail url.
4. Copy the entire array from `data.json` file. Go to your database. Create a collection called `videos`.
5. Enter a command `db.getCollection('videos').insertMany(<COPY-PASTE-DATA-ARRAY>)`.
6. You will have 1000 video documents in your DB now.


## Run the app

Go inside the app and run command `node server.js`. It will run app on your local environment PORT 5100.


## API Documentation


### GET / - Gets all videos paginated 20 at a time.

Request Query - 
    1. `page` (Page no for pagination)
    2. `public` (A boolean flag. If `true`, gives all public videos only)
    3. `mostlyViewed` (A boolean flag. If `true`, gives all videos which are viewed more than 42 times)
Response - 200 Videos Array


### POST /video - Create a video

Request Body - All fields which are mentioned in Video schema `server/models/Video.js` should be present with given data type.
Response - 200 New Video Document


### PUT /video/:videoId - Updates any field in a specific video document.

Request Params - `videoId`
Request Body - All fields which are mentioned in Video schema `server/models/Video.js` should be present with given data type.
Response - 200 Updated Video Document


### DELETE /video/:videoId - Deletes a video document.

Request Params - `videoId`
Response - 200 Success message and deleted Video Document.


**NOTE** - Creation and Updation of a video document also goes through a middleware which validates if the `url` is valid or not.



## Extras

List of things which can be added into the next version
1. Test cases.
2. Update view counter.