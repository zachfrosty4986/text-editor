// Import the openDB function from the idb library
import { openDB } from 'idb';

// Initialize the database
const initdb = async () => 
  // Open (or create) the database called 'jate' with version 1
  openDB('jate', 1, {
    // Function to handle database upgrades
    upgrade(db) {
      // Check if the 'jate' object store already exists
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // Create a new object store called 'jate' with an auto-incrementing key
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // Open the 'jate' database
  const db = await openDB('jate', 1);
  // Start a new read-write transaction on the 'jate' object store
  const tx = db.transaction('jate', 'readwrite');
  // Get the 'jate' object store
  const store = tx.objectStore('jate');
  // Put the content into the store with a specified id (1 in this case)
  await store.put({ value: content, id: 1 });
  // Complete the transaction
  await tx.done;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // Open the 'jate' database
  const db = await openDB('jate', 1);
  // Start a new read-only transaction on the 'jate' object store
  const tx = db.transaction('jate', 'readonly');
  // Get the 'jate' object store
  const store = tx.objectStore('jate');
  // Get the content with id 1 from the store
  const data = await store.get(1);
  // Complete the transaction
  await tx.done;
  // Return the retrieved content's value
  return data?.value;
};

// Initialize the database when the script runs
initdb();
