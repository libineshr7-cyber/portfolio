/* ═══════════════════════════════════════════════════════════
   DATA STORE
   Shared read/write layer used by both index.html (public site)
   and admin.html (admin panel).

   - Source of truth: Firestore (real database, shared by every
     visitor, on every device).
   - localStorage is kept only as a fast local CACHE, so the site
     still shows the last-known content instantly and works
     offline / before Firebase is configured. It is never the
     source of truth once Firebase is set up.
   ═══════════════════════════════════════════════════════════ */

const PORTFOLIO_COLLECTION = 'portfolio';
const PORTFOLIO_DOC_ID     = 'data';
const CACHE_KEY            = 'portfolio_data_cache';

/**
 * Load portfolio data.
 * Tries Firestore first; falls back to the local cache if Firebase
 * isn't configured yet or the request fails (e.g. offline).
 * Returns null if there is no data anywhere (use defaults).
 */
async function loadPortfolioData() {
  if (typeof firebaseReady !== 'undefined' && firebaseReady && db) {
    try {
      const snap = await db.collection(PORTFOLIO_COLLECTION).doc(PORTFOLIO_DOC_ID).get();
      if (snap.exists) {
        const data = snap.data();
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        return data;
      }
      return null; // Firestore is reachable but no data saved yet
    } catch (e) {
      console.warn('[DataStore] Firestore read failed, using local cache instead:', e);
    }
  }

  const cached = localStorage.getItem(CACHE_KEY);
  return cached ? JSON.parse(cached) : null;
}

/**
 * Save portfolio data.
 * Always updates the local cache immediately, then writes to
 * Firestore so every visitor sees the change. Throws if Firebase
 * isn't configured, so the caller can show a clear error.
 */
async function savePortfolioData(data) {
  localStorage.setItem(CACHE_KEY, JSON.stringify(data));

  if (!(typeof firebaseReady !== 'undefined' && firebaseReady && db)) {
    throw new Error(
      'Firebase is not configured yet. Open firebase-config.js and follow the setup steps at the top of the file — your changes were saved to this browser only for now.'
    );
  }

  await db.collection(PORTFOLIO_COLLECTION).doc(PORTFOLIO_DOC_ID).set(data);
}
