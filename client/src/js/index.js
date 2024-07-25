// Import Workbox library for service worker management
import { Workbox } from 'workbox-window';
// Import the Editor class from the local './editor' module
import Editor from './editor';
// Import the database module to ensure it is initialized
import './database';
// Import the main CSS file for styling
import '../css/style.css';

// Select the main element in the HTML document
const main = document.querySelector('#main');
// Clear any existing content in the main element
main.innerHTML = '';

// Function to create and display a loading spinner
const loadSpinner = () => {
  const spinner = document.createElement('div'); // Create a new div element
  spinner.classList.add('spinner'); // Add the 'spinner' class to the div
  // Set the inner HTML of the spinner to include a loading container and spinner
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  // Append the spinner element to the main element
  main.appendChild(spinner);
};

// Instantiate the Editor class
const editor = new Editor();

// If the editor instance is not defined, display the loading spinner
if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported in the browser
if ('serviceWorker' in navigator) {
  // Register the Workbox service worker with the provided script path
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  // Log an error if service workers are not supported
  console.error('Service workers are not supported in this browser.');
}

