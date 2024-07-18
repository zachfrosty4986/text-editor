const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;

// Logic for installing the PWA
// TODO: Add an event handler to the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  butInstall.style.display = 'block'; // Show install button
});

// TODO: Implement a click event handler on the butInstall element
butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null; // Reset the deferredPrompt
      butInstall.style.display = 'none'; // Hide install button after installation
    });
  }
});

// TODO: Add an handler for the appinstalled event
window.addEventListener('appinstalled', (event) => {
  console.log('App was installed');
});