# covid-dashboard

A dashboard to view covid cases updates

# Getting Started with the project

This project uses React, Node, Express, MongoDB, Graphql, Apollo Client and Chart.js.

### `npm install`

To install all the packages (in top level directory and aalso in 'client' folder).

# Adding data to MongoDB

To add the data to Mongo Database from csv files, run `app.js` file in db directory. Make sure to check the file names in `app.js` before running the script.

## Available Scripts

In the client directory, you can run:

### `npm start`

Runs the React app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.



In the project directory, you can run:

### `npm run server`

Runs the server with Express and Graphql.\
Open [http://localhost:5000/graphql](http://localhost:5000/graphql) to view it in the browser.



You can use `concurrently` dependency to run both the servers together. Configure the script in package.json


