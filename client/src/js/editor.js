// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from './database';
import { header } from './header';

export default class {
  constructor() {
    // Retrieve the content stored in localStorage
    const localData = localStorage.getItem('content');

    // Check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    // Initialize the CodeMirror editor with specified configurations
    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '', // Initial content of the editor
      mode: 'javascript', // Syntax highlighting mode
      theme: 'monokai', // Editor theme
      lineNumbers: true, // Display line numbers
      lineWrapping: true, // Wrap long lines
      autofocus: true, // Autofocus the editor
      indentUnit: 2, // Indentation unit size
      tabSize: 2, // Tab size
    });

    // When the editor is ready, set its value to whatever is stored in indexedDB.
    // Fall back to localStorage if nothing is stored in indexedDB,
    // and if neither is available, set the value to header.
    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      this.editor.setValue(data || localData || header);
    });

    // Save the content of the editor to localStorage whenever the content changes
    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    // Save the content of the editor to indexedDB when the editor loses focus
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(localStorage.getItem('content'));
    });
  }
}
