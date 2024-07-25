// Import the express module to create and manage the server
const express = require('express');

// Create an instance of an Express application
const app = express();

// Define the port to listen on, defaulting to 3000 if not set in environment variables
const PORT = process.env.PORT || 3000;

// Serve static files from the 'client/dist' directory
// This makes the built frontend files accessible to clients
app.use(express.static('../client/dist'));

// Middleware to parse URL-encoded data with extended options
// This allows Express to handle form submissions and other URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON data in requests
// This allows Express to handle incoming JSON payloads
app.use(express.json());

// Import and apply HTML route handlers from the 'routes/htmlRoutes.js' file
// This will define how to handle various HTML routes in the application
require('./routes/htmlRoutes')(app);

// Start the server and listen for incoming requests on the specified port
// Log a message indicating the server is listening and on which port
app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
