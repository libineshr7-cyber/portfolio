# LIBINESH R U — Cybersecurity Portfolio

A personal portfolio website with a public-facing site (`index.html`) and a
password-protected admin panel (`admin.html`) for editing content without
touching code. Content is stored in **Firebase Firestore** so changes made
in the admin panel show up for every visitor, on every device — with a
local `localStorage` cache as a fallback/offline copy.

## Project structure

```
.
├── index.html            # Public portfolio site
├── admin.html             # Admin panel (edit content, gated by a password)
├── script.js              # Public site behavior (animations, effects, contact form, etc.)
├── style.css              # Shared styling
├── data-store.js          # Read/write layer shared by index.html and admin.html
└── firebase-config.js     # Firebase project credentials + setup instructions
```

## Features

**Public site (`index.html`)**
- Hero, About, Skills, Projects, Certifications, and Contact sections
- Animated intro loader, "matrix rain" background effect, custom cursor ring
- Scroll progress bar, sticky navbar, mobile hamburger menu
- Typing effect, scroll-triggered reveal animations, animated stat counters
- Filterable skills grid, project cards, contact form with client-side validation
- A few extra touches: glitch text effect, tag ripple effect, and an easter egg

**Admin panel (`admin.html`)**
- Simple password gate (session-based — stays logged in until the browser tab/session ends)
- Edit hero text, about content, skills, projects, and certifications
- Saves write straight to Firestore so changes appear on the live site immediately

## Setup

### 1. Firebase (required for content to persist/sync across devices)

Without this step, admin edits only save to the current browser
(`localStorage`) and won't show up for visitors.

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. **Add project** → name it anything → finish the wizard (Google Analytics is optional)
3. On the project home screen, click the **`</>`** (Web) icon → register a web app
4. Copy the `firebaseConfig` values Firebase gives you into `firebase-config.js`, replacing the placeholders
5. In the sidebar: **Build → Firestore Database → Create database** → start in **test mode** → pick a location
6. Reload `admin.html` / `index.html` — they'll read and write through Firestore automatically

### 2. Run locally

This is a static site — no build step or server-side code. Serve the folder with any static file server, for example:

```bash
npx serve .
# or
python3 -m http.server 8000
```

Then open `index.html` (and `admin.html` for editing).

### 3. Deploy

Any static host works — Firebase Hosting, Netlify, Vercel, or GitHub Pages. Just upload the files as-is; there's nothing to build or compile.

## ⚠️ Security notes before you deploy this publicly

- **Firestore test mode is wide open.** In test mode, *anyone* who has your `firebaseConfig` values (which are visible in your site's source code — that's unavoidable for a client-side app) can read **and write** your database directly, not just through your admin panel. That's fine for a low-stakes portfolio, but it means someone could edit your content without ever touching `admin.html`. If you want this locked down, add **Firebase Authentication** and Firestore security rules so only a signed-in admin account can write — ask me if you'd like help adding that.
- **The admin password is hardcoded in `admin.html` and checked entirely in the browser.** Because it's client-side JavaScript, anyone can view the page source and read the password directly, or bypass the check altogether by editing `sessionStorage` in devtools. This gate stops casual visitors, not a motivated one. Treat it as a UI convenience, not real security — pair it with the Firestore Authentication rules above if you want the write access itself to be protected. Also worth changing it to something other than the current default before deploying.

## Tech stack

- Vanilla HTML/CSS/JavaScript (no framework, no build tools)
- Firebase Firestore (data), Firebase JS SDK (loaded via CDN, referenced in `firebase-config.js`)
