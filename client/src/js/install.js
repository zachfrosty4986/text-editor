// Get the install button element by its ID
const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;

// Logic for installing the PWA
// TODO: Add an event handler to the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault(); // Prevent the default mini-infobar from appearing on mobile
  deferredPrompt = event; // Save the event for later use
  butInstall.style.display = 'block'; // Show the install button
});

// TODO: Implement a click event handler on the butInstall element
butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt(); // Show the install prompt to the user

    deferredPrompt.userChoice.then((choiceResult) => {
      // Handle the user's choice
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS (Add to Home Screen) prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null; // Reset the deferredPrompt after the prompt is handled
      butInstall.style.display = 'none'; // Hide the install button after installation
    });
  }
});

// TODO: Add a handler for the appinstalled event
window.addEventListener('appinstalled', (event) => {
  console.log('App was installed'); // Log when the app is installed
});
