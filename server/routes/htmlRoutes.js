// Import the 'path' module to handle file and directory paths
const path = require('path');

// Export a function that takes an 'app' object as an argument
module.exports = (app) =>
  // Define a route handler for GET requests to the root URL ('/')
  app.get('/', (req, res) =>
    // Send the 'index.html' file located in the 'client/dist' directory
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  );