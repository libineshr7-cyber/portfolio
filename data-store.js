/* ═══════════════════════════════════════════════════════════
   FIREBASE CONFIG
   ═══════════════════════════════════════════════════════════
   This is what turns "saved on my computer" into "saved for
   everyone, everywhere" — a real shared database on the web.

   IMPORTANT — Firestore "test mode" allows anyone with your
   config to read AND write your database, not just the admin
   panel. That's fine for a portfolio with no sensitive data, but
   it means someone who finds your config could edit your content
   directly. If you want real protection, ask to add Firebase
   Authentication so only a logged-in admin can write — it's a
   quick follow-up change.
   ═══════════════════════════════════════════════════════════ */

const firebaseConfig = {
  apiKey: "AIzaSyD3fbQXYeE1vPYNrFxH8-667zXwU9GAtE8",
  authDomain: "portfolio-22543.firebaseapp.com",
  projectId: "portfolio-22543",
  storageBucket: "portfolio-22543.firebasestorage.app",
  messagingSenderId: "147350536861",
  appId: "1:147350536861:web:213778c42aa7aa997a4a74"
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
