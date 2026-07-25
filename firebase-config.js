/* ═══════════════════════════════════════════════════════════
   FIREBASE CONFIG
   ═══════════════════════════════════════════════════════════
   This is what turns "saved on my computer" into "saved for
   everyone, everywhere" — a real shared database on the web.

   SETUP (takes about 3 minutes, totally free):
   1. Go to https://console.firebase.google.com/
   2. Click "Add project" → give it any name → finish the wizard
      (you can turn off Google Analytics, you don't need it)
   3. On the project's home screen, click the </> (Web) icon to
      register a new web app → give it any nickname → Register app
   4. Firebase shows you a `firebaseConfig` object — copy those
      values into the object below, replacing the placeholders
   5. In the left sidebar go to Build → Firestore Database →
      "Create database" → Start in TEST MODE → pick any location
   6. That's it. Reload admin.html and index.html — they'll now
      read/write through this file automatically.

   IMPORTANT — Firestore "test mode" allows anyone with your
   config to read AND write your database, not just the admin
   panel. That's fine for a portfolio with no sensitive data, but
   it means someone who finds your config could edit your content
   directly. If you want real protection, ask to add Firebase
   Authentication so only a logged-in admin can write — it's a
   quick follow-up change.
   ═══════════════════════════════════════════════════════════ */

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Only initialize if the placeholders have actually been replaced,
// so the site doesn't throw errors before you've set this up.
let firebaseReady = false;
let db = null;

if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
  try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    firebaseReady = true;
  } catch (e) {
    console.warn('[Firebase] Failed to initialize:', e);
  }
} else {
  console.warn(
    '[Firebase] Not configured yet. Open firebase-config.js and follow the setup steps at the top of the file.'
  );
}
