// ============================
// app.js - Main PWA Script
// ============================

// ----------------------------
// 1. Service Worker Registration
// ----------------------------
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(err => {
            console.error('Service Worker registration failed:', err);
        });
    });
}

// ----------------------------
// 2. PWA Install Prompt
// ----------------------------
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent automatic Chrome banner
    e.preventDefault();
    deferredPrompt = e;

    // Show custom install button
    if (installBtn) installBtn.style.display = 'block';
});

if (installBtn) {
    installBtn.addEventListener('click', async () => {
        installBtn.style.display = 'none';
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log('User choice:', outcome);
            deferredPrompt = null;
        }
    });
}

// ----------------------------
// 3. Display Welcome User
// ----------------------------
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const welcomeEl = document.querySelector('.welcome-user');

if (loggedInUser && welcomeEl) {
    welcomeEl.textContent = `Welcome, ${loggedInUser.name}`;
}


// ----------------------------
// 5. Optional: Offline / Cache Example
// ----------------------------
// Make sure sw.js exists at root and cache paths exist
